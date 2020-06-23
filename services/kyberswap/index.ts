import { getUserAccount } from '@decentraland/EthereumController'
import { getProvider } from '@decentraland/web3-provider'

import * as ethEsm from '../../../eth-connect/esm'
import * as eth from '../../../eth-connect/eth-connect'


import { CurrenciesData, MarketData, Currency } from './types/types'
import abi from './abi'
import { Kyberswap } from './kyberswap'

async function getContract(contractAddress: eth.Address) {
  const provider = await getProvider()
  const requestManager = new ethEsm.RequestManager(provider)
  const factory = new ethEsm.ContractFactory(requestManager, abi)
  const contract = (await factory.at(contractAddress)) as Kyberswap
  return { contract, provider, requestManager }
}

/**
 * Retrieves all the currencies on Kyberswap
 */
export async function getCurrencies():Promise<CurrenciesData> {
  return (await fetch('https://kyberswap.com/api/currencies').then(r => r.json())) as CurrenciesData
}

/**
 * Retrieves the data of a currency
 *
 * @param curr address, symbol or name of a currency
 */
export async function getACurrency(curr: string): Promise<Currency | undefined> {
  const currencies = (await fetch('https://kyberswap.com/api/currencies').then(r =>
    r.json()
  )) as CurrenciesData
  for (const currency of currencies.data) {
    if (currency.symbol == curr) return currency
    if (currency.name == curr) return currency
    if (currency.address == curr) return currency
  }
  return
}

/**
 * Retrieves the trading pairs on Kyberswap
 */
export async function getMarketPair() {
  return (await fetch('https://api.kyber.network/pairs/market').then(r => r.json())) as MarketData
}

/**
 * Retrieves the estimated amount to be exchanged
 * 
 * @param src Token address of the source
 * @param dest Token address of the destination
 * @param srcAmount Amount in ether
 * 
 * @example
 * This example returns the estimated amount of MANA for 1 ETH
 * ```ts
 * await getQuote("0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", "0x0f5d2fb29fb7d3cfee444a200298f468908cc942", "1")
 * ```
 */
export async function getQuote(src: string, dest: string, srcAmount: string) {
  return (await fetch(
    `https://api.kyber.network/quote_amount?quote=${dest}&base=${src}&base_amount=${srcAmount}&type=buy`
  ).then(r => r.json())) as { data: number; error: boolean }
}

/**
 * Retrieves estimated price and slippage
 * 
 * @param src Token address of the source
 * @param dest Token address of the destination
 * @param srcAmount Amount in ether
 */
export async function getExpectedRate(src: string, dest: string, srcAmount: string) {
  return (await fetch(
    `https://api.kyber.network/expectedRate?source=${src}&dest=${dest}&sourceAmount=${srcAmount}`
  ).then(r => r.json())) as {
    error: boolean
    expectedRate: number
    slippageRate: number
    timestamp: number
  }
}

/**
 * Execute the transaction to exchange the tokens
 * 
 * @param srcToken Token symbol of the currency to send
 * @param destToken Token symbol of the currency to receive
 * @param srcAmount Amount in ether (ie: 1 = 1 MANA or 1 ETH)
 * @param slippage Max slippage in percentage (default is 3%)
 */
export async function exchange(
  srcToken: string,
  destToken: string,
  srcAmount: number,
  slippage?: number
) {
  const currencies = await getCurrencies()
  let srcTokenAddress: string = ''
  let destTokenAddress: string = ''
  for (const cur of currencies.data) {
    if (cur.symbol.toLowerCase() == srcToken.toLowerCase()) srcTokenAddress = cur.address
    else if (cur.symbol.toLowerCase() == destToken.toLowerCase()) destTokenAddress = cur.address
  }

  const currency = await getACurrency(srcTokenAddress)

  const amount = ethEsm
    .toBigNumber(srcAmount)
    .times('1e' + currency?.decimals)
    .toString()

  const address = await getUserAccount()
  const rate = await getExpectedRate(srcTokenAddress, destTokenAddress, amount)

  const { contract } = await getContract('0x818E6FECD516Ecc3849DAf6845e3EC868087B755')
  contract.tradeWithHint(
    srcTokenAddress,
    amount,
    destTokenAddress,
    address,
    '0x57896044618658097711785492504343953926634992332820282019728792003956564819968', // (2 power 255) base 16
    slippage ? rate.expectedRate * ((100 - slippage) / 100) : rate.slippageRate,
    '0x440bbd6a888a36de6e2f6a25f65bc4e16874faa9',
    '0x5045524d'
  )
}
