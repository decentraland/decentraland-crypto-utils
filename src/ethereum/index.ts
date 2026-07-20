import { getUserData } from "~system/UserIdentity"
import * as eth from '@decentraland/EthereumController'

/**
 * Sign a message with your address
 * 
 * @param messageToSign String to sign
 * @returns Initial message and its signature
 */
export async function signMessage(messageToSign: string) {
  const convertedMessage = await eth.convertMessageToObject(messageToSign)
  const { message, signature } = await eth.signMessage(convertedMessage)
  return { message, signature }
}

//TODO: REWRITE SIGN MESSAGE WITHOUT ETHEREUMCOTROLLER