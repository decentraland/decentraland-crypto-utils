import * as eth from 'eth-connect/eth-connect'
import * as ethEsm from 'eth-connect/esm'
import { getUserAccount } from '@decentraland/EthereumController'

import * as ERC20 from '../currency/index'

/**
 * Send MANA to an address
 *
 * @param toAddress Receiver address
 * @param amount Amount in ether to send
 */
export function send(toAddress: eth.Address, amount: number) {
  return ERC20.send('0x0f5d2fb29fb7d3cfee444a200298f468908cc942', toAddress, +ethEsm.toWei(amount.toString(), 'ether').toString())
}

/**
 * Return the balance of the current user
 */
export async function myBalance() {
  const fromAddress = await getUserAccount()
  return ERC20.balance('0x0f5d2fb29fb7d3cfee444a200298f468908cc942', fromAddress)
}

/**
 * Return the balance of the address
 *
 * @param address Address you are checking
 */
export async function balance(address: eth.Address) {
  return ERC20.balance('0x0f5d2fb29fb7d3cfee444a200298f468908cc942', address)
}
