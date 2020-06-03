import * as eth from '../../../eth-connect/eth-connect'

import { getUserAccount } from '@decentraland/EthereumController'
import { getContract } from '../contract'

export async function cancelOrder(nftAddress: eth.Address, assetId: number) {
  const { contract } = await getContract()
  const fromAddress = await getUserAccount()

  const res = await contract.cancelOrder(nftAddress, assetId, {
    from: fromAddress
  })
  return res
}
