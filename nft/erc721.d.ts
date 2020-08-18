import {
  TransactionObject,
  BlockType,
  EstimateGasOptions
} from '../utils/types'
import * as ethEsm from 'eth-connect/esm'

interface EventOptions {
  filter?: object
  fromBlock?: BlockType
  topics?: string[]
}

export class Erc721 extends ethEsm.Contract {
  constructor(jsonInterface: any[], address?: string, options?: any)
  clone(): Erc721
  supportsInterface(interfaceId: string | number[]): TransactionObject<boolean>

  safeBatchTransferFrom(
    _from: string,
    _to: string,
    _tokenIds: (number | string)[],
    options?: EstimateGasOptions
  ): TransactionObject<void>

  name(): TransactionObject<string>

  getApproved(tokenId: number | string): TransactionObject<string>

  approve(
    to: string,
    tokenId: number | string,
    options?: EstimateGasOptions
  ): TransactionObject<void>

  issueTokens(
    _beneficiaries: string[],
    _wearableIds: (string | number[])[],
    options?: EstimateGasOptions
  ): TransactionObject<void>

  totalSupply(): TransactionObject<string>

  transferFrom(
    from: string,
    to: string,
    tokenId: number | string,
    options?: EstimateGasOptions
  ): TransactionObject<void>

  tokenOfOwnerByIndex(
    owner: string,
    index: number | string
  ): TransactionObject<string>

  addWearable(
    _wearableId: string,
    _maxIssuance: number | string,
    options?: EstimateGasOptions
  ): TransactionObject<void>

  addWearables(
    _wearableIds: (string | number[])[],
    _maxIssuances: (number | string)[],
    options?: EstimateGasOptions
  ): TransactionObject<void>

  safeTransferFrom(
    from: string,
    to: string,
    tokenId: number | string,
    options?: EstimateGasOptions
  ): TransactionObject<void>

  setAllowed(
    _operator: string,
    _allowed: boolean,
    options?: EstimateGasOptions
  ): TransactionObject<void>

  tokenByIndex(index: number | string): TransactionObject<string>

  setBaseURI(
    _baseURI: string,
    options?: EstimateGasOptions
  ): TransactionObject<void>

  issueToken(
    _beneficiary: string,
    _wearableId: string,
    options?: EstimateGasOptions
  ): TransactionObject<void>

  ownerOf(tokenId: number | string): TransactionObject<string>

  baseURI(): TransactionObject<string>

  balanceOf(owner: string): TransactionObject<string>

  renounceOwnership(options?: EstimateGasOptions): TransactionObject<void>

  getWearableKey(_wearableId: string): TransactionObject<string>

  owner(): TransactionObject<string>

  isOwner(): TransactionObject<boolean>

  symbol(): TransactionObject<string>

  setApprovalForAll(
    to: string,
    approved: boolean,
    options?: EstimateGasOptions
  ): TransactionObject<void>

  isComplete(): TransactionObject<boolean>

  wearables(arg0: number | string): TransactionObject<string>

  issued(arg0: string | number[]): TransactionObject<string>

  tokenURI(_tokenId: number | string): TransactionObject<string>

  allowed(arg0: string): TransactionObject<boolean>

  wearablesCount(): TransactionObject<string>

  maxIssuance(arg0: string | number[]): TransactionObject<string>

  isApprovedForAll(owner: string, operator: string): TransactionObject<boolean>

  transferOwnership(
    newOwner: string,
    options?: EstimateGasOptions
  ): TransactionObject<void>

  batchTransferFrom(
    _from: string,
    _to: string,
    _tokenIds: (number | string)[],
    options?: EstimateGasOptions
  ): TransactionObject<void>

  completeCollection(options?: EstimateGasOptions): TransactionObject<void>
}
