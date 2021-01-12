export interface CurrenciesData {
  data: Currency[]
  success: boolean
}

export interface Currency {
  symbol: string
  name: string
  address: string
  decimals: number
  gasLimit?: string
  sp_limit_order?: boolean
  is_quote?: boolean
  quote_priority?: number
  is_gas_fixed?: boolean
  listing_time?: number
  gasApprove?: number
}

export interface MarketData {
  data: Pair[]
  error: boolean
  timestamp: number
}

export interface Pair {
  pair: string
  change: string
  volume: string
  buy_price: string
  sell_price: string
}
