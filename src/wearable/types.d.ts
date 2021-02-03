export interface Wearables {
  id: string
  wearables: Wearable[]
}

export interface Wearable {
  id: string
  representations: Representation[]
  type: Type
  category: Category
  tags: string[]
  baseUrl: string
  i18n: I18N[]
  thumbnail: string
  image: string
  replaces?: Category[]
  hides?: Category[]
  description?: string
  rarity?: Rarity
}

export enum Category {
  BodyShape = 'body_shape',
  Earring = 'earring',
  Empty = '',
  Eyebrows = 'eyebrows',
  Eyes = 'eyes',
  Eyewear = 'eyewear',
  FacialHair = 'facial_hair',
  Feet = 'feet',
  Hair = 'hair',
  Hat = 'hat',
  Head = 'head',
  Helmet = 'helmet',
  LowerBody = 'lower_body',
  Mask = 'mask',
  Mouth = 'mouth',
  Tiara = 'tiara',
  TopHead = 'top_head',
  UpperBody = 'upper_body'
}

export interface I18N {
  code: Code
  text: string
}

export enum Code {
  En = 'en',
  Es = 'es'
}

export enum Rarity {
  Epic = 'epic',
  Legendary = 'legendary',
  Mythic = 'mythic',
  Rare = 'rare',
  Uncommon = 'uncommon'
}

export interface Representation {
  bodyShapes: BodyShape[]
  mainFile: string
  contents: Content[]
  overrideReplaces?: any[]
  overrideHides?: any[]
}

export enum BodyShape {
  Basefemale = 'Basefemale',
  DCLBaseAvatarsBaseFemale = 'dcl://base-avatars/BaseFemale',
  DCLBaseAvatarsBaseMale = 'dcl://base-avatars/BaseMale'
}

export interface Content {
  file: string
  hash: string
}

export enum Type {
  Wearable = 'wearable'
}
