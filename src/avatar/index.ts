import { getUserAccount } from '@decentraland/EthereumController'
import { getCurrentRealm } from '@decentraland/EnvironmentAPI'
import * as eth from 'eth-connect'
import { Profiles } from './types'
import { Rarity, rarityLevel, Wearable } from '../wearable/types'

/**
 * Returns profile of an address
 *
 * @param address ETH address
 */
export async function getUserInfo(address?: eth.Address) {
  const realm = address
    ? 'https://peer.decentraland.org'
    : await getCurrentRealm().then((r: any) =>
        r.domain != 'http://127.0.0.1:8000' ? r.domain : 'https://peer.decentraland.org'
      )
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
  const response = await fetch(`https://wearable-api.decentraland.org/v2/addresses/${address}/wearables?fields=id`)
  const inventory: { id: string }[] = await response.json()
  return inventory.map((wearable) => wearable.id)
}


/**
 * Returns wearables inventory of an address with full data on each wearable
 *
 * @param address ETH address
 */
 export async function getUserFullInventory(address?: eth.Address) {
	if (!address) address = await getUserAccount()
	const response = await fetch(
	  `https://wearable-api.decentraland.org/v2/addresses/${address}/wearables`
	)
	const inventory: Wearable[] = await response.json()
	return inventory
  }

/**
 * Returns boolean if the user has an item in their inventory or equiped
 *
 * @param wearable DCL name of the wearable ('dcl://dcl_launch/razor_blade_upper_body')
 * @param equiped true if currently wearing
 */
export async function itemInInventory(wearable: string, equiped: boolean = false) {
  const profile = await getUserInfo()
  if (equiped) {
    for (const item of profile.metadata.avatars[0]?.avatar.wearables) {
      if (item == wearable) return true
    }
  } else {
    const inventory = await getUserInventory()
    for (const item of inventory) {
      if (item == wearable) return true
    }
  }
  return false
}

/**
 * Returns boolean if the user has one of the items in their inventory or equiped
 *
 * @param wearables List of DCL names of the wearable (['dcl://dcl_launch/razor_blade_upper_body'])
 * @param equiped true if currently wearing
 */
export async function itemsInInventory(wearables: string[], equiped: boolean = false) {
  const profile = await getUserInfo()
  if (equiped) {
    for (const item of profile.metadata.avatars[0]?.avatar.wearables) {
      if (wearables.indexOf(item) != -1) return true
    }
  } else {
    const inventory = await getUserInventory()
    for (const item of inventory) {
      if (wearables.indexOf(item) != -1) return true
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
  