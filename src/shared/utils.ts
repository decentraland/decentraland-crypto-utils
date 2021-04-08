import { getCurrentRealm } from "@decentraland/EnvironmentAPI"
import { Representation, Type, Wearable } from "../wearable/types"

export function getCatalystUrl(): Promise<string> {
  return getCurrentRealm()
    .then((r: any) => r.domain != 'http://127.0.0.1:8000' ? r.domain : 'https://peer.decentraland.org')
}

export function mapV2WearableIntoV1(catalystUrl: string, v2Wearable: any): Wearable {
  const { id, data, rarity, i18n, thumbnail, image } = v2Wearable
  const { category, tags, hides, replaces, representations } = data
  const newRepresentations: Representation[] = representations.map(mapV2RepresentationIntoV1)
  const newThumbnail = thumbnail.substring(thumbnail.lastIndexOf('/') + 1)
  const newImage = image ? image.substring(image.lastIndexOf('/') + 1) : undefined

  return {
    id,
    type: Type.Wearable,
    category,
    tags,
    hides,
    replaces,
    rarity,
    representations: newRepresentations,
    i18n,
    thumbnail: newThumbnail,
    image: newImage,
    baseUrl: `${catalystUrl}/content/contents/`,
  }
}

function mapV2RepresentationIntoV1(representation: any): Representation {
  const { contents, bodyShapes, ...other } = representation
  const newContents = contents.map(({ key, url }: { key: string; url: string }) => ({
    file: key,
    hash: url.substring(url.lastIndexOf('/') + 1)
  }))
  return {
    ...other,
    bodyShapes,
    contents: newContents
  }
}