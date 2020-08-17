import { getUserAccount } from '@decentraland/EthereumController'
import { allowance } from '../../currency/index'
import { mainnet as Addresses } from '../../utils/contract'

export async function isAuthorizedAndHasBalance(
  price: number,
  userAddress?: string
) {
  if (!userAddress) userAddress = await getUserAccount()
  const authorized = await allowance(
    Addresses.MANAToken,
    userAddress,
    Addresses.MarketplaceProxy
  )
}
