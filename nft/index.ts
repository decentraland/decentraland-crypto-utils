import { getProvider } from '@decentraland/web3-provider'
import { getUserAccount } from '@decentraland/EthereumController'
import * as ethEsm from 'eth-connect/esm'

import * as eth from 'eth-connect/eth-connect'

import abi from './abi'
import { Erc721 } from './erc721'

/**
 * Return Contract, Provider and RequestManager
 *
 * @param contractAddress Smartcontract ETH address
 */
async function getContract(contractAddress: eth.Address) {
  const provider = await getProvider()
  const requestManager = new ethEsm.RequestManager(provider)
  const factory = new ethEsm.ContractFactory(requestManager, abi)
  const contract = (await factory.at(contractAddress)) as Erc721
  return { contract, provider, requestManager }
}

/**
 * Transfer an ERC721 token
 * 
 * @param contractAddress ERC721 smartcontract address
 * @param toAddress Receiver address
 * @param tokenId Token ID
 */
export async function transfer(
  contractAddress: eth.Address,
  toAddress: eth.Address,
  tokenId: number
) {
  const { contract } = await getContract(contractAddress)
  const fromAddress = await getUserAccount()

  const res = await contract.transferFrom(fromAddress, toAddress, tokenId, {
    from: fromAddress
  })
  return res
}

/**
 * Set approval for ERC721
 * 
 * @param contractAddress ERC721 smartcontract address
 * @param operator Address approved to move the tokens
 * @param approved Boolean for approval
 */
export async function setApprovalForAll(
  contractAddress: eth.Address,
  operator: eth.Address,
  approved: boolean = true
) {
  const { contract } = await getContract(contractAddress)
  const res = await contract.setApprovalForAll(operator, approved)
  return !!res
}

/**
 * Returns true if the operator is allowed to move the user tokens
 * 
 * @param contractAddress ERC721 smartcontract address
 * @param assetHolder User address
 * @param operator Address approved to move the tokens
 */
export async function isApprovedForAll(
  contractAddress: eth.Address,
  assetHolder: eth.Address,
  operator: eth.Address
) {
  const { contract } = await getContract(contractAddress)
  const res = await contract.isApprovedForAll(assetHolder, operator)
  return !!res
}
