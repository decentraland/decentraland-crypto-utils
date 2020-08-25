import { getUserAccount } from '@decentraland/EthereumController'
import { allowance } from '../../currency/index'
import { mainnet as Addresses } from '../../utils/contract'
import { toWei } from 'eth-connect'
import { myBalance } from 'mana'

export async function isAuthorizedAndHasBalance(price: string, userAddress?: string) {
  const authorized = await allowance(Addresses.MANAToken, userAddress? userAddress: await getUserAccount(), Addresses.MarketplaceProxy)
  if (+authorized < +toWei(price, 'ether').toString()) return false

  const balance = await myBalance()
  if (+balance >= +toWei(price, 'ether').toString()) return true
  else return false
}
