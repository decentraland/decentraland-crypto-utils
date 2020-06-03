import { Address } from 'eth-connect'

import * as ERC20 from 'src/erc20'
import * as ERC721 from 'src/erc721'
import { addresses } from 'src/utils/contract'
import { getUserAccount } from '@decentraland/EthereumController'

export async function isAuthorizedAll(address?: Address) {
  if (!address) address = await getUserAccount()

  const authorized: {
    [key: string]: { [key: string]: { address: Address; authorized: boolean } }
  } = {
    buying: {
      mana: { address: addresses.mainnet.MANAToken, authorized: false }
    },
    bidding: {
      mana: { address: addresses.mainnet.MANAToken, authorized: false }
    },
    selling: {
      land: { address: addresses.mainnet.LANDProxy, authorized: false },
      estates: { address: addresses.mainnet.EstateProxy, authorized: false },
      exclusiveMasks: {
        address: addresses.mainnet.ExclusiveMasksCollection,
        authorized: false
      },
      halloween: {
        address: addresses.mainnet.Halloween2019Collection,
        authorized: false
      },
      xmas: {
        address: addresses.mainnet.Xmas2019Collection,
        authorized: false
      },
      mch: { address: addresses.mainnet.MCHCollection, authorized: false },
      communityContest: {
        address: addresses.mainnet.CommunityContestCollection,
        authorized: false
      },
      dclLaunch: {
        address: addresses.mainnet.DCLLaunchCollection,
        authorized: false
      },
      dcg: { address: addresses.mainnet.DCGCollection, authorized: false },
      staySafe: {
        address: addresses.mainnet.StaySafeCollection,
        authorized: false
      },
      names: { address: addresses.mainnet.DCLRegistrar, authorized: false }
    }
  }

  authorized.buying.mana.authorized = await ERC20.isApproved(
    addresses.mainnet.MANAToken,
    address,
    '0x8e5660b4ab70168b5a6feea0e0315cb49c8cd539'
  )

  authorized.bidding.mana.authorized = await ERC20.isApproved(
    addresses.mainnet.MANAToken,
    address,
    '0xe479dfd9664c693b2e2992300930b00bfde08233'
  )

  for (const contract in authorized.selling) {
    authorized.selling[contract].authorized = await ERC721.isApprovedForAll(
      authorized.selling[contract].address,
      address,
      '0x8e5660b4ab70168b5a6feea0e0315cb49c8cd539'
    )
  }

  return authorized
}
