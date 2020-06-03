import { getUserAccount } from '@decentraland/EthereumController'
import { Address } from "eth-connect"
import { Profiles } from './types'

export async function getUserInfo(address?: Address){
  if (!address) address = await getUserAccount()
  
  return await fetch(`https://peer.decentraland.org/content/entities/profiles?pointer=${address}`).then(res => res.json()) as Profiles
}

export async function getUserInventory(address?: Address) {
  if (!address) address = await getUserAccount()
  const profile = await getUserInfo(address)
  return profile.metadata.avatars[0].inventory
}