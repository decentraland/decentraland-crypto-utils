import { getProvider } from '@decentraland/web3-provider'
import { getUserAccount } from '@decentraland/EthereumController'
import { RequestManager, ContractFactory } from 'eth-connect/esm'
import { Address } from 'eth-connect'

import abi from './abi'
import { Erc721 } from './erc721'

/** Return Contract, Provider and RequestManager */
export async function getContract(contractAddress: Address) {
  const provider = await getProvider()
  const requestManager = new RequestManager(provider)
  const factory = new ContractFactory(requestManager, abi)
  const contract = (await factory.at(contractAddress)) as Erc721
  return { contract, provider, requestManager }
}

export async function transfer(
  contractAddress: Address,
  toAddress: Address,
  tokenId: number
) {
  const { contract } = await getContract(contractAddress)
  const fromAddress = await getUserAccount()

  const res = await contract.transferFrom(fromAddress, toAddress, tokenId, {
    from: fromAddress
  })
  return res
}

export async function setApprovalForAll(
  contractAddress: Address,
  operator: Address,
  approved: boolean = true
) {
  const { contract } = await getContract(contractAddress)
  const res = await contract.setApprovalForAll(operator, approved)
  return !!res
}

export async function isApprovedForAll(
  contractAddress: Address,
  assetHolder: Address,
  operator: Address
) {
  const { contract } = await getContract(contractAddress)
  const res = await contract.isApprovedForAll(assetHolder, operator)
  return !!res
}
