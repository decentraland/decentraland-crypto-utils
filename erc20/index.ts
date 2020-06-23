import { getProvider } from '@decentraland/web3-provider'
import { getUserAccount } from '@decentraland/EthereumController'
import * as ethEsm from '../../eth-connect/esm'

import * as eth from '../../eth-connect/eth-connect'

import abi from './abi'
import { Erc20 } from './erc20'

/**
 * Return Contract, Provider and RequestManager
 *
 * @param contractAddress Smartcontract ETH address
 */
async function getContract(contractAddress: eth.Address) {
  const provider = await getProvider()
  const requestManager = new ethEsm.RequestManager(provider)
  const factory = new ethEsm.ContractFactory(requestManager, abi)
  const contract = (await factory.at(contractAddress)) as Erc20
  return { contract, provider, requestManager }
}

/**
 * Send token to an address
 *
 * @param contractAddress Smartcontract ETH address
 * @param toAddress Receiver address
 * @param amount Amount in ether to send
 */
export async function sendERC20(
  contractAddress: eth.Address,
  toAddress: eth.Address,
  amount: number
) {
  const { contract } = await getContract(contractAddress)
  const fromAddress = await getUserAccount()
  const res = await contract.transfer(toAddress, amount, { from: fromAddress })
  return res
}

/**
 * Send MANA to an address
 *
 * @param toAddress Receiver address
 * @param amount Amount in ether to send
 */
export function sendMana(toAddress: eth.Address, amount: number) {
  return sendERC20('0x0f5d2fb29fb7d3cfee444a200298f468908cc942', toAddress, amount * 1e18)
}

/**
 * Return true if the address is allowed to spend more than 1M token
 *
 * @param contractAddress Address of the token smartcontract
 * @param owner Address holding the token
 * @param spender Address spending the token
 */
export async function isApproved(
  contractAddress: eth.Address,
  owner: eth.Address,
  spender: eth.Address
) {
  const { contract } = await getContract(contractAddress)

  const res = await contract.allowance(owner, spender)
  return +res > 1000000 * 1e18
}

/**
 * Send a transaction to approve another address to move ERC20
 *
 * @param contractAddress Address of the token smartcontract
 * @param spender Address spending the token
 * @param amount Amount to approve
 */
export async function setApproval(
  contractAddress: eth.Address,
  spender: eth.Address,
  amount: string = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
) {
  const { contract } = await getContract(contractAddress)

  const res = await contract.approve(spender, amount)
  return res
}
