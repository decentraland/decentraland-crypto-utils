# decentraland-crypto-utils

This library includes a number of helpful pre-built tools that help you deal with common requirements that involve and interacting with data on the blockchain.

- [MANA](#mana-operations)
	- [Send MANA](#send-mana-to-an-address)
	- [Get a player's MANA Balance](#get-a-players-mana-balance)
- [Currencies](#other-currencies)
	- [Send](#send)
	- [Check Balance](#check-balance)
	- [Other Functions](#other-functions)
- [NFTs](#NFTs)
	- [Transfer an NFT](#transfer-an-nft)
	- [Other Functions](#other-functions-1)
- [Sign Message](#Signing-Messages)
- [Decentraland contracts](#decentraland-contracts)
- [Marketplace](#The-Marketplace)
	- [Buy an item from the marketplace](#buy-an-item-from-the-marketplace)
	- [Check the player's authorizations](#check-the-players-authorizations)
	- [Sell from a scene](#sell-from-a-scene)
	- [Cancel the selling of a token](#cancel-the-selling-of-a-token)
- [Third parties operating tokens](#Third-parties-operating-tokens)
	- [Currencies](#currencies)
	- [NFTs](#nfts-1)
- [Call functions from any contract](#Call-functions-from-any-contract)
- [Avatar](#Avatar)
	- [Get user information](#get-user-information)
	- [Get user inventory](#get-user-inventory)
	- [Check if a player has an item](#check-if-a-player-has-an-item)
	- [Check if a player has one of several items](#check-if-a-player-has-one-of-several-items)
	- [Get data of all wearables](#get-data-of-all-wearables)

## Using the Crypto library

To use any of the helpers provided by the utils library

1. Install it as an `npm` package. Run this command in your scene's project folder:

```
npm i @dcl/crypto-utils@latest
```

2. Import the library into the scene's script. Add this line at the start of your `game.ts` file, or any other TypeScript files that require it:

```ts
import * as crypto from '../node_modules/@dcl/crypto-utils/index'

```

If you'll only be using part of this library in your scene, we recommend instead only importing the specific relevant subfolder/s. For example:

```ts
import * as mana from '../node_modules/@dcl/crypto-utils/mana/index'
import * as currency from '../node_modules/@dcl/crypto-utils/currency/index'
import * as nft from '../node_modules/@dcl/crypto-utils/nft/index'
import * as marketplace from '../node_modules/@dcl/crypto-utils/marketplace/index'
import * as wearable from '../node_modules/@dcl/crypto-utils/wearable/index'
```

3. In your TypeScript file, write `crypto.` and let the suggestions of your IDE show the available helpers.


## MANA Operations

As MANA is Decentraland's main currency, this library provides tools to make it especially easy to use in a scene.

### Send MANA to an address

To make players in your scene send MANA to a specific address, use the `send()` function. This function requires the following arguments:

- `toAddress`: What ethereum address to send the MANA to
- `amount`: How many MANA tokens to send
- `waitConfirm`: _boolean_ (optional) If true, the function will not be completed till the transaction is mined and added to a block in the blockchain. If false (default value), the function will be completed as soon as the transaction is requested.

```ts
mana.send(`0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`, 100)
```

For example, your scene can have a button that requests players to make a MANA payment to the scene cretor's personal wallet. The button opens a door, but only once a transaction is sent to pay the fee.

```ts
import * as mana from '../node_modules/@dcl/crypto-utils/mana/index'

(...)

let myWallet = `0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`

button.addComponent(new OnPointerDown(async e => {
	await mana.send(myWallet, 100, true).then(
		// open door
	)
  }
))
```

In this scenario, when players click on the button, they are prompted by Metamask to accept the transaction, paying the required MANA sum plus an ETH gas fee dictated by the market at that time. 

What's executed after the `.send()` function ( in the `.then()` statement in this case ) only gets called when the function is finished. If `waitConfirm` is false, then the function ends as soon as the transaction is accepted by the player on Metamask. If `waitConfirm` is true, the function doesn't end until the transaction is mined by the blockchain, which could take a couple of minutes, depending on the gas fee paid.

Having `waitConfirm` set to false makes the scene respond faster, but the transaction at this point has no confirmations from the blockchain, so the function is vulnerable to a 0 gas fee exploit. If a player sets the gas price of the transaction to 0, or lower than the market fee, the transaction will never be carried out by the workers in the blockchain, but the player will experience things as if having paid the price. Setting `waitConfirm` to true prevents this risk, but delays the response of the scene.


### Get a player's MANA Balance

Look up how much MANA a player has in their wallet. This is useful to know in advance if a player will be able to pay a fee or buy something from the Marketplace.

Check the current player's balance with `myBalance()`. This function doesn't require any arguments.

```ts
import mana from '../node_modules/@dcl/crypto-utils/mana/index'

let balance = await mana.myBalance()
log(balance)
```

Check the balance of any other wallet with `balance()`. This function just requires the wallet address to check, as a string.


```ts
import * as mana from '../node_modules/@dcl/crypto-utils/mana/index'

let myWallet = `0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`

let balance = await mana.balance(myWallet)
log(balance)
```

## Other Currencies

Any currency token that adheres to the ERC20 standard can be handled by this library.


### Send


To make players in your scene send a currency token to a specific address, use the `send()` function. This function requires the following arguments:

- `contractAddress`: The address of the smart contract for the token to be sent
- `toAddress`: What ethereum address to send the tokens to
- `amount`: How many tokens to send
- `waitConfirm`: _boolean_ (optional) If true, the function will not be completed till the transaction is mined and added to a block in the blockchain. If false (default value), the function will be completed as soon as the transaction is requested.


```ts
crypto.currency.send('0x6B175474E89094C44Da98b954EedeAC495271d0F' , `0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`, 100)
```

For example, your scene can have a button that requests players to make a DAI payment to the scene cretor's personal wallet. The button opens a door, but only once a transaction is sent to pay the fee.

```ts
import * as currency from '../node_modules/@dcl/crypto-utils/currency/index'

(...)

let myWallet = `0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`

button.addComponent(new OnPointerDown(async e => {
	await currency.send('0x6B175474E89094C44Da98b954EedeAC495271d0F', myWallet, 1, true).then(
		// open door
	)
  }
))
```

In this scenario, when players click on the button, they are prompted by Metamask to accept the transaction, paying the required DAI sum plus an ETH gas fee dictated by the market at that time. Once that transaction is accepted on Metamask, the door opens.

What's executed after the `.send()` function ( in the `.then()` statement in this case ) only gets called when the function is finished. If `waitConfirm` is false, then the function ends as soon as the transaction is accepted by the player on Metamask. If `waitConfirm` is true, the function doesn't end until the transaction is mined by the blockchain, which could take a couple of minutes, depending on the gas fee paid.

Having `waitConfirm` set to false makes the scene respond faster, but the transaction at this point has no confirmations from the blockchain, so the function is vulnerable to a 0 gas fee exploit. If a player sets the gas price of the transaction to 0, or lower than the market fee, the transaction will never be carried out by the workers in the blockchain, but the player will experience things as if having paid the price. Setting `waitConfirm` to true prevents this risk, but delays the response of the scene.


### Check balance


Look up how much of a coin a player has in their wallet. This is useful to know in advance if a player will be able to pay a fee or buy something in the scene.

Check the balance of any other wallet with `balance()`. This function requires the following arguments:

- `contractAddress`: Addess of the token's smart contract.
- `address`: Wallet address that you want to check the balance of.


```ts
import * as currency from '../node_modules/@dcl/crypto-utils/currency/index'

let myWallet = `0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`

let balance = await currency.balance('0x6B175474E89094C44Da98b954EedeAC495271d0F', myWallet)
log(balance)
```


### Other functions

Call any functions that are available in a token's contract by instancing a `contract` object. When doing so, you must pass the token's address as a parameter.

```ts
import * as currency from '../node_modules/@dcl/crypto-utils/currency/index'
import { mainnet } from '../node_modules/@dcl/crypto-utils/utils/contract'

executeTask(async () => {
	const contract = await currency.getContract(mainnet.MANAToken)
	log(contract.contract.totalSupply() )
})
```

The `getContract()` function also returns the `requestManager` object, which you can use to have greater control over the handling of the transaction.

```ts
const {contract, requestManager} = await currency.getContract(mainnet.MANAToken)
```

## NFTs

Any non-fungible token that adheres to the ERC721 standard can be handled by this library. Other tokens that don't adhere to the standard but that share common methods with it can also have those methods accessed through the functions in this library.


### Transfer an NFT

To make players in your scene transfer an NFT to a specific address, use the `transfer()` function. This function requires the following arguments:

- `contractAddress`: The address of the smart contract for the token to be sent
- `toAddress`: What ethereum address to send the tokens to
- `tokenId`: The id of the specific token to send within the smart contract
- `waitConfirm`: _boolean_ (optional) If true, the function will not be completed till the transaction is mined and added to a block in the blockchain. If false (default value), the function will be completed as soon as the transaction is requested.


```ts
crypto.nft.transfer(Mainnet.Halloween2019Collection, `0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`, 1)
```

For example, your scene can have a button that requires sending any wearable item to the scene cretor's personal wallet. The button opens a door, but only once a transaction is sent to transfer the token.

```ts
import * as nft from '../node_modules/@dcl/crypto-utils/nft/index'

(...)

let myWallet = `0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`

button.addComponent(new OnPointerDown(async e => {
	await nft.transfer(Mainnet.Halloween2019Collection, myWallet, 1, true).then(
		// open door
	)
  }
))
```

In this scenario, when players click on the button, they are prompted by Metamask to accept the transaction, transfering the NFT token plus paying an ETH gas fee dictated by the market at that time. Once that transaction is accepted on Metamask, the door opens.

What's executed after the `.send()` function ( in the `.then()` statement in this case ) only gets called when the function is finished. If `waitConfirm` is false, then the function ends as soon as the transaction is accepted by the player on Metamask. If `waitConfirm` is true, the function doesn't end until the transaction is mined by the blockchain, which could take a couple of minutes, depending on the gas fee paid.

Having `waitConfirm` set to false makes the scene respond faster, but the transaction at this point has no confirmations from the blockchain, so the function is vulnerable to a 0 gas fee exploit. If a player sets the gas price of the transaction to 0, or lower than the market fee, the transaction will never be carried out by the workers in the blockchain, but the player will experience things as if having paid the price. Setting `waitConfirm` to true prevents this risk, but delays the response of the scene.

### Other functions

Call any functions that are available in a token's contract by instancing a `contract` object. When doing so, you must pass the token's address as a parameter.

```ts
import * as nft from '../node_modules/@dcl/crypto-utils/nft/index'
import { mainnet } from '../node_modules/@dcl/crypto-utils/utils/contract'

executeTask(async () => {
	const contract = await nft.getContract(mainnet.Halloween2019Collection)
	log(contract.contract.totalSupply() )
})
```

The `getContract()` function also returns the `requestManager` object, which you can use to have greater control over the handling of the transaction.

```ts
const {contract, requestManager} = await currency.getContract(mainnet.MANAToken)
```


## Signing Messages

Request a player to use the private key of their Ethereum wallet to sign a message. 

This is a valuable security measure to validate that the player who owns that wallet was truly there, since the signature of a private key can't be forged. Several smart contracts also require passing signed strings as parameters.

```ts
import * as ethereum from '../node_modules/@dcl/crypto-utils/ethereum/index'

executeTask(async () => {
	const message = await ethereum.signMessage('msg: this is a top secret message')
	log(`MESSAGE: `, message)
})
```

> Note: The string for the message to sign must start be preceded by `msg:`.

Whenever the `signMessage()` funcition is called, Metamask will open on the player's browser to request to accept signing the message.

The `signMessage()` function returns an object that contains:

- `message`: The original message that was signed, preceded by the string `# DCL Signed message↵msg:`
- `signature`: The string generated from encrypting the original message through the player's private key


## Decentraland contracts

This library includes an enum list of all official Decentraland-released smart contracts, to easily refer to them when using the different functions.

A separate list exists for contracts on `mainnet`, `ropsten`, `kovan` and `rinkeby` networks.

```ts
import { mainnet } from '../node_modules/@dcl/crypto-utils/utils/contract'

log(mainnet.MANAToken)
```


## The Marketplace

This library exposes several functions that allow players to interact directly with the Decentraland marketplace from inside a scene.



### Buy an item from the marketplace

A player can buy an item that's on sale on the Decentraland marketplace without leaving a Decentraland scene, using the `executeOrder()` function.

This function takes three arguments:
- `nftAddress`: _string_ The address of the smart contract for the token being sold. For example if this is a Decentraland wearable, it would be the address of the collection that the wearable belongs to.
- `assetId`: _number_ The id of the specific token being traded, within its contract.
- `price`: _number_ The price being paid for the item, in MANA. This number is expressed in full MANA units, not in Wei.

> TIP: If you navigate the Marketplace to a wearable that's on sale, you'll find both the `nftAddress` and `assetId` are part of the URL. For example, in the url _https://market.decentraland.org/contracts/0xd35147be6401dcb20811f2104c33de8e97ed6818/tokens/28706_, the `nftAddress` is _0xd35147be6401dcb20811f2104c33de8e97ed6818_ and the `assetId` is _28706_. You can obtain all the required data about wearables on sale by querying the Marketplace API.

> NOTE: The item needs to be currently published on sale in the Decentraland marketplace.


```ts
import * as marketplace from '../node_modules/@dcl/crypto-utils/marketplace/index'


executeTask(async () => {
	await crypto.marketplace.executeOrder(
        	`0xd35147be6401dcb20811f2104c33de8e97ed6818`,
       		`28706`,
        	30
      	)
}
```

To buy the item, the player must give the Decentraland Marketplace permissions to operate with MANA on their behalf. If the player doesn't have these permissions set, the `executeOrder()` will ask for two transactions: one to set these permissions and one to do buy the item. 

> TIP: You can check to see if your wallet has these permissions set by going to the [Marketplace settings page](https://market.decentraland.org/settings) and seeing if this checkbox is checked: **Authorize the Marketplace contract to operate MANA on your behalf**


### Check the player's authorizations

Before a player can buy on the Decentraland Marketplace, they need to give the Marketplace contract permissions to operate with MANA on their behalf. Before a player posts a new order to sell an item, they also need to give the Marketplace permissions to handle items of the contract that items belongs to.

If a player tries to run the `executeOrder()` function without the necessary permissions, the function will handle adding those permissions first.

To check if a player has the necessary permissions to buy with the Marketplace and has enough MANA in their balance, use `isAuthorizedAndHasBalance()`. This function requires one field:

- `price`: _string_ How much MANA the player should have in their balance. This number is expressed in full MANA units, not in Wei.

```ts
import * as marketplace from '../node_modules/@dcl/crypto-utils/marketplace/index'


executeTask(async () => {
	let permissions = await marketplace.isAuthorizedAndHasBalance(1000)
	log(permissions)
})
```

This function returns _true_ only if the player has MANA authorized for the Marketplace, and holds enough MANA currently.

To make the player approve MANA for spending in the Marketplace, you can use the `setApproval()` function of the `currency` section of this library, like so:

```ts
import * as currency from '../node_modules/@dcl/crypto-utils/currency/index'
import { mainnet } from '../node_modules/@dcl/crypto-utils/utils/contract'

executeTask(async () => {
	await currency.setApproval(mainnet.MANAToken, mainnet.Marketplace)
})
```

To check if a player has all of the possible permissions set up for the Marketplace, run the `isAuthorizedAll()` function. This function has one optional parameter

- `address`: _string_ (optional) What player address to check for permissions. If no value is provided, it uses the current player running the scene.


```ts
import * as marketplace from '../node_modules/@dcl/crypto-utils/marketplace/index'


executeTask(async () => {
	let permissions = await marketplace.isAuthorizedAll()
	log(permissions)
})
```

This function returns an object with three main objects, `bidding`, `buying`, and `selling`. Each of these contains a field for each of the available contracts that might have permissions for that purpose, and for each of these contracts, there's an object containing the address and a boolean for the `authorized` status of that contract for that purpose.

Below is an extract of part of what the response looks like:

```
{
	bidding: {
		mana: { address: "0x0f5d2fb29fb7d3cfee444a200298f468908cc942", authorized: true}
	},
	buying: {
		mana: { address: "0x0f5d2fb29fb7d3cfee444a200298f468908cc942", authorized: true}
	}.
	selling: {
		communityContest: { address: "0x32b7495895264ac9d0b12d32afd435453458b1c6", authorized: true},
		(...)
	}
}	
```

If permissions are missing, they can be added with the `setApproval()` function from the `currency` or the `nft`section of the library, depending on the case.

```ts
import * as currency from '../node_modules/@dcl/crypto-utils/currency/index'
import * as nft from '../node_modules/@dcl/crypto-utils/currency/index'
import { mainnet } from '../node_modules/@dcl/crypto-utils/utils/contract'

executeTask(async () => {
	// Give permisions for MANA
	await currency.setApproval(mainnet.MANAToken, mainnet.Marketplace)

	// Give permissions for a specific wearable collection
	await nft.setApproval(mainnet.Halloween2019Collection, mainnet.Marketplace)
})
```

### Sell from a scene

A player can put an item on sale on the Marketplace from within a Decentraland scene using the `createOrder()` function.


This function takes three arguments:
- `nftAddress`: _string_ The address of the smart contract for the token to sell. For example if this is a Decentraland wearable, it would be the address of the collection that the wearable belongs to.
- `assetId`: _number_ The id of the specific token being traded, within its contract.
- `price`: _number_ The price to set for the order, in MANA. This number is expressed in full MANA units, not in Wei.
- `expireAt`: _number_ (optional) When to expire this offer, expressed as milliseconds since January 1, 1970, 00:00:00 UTC. If a value is not set, it defaults to one month from the present time.

> TIP: If you navigate the Marketplace to a wearable that's on sale, you'll find both the `nftAddress` and `assetId` are part of the URL. For example, in the url _https://market.decentraland.org/contracts/0xd35147be6401dcb20811f2104c33de8e97ed6818/tokens/28706_, the `nftAddress` is _0xd35147be6401dcb20811f2104c33de8e97ed6818_ and the `assetId` is _28706_. You can obtain all the required data about wearables on sale by querying the Marketplace API.


```ts
import * as marketplace from '../node_modules/@dcl/crypto-utils/marketplace/index'


executeTask(async () => {
	await crypto.marketplace.createOrder(
        	`0xd35147be6401dcb20811f2104c33de8e97ed6818`,
       		`28706`,
        	30
      	)
}
```
> NOTE: The player creating the order needs to own the token being put on sale. The player must also have permissions set to allow the Marketplace contract to operate with this specific token contract. If it's a wearable, the player must have granted permissions for that specific wearable collection.

### Cancel the selling of a token

A token that's on sale on the Marketplace can be taken off sale from within a scene, by using the `cancelOrder()` function.

This function takes two arguments:
- `nftAddress`: _string_ The address of the smart contract for the token to sell. For example if this is a Decentraland wearable, it would be the address of the collection that the wearable belongs to.
- `assetId`: _number_ The id of the specific token being traded, within its contract.

> TIP: If you navigate the Marketplace to a wearable that's on sale, you'll find both the `nftAddress` and `assetId` are part of the URL. For example, in the url _https://market.decentraland.org/contracts/0xd35147be6401dcb20811f2104c33de8e97ed6818/tokens/28706_, the `nftAddress` is _0xd35147be6401dcb20811f2104c33de8e97ed6818_ and the `assetId` is _28706_. You can obtain all the required data about wearables on sale by querying the Marketplace API.


```ts
import * as marketplace from '../node_modules/@dcl/crypto-utils/marketplace/index'


executeTask(async () => {
	await crypto.marketplace.cancelOrder(
        	`0xd35147be6401dcb20811f2104c33de8e97ed6818`,
       		`28706`
      	)
}
```
> NOTE: The player cancelling the order needs to be the creator of the order in the Marketplace and own the token being put on sale. The player must also have permissions set to allow the Marketplace contract to operate with this specific token contract. If it's a wearable, the player must have granted permissions for that specific wearable collection.


<!--
## Trading tokens with Kyberswap

### Query token data

getCurrencies()
getACurrency()
getMarketPair()

### Query exchange data

getQuote()
getExpectedRate()

### Carry out a transaction

exchange()
-->

## Third parties operating tokens

You can check if a given contract is allowed to handle a given token for a player, and otherwise carry out a transaction to allow it to. 

Many smart contracts require to be given explicit permission by a wallet owner to operate with the token on their behalf, especially when the contract has the ability to remove tokens from the owner's balance.

### Currencies

To check if a contract has permissions to handle a specific currency token for a player, use the  `isApproved()` function. This function takes 3 arguments:

- `contractAddress`: _string_  Address of the token smartcontract to check
- `owner`: _string_ Address of the player that is currently holding the token
- `spender`: _string_ Address of the contract to check for having permissions to spend the token

```ts
import * as currency from '../node_modules/@dcl/crypto-utils/currency/index'
import { mainnet } from '../node_modules/@dcl/crypto-utils/utils/contract'

executeTask(async () => {
	let approval = await currency.isApproved(mainnet.MANAToken, mainnet.Marketplace)
	log(approval)
})
```

The `isApproved()` function returns a boolean indicating wether permissions are there or not. 

To check how much is the maximum allowance that a contract has to handle a specific currency token for a player, use the `allowance()` function. This function takes three arguments:

- `contractAddress`: _string_  Address of the token smartcontract to check
- `owner`: _string_ Address of the player that is currently holding the token
- `spender`: _string_ Address of the contract to check for having permissions to spend the token

```ts
import * as currency from '../node_modules/@dcl/crypto-utils/currency/index'
import { mainnet } from '../node_modules/@dcl/crypto-utils/utils/contract'

executeTask(async () => {
	let approval = await currency.allowance(mainnet.MANAToken, mainnet.Marketplace)
	log(approval)
})
```

The `allowance()` function returns a string with the number of allowed currency, expressed in wei units.


To grant permissions to a contract to handle a specific currency token for a player, use the  `setApproval()` function. This function takes 4 arguments:

- `contractAddress`: _string_  Address of the token smartcontract to check
- `spender`: _string_ Address of the contract to check for having permissions to spend the token
- `waitConfirm`: _boolean_ (optional) If true, resolve promise when the transaction is mined on the blockchain
- `amount`: _string_ (optional) Maximum amount of the currency to allow the spender to spend


```ts
import * as currency from '../node_modules/@dcl/crypto-utils/currency/index'
import { mainnet } from '../node_modules/@dcl/crypto-utils/utils/contract'

executeTask(async () => {
	await currency.setApproval(mainnet.MANAToken, mainnet.Marketplace, true)
})
```


### NFTs



To check if a contract has permissions to handle a specific type of NFT for a player, use the  `isApprovedForAll()` function. This function takes 3 arguments:

- `contractAddress`: _string_  Address of the token smartcontract to check
- `assetHolder`: _string_ Address of the player that is currently holding the token
- `operator`: _string_ Address of the contract to check for having permissions to handle the token

```ts
import * as nft from '../node_modules/@dcl/crypto-utils/nft/index'
import { mainnet } from '../node_modules/@dcl/crypto-utils/utils/contract'

executeTask(async () => {
	let approval = await nft.isApproved(mainnet.Halloween2019Collection, mainnet.Marketplace)
	log(approval)
})
```

The `isApproved()` function returns a boolean indicating wether permissions are there or not. 

To grant permissions to a contract to handle a specific NFT for a player, use the  `setApprovalForAll()` function. This function takes 4 arguments:

- `contractAddress`: _string_  Address of the token smartcontract to check
- `operator`: _string_ Address of the contract to check for having permissions to spend the token
- `approved`: _boolean_ (optional) If _true_, sets the contract as approved for this NFT, if _false_, it removes these same approvals. _true_ by default.

```ts
import * as nft from '../node_modules/@dcl/crypto-utils/nft/index'
import { mainnet } from '../node_modules/@dcl/crypto-utils/utils/contract'

executeTask(async () => {
	await nft.setApprovalForAll(mainnet.Halloween2019Collection, mainnet.Marketplace, true)
})
```


## Call functions from any contract

Call any functions that are available in any smart contract by instancing a `contract` object. When doing so, you must pass:

- `contractAdress`:  The token's Ethereum smart contract address.
- `abi`: The ABI definition for the contract, where all of its functions and parameters are listed

```ts
import {getContract } from '../node_modules/@dcl/crypto-utils/utils/contract'


executeTask(async () => {
	const contract = await getContract('0xF87E31492Faf9A91B02Ee0dEAAd50d51d56D5d4d', LANDAbi)
})
```

The `getContract()` function also returns the `requestManager` object, which you can use to have greater control over the handling of the transaction.

```ts
const {contract, requestManager} = await currency.getContract(mainnet.MANAToken)
```

You can obtain the ABI of a contract on etherscan. For example, if you go to the Etherscan page for the [LAND contract](https://etherscan.io/address/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d#code), you can find the ABI by picking the *Contract* tab in the bottom section and then scrolling down. You can export the ABI to JSON, and add that as a file in your scene's project, or paste its contents into a *.ts* file in your scene's project.
 
## Avatar

### Get user information

To get information about an user, use the `getUserInfo()` function.

`getUserInfo` has one optional argument:

- `address`: _string_ which is the ETH address of a user

If an address is not specified, the function will use the address of the current user running the scene.

This example retrieves the data of an address and prints the username in console:

```ts
import * as avatar from '../node_modules/@dcl/crypto-utils/avatar/index'

avatar
  .getUserInfo('0x521b0fef9cdcf250abaf8e7bc798cbe13fa98692')
  .then(userInfo => {
    log(userInfo.metadata.avatars[0].name)
  })
```

The `getUserData()` function returns the following information:

- `content`: An array containing four objects, each with the path to a different screenshot of the player: a full body image, and three versions of the face in full and in thumbnail resolution.
- `metdta`: An object that includes: 
	- `avatar`: All of the wearables and configurations on the avatar
	- `inventory`: All of the wearables the player owns
	- `ethAddress`: _(string)_ The public key of the player's Ethereum wallet. If the player has no linked wallet, this field will be `null`.
	- `name`: The player's user name, as others see in-world
	- `userId`: _(string)_ A UUID string that identifies the player. If the player has a public key, this field will have the same value as the public key.
	the player's email and bio if present.
- `timestamp`: A timestamp for the time this data was fetched.

> Note: For any Ethereum transactions with the player, always use the `ethAddress` field, instead of the `userId`.

### Get user inventory

To fetch the full inventory of wearable items owned by a player, use the `getUserInventory()` function.

`getUserInventory` has one optional argument:

- `address`: _string_ which is the ETH address of an user

If an address is not specified, the function will use the address of the current user running the scene.

This example retrieves the inventory of an address and print a list of items in the console:

```ts
import * as avatar from '../node_modules/@dcl/crypto-utils/avatar/index'

avatar
  .getUserInventory('0x521b0fef9cdcf250abaf8e7bc798cbe13fa98692')
  .then(inventory => {
    log(inventory)
  })
```

This function returns an array with the full names of each wearabe, for example: 

```
["dcl://halloween_2019/zombie_suit_mask", "dcl://community_contest/cw_tuxedo_tshirt_upper_body", "dcl://dcl_launch/mana_hoodie_upper_body"]
```

### Check if a player has an item

To check if an item is in the inventory of a player, use the `itemInInventory` function.

`itemInInventory` has one required and one optional argument:

- `wearable`: _string_ which is the name of a wearable (e.g.: `dcl://dcl_launch/razor_blade_upper_body`)

- `equiped`: _boolean_ (optional) if true, the player must have the item currently equipped (default: false)

This example checks if the player has the *Razor Blade Jacket* wearable equiped. If so, the function returns _true_.

```ts
import * as avatar from '../node_modules/@dcl/crypto-utils/avatar/index'

avatar
  .itemInInventory('dcl://dcl_launch/razor_blade_upper_body', true)
  .then(isItemEquiped => {
    if(isItemEquiped) log("The Razor Blade jacket is equiped")
    else log("This item is not equiped")
  })
```

> Tip: You can find out the full name of a wearable by using `getListOfWearables()` to get a full list of all wearables supported by Decentraland, with all their information.

### Check if a player has one of several items

To check if at least one of several items are in the inventory of a player, use the `itemsInInventory` function.

`itemsInInventory` has one required and one optional argument:

- `wearables`: _string[]_ An array with the string names of the wearables to look for (e.g.: `["dcl://dcl_launch/razor_blade_upper_body", "dcl://community_contest/cw_tuxedo_tshirt_upper_body"]`).

- `equiped`: _boolean_ (optional) if true, the player must have one of the items currently equipped (default: false).

This example checks if the player has the Razor Blade Jacket equiped or the Tuxedo Shirt. If so, the function returns _true_.

```ts
import * as avatar from '../node_modules/@dcl/crypto-utils/avatar/index'

avatar
  .itemsInInventory(["dcl://dcl_launch/razor_blade_upper_body", "dcl://community_contest/cw_tuxedo_tshirt_upper_body"], true)
  .then(isItemEquiped => {
    if(isItemEquiped) log("One of the items is equiped")
    else log("None of the items are equiped")
  })
```

> Tip: You can find out the full name of a wearable by using `getListOfWearables()` to get a full list of all wearables supported by Decentraland, with all their information.

### Get data of all wearables

To fetch a full list of all wearables supported by Decentraland, including their full names, categories, contracts, etc, call the `getListOfWearables()`. This function doesn't take any arguments.

```ts
import * as wearable from '../node_modules/@dcl/crypto-utils/wearalbe/index'

executeTask(async () => {
	const allWearables = await wearable.getListOfWearables()
	log(allWearables)
})
```

This function returns an array of wearable collections, where each of these collections has a `wearables` field that contains a list of all wearables in that collection. Below is an extract of what this data looks like:

```ts
[ {id: "halloween_2019", wearables: [
		{
			baseUrl: "https://wearable-api.decentraland.org/v2/collections/halloween_2019/",
			category: "earring",
			description: "It may be someone else's head but that doesn't mean you can't look good",
			hides: [],
			i18n:0: [{code: "en", text: "Spider Earrings"}, {code: "es", text: "Pendientes de Araña"}],
			id: "dcl://halloween_2019/bride_of_frankie_earring",
			image: "QmZsnoehbtLDfk2FKbpDAk8nFatknSFQFqphF6RQu3Nkd7",
			rarity: "mythic",
			replaces: [],
			representations: [{…}],
			tags: (6) ["accesories", "exclusive", "earrings", "halloween", "spider", "exclusive"],
			thumbnail: "QmSfe6dHYXAvsbMBTNGWwHtsr2aBoMjUrCW2TeLbCPw4oZ",
			type: "wearable"
		}, (...)
	]
  },
  {id: "xmas_2019", wearables: [(...)]},
  (...)	
]
```




