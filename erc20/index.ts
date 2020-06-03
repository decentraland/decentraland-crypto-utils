import { getProvider } from '@decentraland/web3-provider'
import { getUserAccount } from '@decentraland/EthereumController'
import { RequestManager, ContractFactory } from '../../node_modules/eth-connect/esm'
import { Address } from '../../node_modules/eth-connect'

import abi from './abi'
import { Erc20 } from './erc20'

/** Return Contract, Provider and RequestManager */
export async function getContract(contractAddress: Address) {
  const provider = await getProvider()
  const requestManager = new RequestManager(provider)
  const factory = new ContractFactory(requestManager, abi)
  const contract = (await factory.at(contractAddress)) as Erc20
  return { contract, provider, requestManager }
}

export async function sendERC20(
  contractAddress: Address,
  toAddress: Address,
  amount: number
) {
  const { contract } = await getContract(
    contractAddress
  )
  const fromAddress = await getUserAccount()
  const res = await contract
    .transfer(toAddress, amount, { from: fromAddress })
  return res
}

export function sendMana(toAddress: Address, amount: number) {
  return sendERC20(
    '0x0f5d2fb29fb7d3cfee444a200298f468908cc942',
    toAddress,
    amount * 1e18
  )
}

/** Return true if the address is allowed to spend more than 1M token */
export async function isApproved(
  contractAddress: Address,
  owner: Address,
  spender: Address
) {
  const { contract } = await getContract(
    contractAddress
  )

  const res = await contract.allowance(owner, spender)
  return +res > 1000000 * 1e18
}
