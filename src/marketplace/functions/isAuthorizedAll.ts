import * as eth from 'eth-connect'

import * as ERC20 from '../../currency/index'
import * as ERC721 from '../../nft/index'
import { mainnet as addresses } from '../../utils/contract'
import { getUserAccount } from './@decentraland/EthereumController'

/**
 * Check all the authorization for the marketplace
 *
 * @param address User address
 */
export async function isAuthorizedAll(address?: eth.Address) {
  if (!address) address = await getUserAccount()

  const authorized: {
    buying: { mana: { address: eth.Address; authorized: boolean } }
    bidding: { mana: { address: eth.Address; authorized: boolean } }
    selling: {
      land: { address: eth.Address; authorized: boolean }
      estates: { address: eth.Address; authorized: boolean }
      exclusiveMasks: { address: eth.Address; authorized: boolean }
      halloween: { address: eth.Address; authorized: boolean }
      xmas: { address: eth.Address; authorized: boolean }
      mch: { address: eth.Address; authorized: boolean }
      communityContest: { address: eth.Address; authorized: boolean }
      dclLaunch: { address: eth.Address; authorized: boolean }
      dcg: { address: eth.Address; authorized: boolean }
      staySafe: { address: eth.Address; authorized: boolean }
      names: { address: eth.Address; authorized: boolean }
    }
  } = {
    buying: {
      mana: { address: addresses.MANAToken, authorized: false },
    },
    bidding: {
      mana: { address: addresses.MANAToken, authorized: false },
    },
    selling: {
      land: { address: addresses.LANDProxy, authorized: false },
      estates: { address: addresses.EstateProxy, authorized: false },
      exclusiveMasks: {
        address: addresses.ExclusiveMasksCollection,
        authorized: false,
      },
      halloween: {
        address: addresses.Halloween2019Collection,
        authorized: false,
      },
      xmas: {
        address: addresses.Xmas2019Collection,
        authorized: false,
      },
      mch: { address: addresses.MCHCollection, authorized: false },
      communityContest: {
        address: addresses.CommunityContestCollection,
        authorized: false,
      },
      dclLaunch: {
        address: addresses.DCLLaunchCollection,
        authorized: false,
      },
      dcg: { address: addresses.DCGCollection, authorized: false },
      staySafe: {
        address: addresses.StaySafeCollection,
        authorized: false,
      },
      names: { address: addresses.DCLRegistrar, authorized: false },
    },
  }

  authorized.buying.mana.authorized = await ERC20.isApproved(
    addresses.MANAToken,
    address,
    '0x8e5660b4ab70168b5a6feea0e0315cb49c8cd539'
  )

  authorized.bidding.mana.authorized = await ERC20.isApproved(
    addresses.MANAToken,
    address,
    '0xe479dfd9664c693b2e2992300930b00bfde08233'
  )

  for (const contract in authorized.selling) {
    const con = contract as
      | 'land'
      | 'estates'
      | 'exclusiveMasks'
      | 'halloween'
      | 'xmas'
      | 'mch'
      | 'communityContest'
      | 'dclLaunch'
      | 'dcg'
      | 'staySafe'
      | 'names'

    authorized.selling[con].authorized = await ERC721.isApprovedForAll(
      authorized.selling[con].address,
      address,
      '0x8e5660b4ab70168b5a6feea0e0315cb49c8cd539'
    )
  }

  return authorized
}
