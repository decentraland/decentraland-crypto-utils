import * as eth from 'eth-connect'

import { getUserAccount } from './@decentraland/EthereumController'
import { getContract } from '../contract'
import { isApproved, setApproval } from '../../currency/index'
import delay from '../../utils/delay'

/**
 * Execute an order on the market and buy the item
 *
 * @param nftAddress NFT smartcontract address
 * @param assetId ID of the asset
 * @param price Price of the order
 */
export async function executeOrder(nftAddress: eth.Address, assetId: number, price: number) {
  const { contract, requestManager } = await getContract()
  const fromAddress = await getUserAccount()

  const approved = await isApproved(
    '0x0F5D2fB29fb7d3CFeE444a200298f468908cC942',
    fromAddress,
    contract.address
  )
  if (!approved)
    await setApproval('0x0F5D2fB29fb7d3CFeE444a200298f468908cC942', contract.address).then(
      async (v: any) => {
        let receipt = null
        while (receipt == null) {
          await delay(2000)
          receipt = await requestManager.eth_getTransactionReceipt(v.toString())
        }
      }
    )

  const res = await contract.executeOrder(
    nftAddress,
    assetId,
    eth.toWei(price, 'ether').toString(),
    {
      from: fromAddress,
    }
  )
  return res
}
