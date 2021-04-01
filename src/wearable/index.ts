import { getCatalystUrl, mapV2WearableIntoV1 } from "../shared/utils";

export async function getListOfWearables(filters: AtLeastOne<WearableFilters>): Promise<Wearable[]> {
  const queryParams = convertObjectToQueryParamString(filters)
  const catalystUrl = await getCatalystUrl()

  return fetch(`${catalystUrl}/lambdas/collections/wearables${queryParams}`)
    .then(res => res.json())
    .then(res => res.wearables)
    .then(wearables => wearables.map(wearable => mapV2WearableIntoV1(catalystUrl, wearable)))
}

function convertObjectToQueryParamString(object: Record<string, number | boolean | string | number[] | boolean[] | string[]>):string {
  let result = ""
  for (const key in object) {
    const value = object[key]
    if (!value) continue
    const name = key.substr(key.length - 1) === 's' ? key.slice(0, -1) : key
    let values: string[]
    if (Array.isArray(value)) {
      values = [...value].map((_) => `${_}`)
    } else {
      values = [`${value}`]
    }
    result += result.length > 0 ? `?` : '&'
    result += `${name}=` + values.join(`&${name}=`)
  }
  return result
}

type WearableFilters = {
  collectionIds: string[]
  wearableIds: string[]
  textSearch: string
}
type AtLeastOne<T, U = {[K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]