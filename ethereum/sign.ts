import * as eth from '@decentraland/EthereumController'

export async function signMessage(messageToSign: string) {
  const convertedMessage = await eth.convertMessageToObject(messageToSign)
  const { message, signature } = await eth.signMessage(convertedMessage)
  return { message, signature }
}