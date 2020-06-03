import { Address, toWei } from 'eth-connect'
import { getUserAccount } from '@decentraland/EthereumController'
import { getContract } from '../contract'

export async function executeOrder(
  nftAddress: Address,
  assetId: number,
  price: number
) {
  const { contract } = await getContract()
  const fromAddress = await getUserAccount()

  const res = await contract.executeOrder(
    nftAddress,
    assetId,
    toWei(price, 'ether').toString(),
    {
      from: fromAddress
    }
  )
  return res
}
