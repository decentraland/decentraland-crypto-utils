import { TransactionObject, BlockType, EstimateGasOptions } from '../../utils/types'
import * as eth from 'eth-connect'

interface EventOptions {
  filter?: object
  fromBlock?: BlockType
  topics?: string[]
}

export interface Kyberswap extends eth.Contract {
  constructor(jsonInterface: any[], address?: string, options?: any)
  clone(): Kyberswap
  addAlerter(newAlerter: string): TransactionObject<void>

  addOperator(newOperator: string): TransactionObject<void>

  admin(): TransactionObject<string>

  claimAdmin(): TransactionObject<void>

  enabled(): TransactionObject<boolean>

  getAlerters(): TransactionObject<string[]>

  getExpectedRate(
    src: string,
    dest: string,
    srcQty: number | string
  ): TransactionObject<{
    expectedRate: string
    worstRate: string
    0: string
    1: string
  }>

  getExpectedRateAfterFee(
    src: string,
    dest: string,
    srcQty: number | string,
    platformFeeBps: number | string,
    hint: string | number[]
  ): TransactionObject<string>

  getOperators(): TransactionObject<string[]>

  kyberHintHandler(): TransactionObject<string>

  kyberNetwork(): TransactionObject<string>

  maxGasPrice(): TransactionObject<string>

  pendingAdmin(): TransactionObject<string>

  removeAlerter(alerter: string): TransactionObject<void>

  removeOperator(operator: string): TransactionObject<void>

  setHintHandler(_kyberHintHandler: string): TransactionObject<void>

  setKyberNetwork(_kyberNetwork: string): TransactionObject<void>

  swapEtherToToken(token: string, minConversionRate: number | string): TransactionObject<string>

  swapTokenToEther(
    token: string,
    srcAmount: number | string,
    minConversionRate: number | string
  ): TransactionObject<string>

  swapTokenToToken(
    src: string,
    srcAmount: number | string,
    dest: string,
    minConversionRate: number | string
  ): TransactionObject<string>

  trade(
    src: string,
    srcAmount: number | string,
    dest: string,
    destAddress: string,
    maxDestAmount: number | string,
    minConversionRate: number | string,
    platformWallet: string
  ): TransactionObject<string>

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

  tradeWithHintAndFee(
    src: string,
    srcAmount: number | string,
    dest: string,
    destAddress: string,
    maxDestAmount: number | string,
    minConversionRate: number | string,
    platformWallet: string,
    platformFeeBps: number | string,
    hint: string | number[]
  ): TransactionObject<string>

  transferAdmin(newAdmin: string): TransactionObject<void>

  transferAdminQuickly(newAdmin: string): TransactionObject<void>

  withdrawEther(amount: number | string, sendTo: string): TransactionObject<void>

  withdrawToken(token: string, amount: number | string, sendTo: string): TransactionObject<void>
}
