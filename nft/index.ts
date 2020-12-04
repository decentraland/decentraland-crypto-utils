import { getProvider } from '@decentraland/web3-provider'
import { getUserAccount } from '@decentraland/EthereumController'
import * as ethEsm from 'eth-connect/esm'

import * as eth from 'eth-connect/eth-connect'

import abi from './abi'
import { Erc721 } from './erc721'
import delay from '../utils/delay'

/**
 * Return Contract, Provider and RequestManager
 *
 * @param contractAddress Smartcontract ETH address
 */
export async function getContract(contractAddress: eth.Address) {
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
 * @param waitConfirm Resolve promise when tx is mined or not
 */
export async function transfer(
  contractAddress: eth.Address,
  toAddress: eth.Address,
  tokenId: number,
  waitConfirm: boolean = false
) {
  const { contract, requestManager } = await getContract(contractAddress)
  const fromAddress = await getUserAccount()

  const res = await contract.transferFrom(fromAddress, toAddress, tokenId, {
    from: fromAddress,
  })
  let receipt = null
  if (waitConfirm) {
    while (receipt == null) {
      await delay(2000)
      receipt = await requestManager.eth_getTransactionReceipt(res.toString())
    }
    return receipt
  } else return res
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

/**
 * Returns true if the player owns at least one of the listed tokens from the indicated contract
 *
 * @param contractAddress ERC721 smartcontract address
 * @param tokenIds One or multiple token IDs to check player ownership
 */
export async function checkTokens(contractAddress: eth.Address, tokenIds?: number | number[]) {
  const { contract } = await getContract(contractAddress)
  const fromAddress = await getUserAccount()

  let balance = await contract.balanceOf(fromAddress)

  if (Number(balance) == 0) {
    return false
  } else {
    if (!tokenIds) {
      return true
    }

    let res = false
    for (let i = 0; i < Number(balance); i++) {
      let token = Number(await contract.tokenOfOwnerByIndex(fromAddress, i))
      if (typeof tokenIds === 'number') {
        if (token == tokenIds) {
          res = true
          break
        }
      } else {
        for (let j = 0; j < tokenIds.length; j++) {
          if (token == tokenIds[j]) {
            res = true
            break
          }
        }
      }
    }
    return res
  }
}
