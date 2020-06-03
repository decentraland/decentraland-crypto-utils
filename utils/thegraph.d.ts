export interface TheGraphVariables {
  contracts: string[]
  expiresAt: number
  first: number
  skip: number
  isLand: boolean
  isWearableAccessory: boolean
  isWearableHead: boolean
  onlyOnSale: boolean
  orderBy: string
  orderDirection: 'desc' | 'asc'
  search: string
  wearableGenders: string[]
  wearableRarities: string[]
}