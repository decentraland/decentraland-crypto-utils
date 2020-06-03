import { TransactionObject, BlockType, EstimateGasOptions } from '../utils/types'
import { Contract } from 'eth-connect/esm'

interface EventOptions {
  filter?: object
  fromBlock?: BlockType
  topics?: string[]
}

export class Erc20 extends Contract {
  constructor(jsonInterface: any[], address?: string, options?: any)
  clone(): Erc20
  name(): TransactionObject<string>

  approve(
    _spender: string,
    _value: number | string, options?: EstimateGasOptions
  ): TransactionObject<boolean>

  totalSupply(): TransactionObject<string>

  transferFrom(
    _from: string,
    _to: string,
    _value: number | string,
    options?: EstimateGasOptions
  ): TransactionObject<boolean>

  decimals(): TransactionObject<string>

  balanceOf(_owner: string): TransactionObject<string>

  symbol(): TransactionObject<string>

  transfer(_to: string, _value: number | string, options?: EstimateGasOptions): TransactionObject<boolean>

  allowance(_owner: string, _spender: string): TransactionObject<string>
}
