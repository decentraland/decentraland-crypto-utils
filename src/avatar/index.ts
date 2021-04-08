import { getUserAccount } from '@decentraland/EthereumController'
import { getCurrentRealm } from '@decentraland/EnvironmentAPI'
import * as eth from 'eth-connect'
import { Profiles, Snapshots } from './types'
import { Rarity, rarityLevel, Representation, Type, Wearable } from '../wearable/types'
import { getCatalystUrl, mapV2WearableIntoV1 } from '../shared/utils'

/**
 * Returns profile of an address
 *
 * @param address ETH address
 */
export async function getUserInfo(address?: eth.Address) {
  const realm = address
    ? 'https://peer.decentraland.org'
    : await getCatalystUrl()
  if (!address) address = await getUserAccount().then((a) => a.toLowerCase())
  return (await fetch(`${realm}/content/entities/profiles?pointer=${address?.toLowerCase()}`)
    .then((res) => res.json())
    .then((res) => (res.length ? res[0] : res))) as Profiles
}

/**
 * Returns wearables inventory of an address
 *
 * @param address ETH address
 */
export async function getUserInventory(address?: eth.Address) {
  if (!address) address = await getUserAccount()
  const catalystUrl = await getCatalystUrl()
  const response = await fetch(`${catalystUrl}/lambdas/collections/wearables-by-owner/${address}`)
  const inventory: { urn: string, amount: number }[] = await response.json()
  const result: string[] = []
  for (const { urn, amount } of inventory) {
    for (let i = 0; i < amount; i++) {
      result.push(urn)
    }
  }
  return result
}

/**
 * Returns wearables inventory of an address with full data on each wearable
 *
 * @param address ETH address
 */
 export async function getUserFullInventory(address?: eth.Address) {
	if (!address) address = await getUserAccount()
	const catalystUrl = await getCatalystUrl()
  const response = await fetch(`${catalystUrl}/lambdas/collections/wearables-by-owner/${address}?includeDefinitions`)
  const inventory: { amount: number, definition: any }[] = await response.json()
  const result: Wearable[] = []
  for (const { definition, amount } of inventory) {
    if (definition) {
      const mapped = mapV2WearableIntoV1(catalystUrl, definition)
      for (let i = 0; i < amount; i++) {
        result.push(mapped)
      }
    }
  }
  return result
}

/**
 * Returns boolean if the user has an item in their inventory or equiped
 *
 * @param wearable DCL name of the wearable ('dcl://dcl_launch/razor_blade_upper_body')
 * @param equiped true if currently wearing
 */
export function itemInInventory(wearable: string, equiped: boolean = false) {
  return itemsInInventory([wearable], equiped)
}

/**
 * Returns boolean if the user has one of the items in their inventory or equiped
 *
 * @param wearables List of DCL names of the wearable (['dcl://dcl_launch/razor_blade_upper_body'])
 * @param equiped true if currently wearing
 */
export async function itemsInInventory(wearables: string[], equiped: boolean = false) {
  const wearablesAsUrn = wearables.map(mapToUrn)
  if (equiped) {
    const equiped = await equipedItems()
    const equipedAsUrn = equiped.map(mapToUrn)
    for (const item of equipedAsUrn) {
      if (wearablesAsUrn.indexOf(item) != -1) return true
    }
  } else {
    const inventory = await getUserInventory()
    for (const item of inventory) {
      if (wearablesAsUrn.indexOf(item) != -1) return true
    }
  }
  return false
}

/**
 * Returns the equiped items
 */
export async function equipedItems() {
  const profile = await getUserInfo()
  return profile.metadata.avatars[0]?.avatar.wearables
}


let rarestEquippedItem: rarityLevel = 0

/**
 * Returns the rarity of the rarest item that the player has in their inventory or equiped
 *
 * @param equiped true if currently wearing
 */
 export async function rarestItem(
	equiped: boolean = false
  ): Promise<rarityLevel> {
	const profile = await getUserInfo()
	const inventory = await getUserFullInventory()
	if (!profile || !inventory) return rarityLevel.none

	if (equiped) {
	  for (const item of profile.metadata.avatars[0]?.avatar.wearables) {
		for (let invItem of inventory) {
		  if (item == invItem.id && invItem.rarity) {
			updateRarity(invItem.rarity)
		  }
		}
	  }
	} else {
	  for (let invItem of inventory) {
		if (invItem.rarity) {
		  updateRarity(invItem.rarity)
		}
	  }
	}
	log(rarityLevel[rarestEquippedItem])
	return rarestEquippedItem
  }

  export function updateRarity(rarity: Rarity) {
	let rarityNum: number = 0
	switch (rarity) {
	  case 'common':
		rarityNum = 1
		break
	  case 'uncommon':
		rarityNum = 2
		break
	  case 'rare':
		rarityNum = 3
		break
	  case 'epic':
		rarityNum = 4
		break
	  case 'mythic':
		rarityNum = 5
		break
	  case 'legendary':
		rarityNum = 6
		break
	  case 'unique':
		rarityNum = 7
		break
	}
	if (rarityNum > rarestEquippedItem) {
	  rarestEquippedItem = rarityNum
	  //log('new Rarest ', rarestEquippedItem, ' ')
	}
  }


  /**
 * Returns a Snapshots object, containing URLs to various snapshots of a player's face and full body
 *
 * @param playerID the ID of the player
 */
export async function getPlayerSnapshots(playerId?: string) :Promise<Snapshots|null> {
	if(!playerId){
		const profile = await getUserInfo()
		playerId = profile.id
	}
	const realm = await getCatalystUrl()

  return (await fetch(`${realm}/lambdas/profiles?field=snapshots&id=${playerId.toLowerCase()}`)
    .then((res) => res.json())
    .then((res) => (res[0].avatars.length ? res[0].avatars[0].avatar.snapshots as Snapshots : null)))
  }

function mapToUrn(wearableId: string) {
  if (wearableId.indexOf('dcl://') < 0) {
    // Already urn
    return wearableId
  }
  const [collectionName, wearableName ] = wearableId.replace('dcl://', '').split('/')
  if (collectionName === 'base-avatars') {
    return `urn:decentraland:off-chain:base-avatars:${wearableName}`
  } else {
    return `urn:decentraland:ethereum:collections-v1:${collectionName}:${wearableName}`
  }
}