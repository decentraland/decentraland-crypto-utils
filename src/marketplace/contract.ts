import { getProvider } from './@decentraland/web3-provider'
import * as eth from 'eth-connect'

import abi from './abi'
import { Marketplace } from './marketplace'

/** Return Contract of the Marketplace, Provider and RequestManager */
export async function getContract(
  contractAddress: eth.Address = '0x8e5660b4ab70168b5a6feea0e0315cb49c8cd539'
) {
  const provider = await getProvider()
  const requestManager = new eth.RequestManager(provider)
  const factory = new eth.ContractFactory(requestManager, abi)
  const contract = (await factory.at(contractAddress)) as Marketplace
  return { contract, provider, requestManager }
}
