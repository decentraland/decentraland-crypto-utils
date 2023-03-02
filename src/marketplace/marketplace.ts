import { TransactionObject, BlockType, EstimateGasOptions } from '../utils/types'
import * as eth from 'eth-connect'

interface EventOptions {
  filter?: object
  fromBlock?: BlockType
  topics?: string[]
}

export interface Marketplace extends eth.Contract {
  constructor(jsonInterface: any[], address?: string, options?: any)
  clone(): Marketplace
  setOwnerCutPerMillion(
    _ownerCutPerMillion: number | string,
    options?: EstimateGasOptions
  ): TransactionObject<void>

  setLegacyNFTAddress(
    _legacyNFTAddress: string,
    options?: EstimateGasOptions
  ): TransactionObject<void>

  ERC721_Interface(): TransactionObject<string>

  InterfaceId_ValidateFingerprint(): TransactionObject<string>

  unpause(options?: EstimateGasOptions): TransactionObject<void>

  acceptedToken(): TransactionObject<string>

  cancelOrder(
    nftAddress: string,
    assetId: number | string,
    options?: EstimateGasOptions
  ): TransactionObject<void>

  paused(): TransactionObject<boolean>

  createOrder(
    nftAddress: string,
    assetId: number | string,
    priceInWei: number | string,
    expiresAt: number | string,
    options?: EstimateGasOptions
  ): TransactionObject<void>

  initialize(options?: EstimateGasOptions): TransactionObject<void>

  pause(options?: EstimateGasOptions): TransactionObject<void>

  owner(): TransactionObject<string>

  safeExecuteOrder(
    nftAddress: string,
    assetId: number | string,
    price: number | string,
    fingerprint: string | number[],
    options?: EstimateGasOptions
  ): TransactionObject<void>

  ownerCutPerMillion(): TransactionObject<string>

  publicationFeeInWei(): TransactionObject<string>

  executeOrder(
    nftAddress: string,
    assetId: number | string,
    price: number | string,
    options?: EstimateGasOptions
  ): TransactionObject<void>

  setPublicationFee(
    _publicationFee: number | string,
    options?: EstimateGasOptions
  ): TransactionObject<void>

  isMigrated(contractName: string, migrationId: string): TransactionObject<boolean>

  legacyNFTAddress(): TransactionObject<string>

  auctionByAssetId(
    assetId: number | string
  ): TransactionObject<{
    0: string
    1: string
    2: string
    3: string
  }>

  orderByAssetId(
    arg0: string,
    arg1: number | string
  ): TransactionObject<{
    id: string
    seller: string
    nftAddress: string
    price: string
    expiresAt: string
    0: string
    1: string
    2: string
    3: string
    4: string
  }>

  transferOwnership(newOwner: string): TransactionObject<void>
}
