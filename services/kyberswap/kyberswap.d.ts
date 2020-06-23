import {
  TransactionObject,
  BlockType,
  EstimateGasOptions
} from '../../utils/types'
import * as ethEsm from '../../../eth-connect/esm'

interface EventOptions {
  filter?: object
  fromBlock?: BlockType
  topics?: string[]
}

export class Kyberswap extends ethEsm.Contract {
  constructor(jsonInterface: any[], address?: string, options?: any)
  clone(): Kyberswap
  removeAlerter(alerter: string): TransactionObject<void>

  enabled(): TransactionObject<boolean>

  pendingAdmin(): TransactionObject<string>

  getOperators(): TransactionObject<string[]>

  tradeWithHint(
    src: string,
    srcAmount: number | string,
    dest: string,
    destAddress: string,
    maxDestAmount: number | string,
    minConversionRate: number | string,
    walletId: string,
    hint: string | number[]
  ): TransactionObject<string>

  swapTokenToEther(
    token: string,
    srcAmount: number | string,
    minConversionRate: number | string
  ): TransactionObject<string>

  withdrawToken(
    token: string,
    amount: number | string,
    sendTo: string
  ): TransactionObject<void>

  maxGasPrice(): TransactionObject<string>

  addAlerter(newAlerter: string): TransactionObject<void>

  kyberNetworkContract(): TransactionObject<string>

  getUserCapInWei(user: string): TransactionObject<string>

  swapTokenToToken(
    src: string,
    srcAmount: number | string,
    dest: string,
    minConversionRate: number | string
  ): TransactionObject<string>

  transferAdmin(newAdmin: string): TransactionObject<void>

  claimAdmin(): TransactionObject<void>

  swapEtherToToken(
    token: string,
    minConversionRate: number | string
  ): TransactionObject<string>

  transferAdminQuickly(newAdmin: string): TransactionObject<void>

  getAlerters(): TransactionObject<string[]>

  getExpectedRate(
    src: string,
    dest: string,
    srcQty: number | string
  ): TransactionObject<{
    expectedRate: string
    slippageRate: string
    0: string
    1: string
  }>

  getUserCapInTokenWei(user: string, token: string): TransactionObject<string>

  addOperator(newOperator: string): TransactionObject<void>

  setKyberNetworkContract(
    _kyberNetworkContract: string
  ): TransactionObject<void>

  removeOperator(operator: string): TransactionObject<void>

  info(field: string | number[]): TransactionObject<string>

  trade(
    src: string,
    srcAmount: number | string,
    dest: string,
    destAddress: string,
    maxDestAmount: number | string,
    minConversionRate: number | string,
    walletId: string
  ): TransactionObject<string>

  withdrawEther(
    amount: number | string,
    sendTo: string
  ): TransactionObject<void>

  getBalance(token: string, user: string): TransactionObject<string>

  admin(): TransactionObject<string>
}
