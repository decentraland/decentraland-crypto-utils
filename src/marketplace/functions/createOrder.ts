import * as eth from 'eth-connect'

import { getUserData } from "~system/UserIdentity"
import { getContract } from '../contract'
import { isApprovedForAll, setApprovalForAll } from '../../nft/index'
import delay from '../../utils/delay'
import { getPlayerAddress } from '../../avatar/index'

/**
 * Create an order, price in MANA (1 = 1 MANA)
 *
 * @param nftAddress NFT smartcontract address
 * @param assetId ID of the asset
 * @param price Price of the order
 * @param expireAt Time of expiring (default 1 month)
 */
export async function createOrder(
  nftAddress: eth.Address,
  assetId: number,
  price: number,
  expireAt: number = +new Date() / 1000 + 30 * 24 * 3600
) {
  const { contract, requestManager } = await getContract()
  const fromAddress = await getPlayerAddress()

  const approval = await isApprovedForAll(nftAddress, fromAddress, contract.address)
  if (!approval)
    await setApprovalForAll(nftAddress, contract.address, true).then(async (v: any) => {
      let receipt = null
      while (receipt == null) {
        await delay(2000)
        receipt = await requestManager.eth_getTransactionReceipt(v.toString())
      }
    })

  const res = await contract.createOrder(
    nftAddress,
    assetId,
    eth.toWei(price, 'ether').toString(),
    expireAt,
    {
      from: fromAddress,
    }
  )
  return res
}
