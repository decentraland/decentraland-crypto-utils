import { Wearables } from "./types";

export async function getListOfWearables(){
  return await fetch('https://wearable-api.decentraland.org/v2/collections').then(res => res.json()) as Wearables[]
}
