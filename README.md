# decentraland-crypto-utils

This library includes a number of helpful pre-built tools that help you deal with common requirements that involve and interacting with data on the blockchain.

- [Avatar](#Avatar)
	- [Get user information](#get-user-information)
	- [Get user inventory](#get-user-inventory)
	- [Do user has an item](#do-user-has-an-item)
	- [Do user has one of those items](#do-user-has-one-of-those-items)
- [ERC20](#ERC20)
	- [Send ERC20](#send-ERC20)
	- [Send MANA](#send-MANA)
	- [Get allowance](#get-allowance)
	- [Set approval](#set-approval)
- [ERC721](#ERC721)
	- [Transfer ERC721](#transfer-ERC721)
	- [Get allowance](#get-allowance)
	- [Set approval](#set-approval-for-all)
- [Marketplace](#Marketplace)
	- [Search](#search)
	- [Create order](#create-order)
	- [Execute order](#execute-order)
	- [Cancel order](#cancel-order)
	- [Authorizations](#authorization)
- [Third Parties](#Third-Parties)
	- [Kyberswap](#Kyberswap)
		- [Retrieve currencies](#retrieve-currencies)
		- [Retrieve  a currency](#retrieve-a-currency)
		- [Get pairs](#get-pairs)
		- [Get quote](#get-quote)
		- [Get rate](#get-rate)
		- [Exchange](#exchange)

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

As MANA is Decentraland's main currency, this library provies tools to make it especially easy to use in a scene.

### Send MANA to an address

To make players in your scene send MANA to a specific address, use the `send()` function. This function requires the following arguments:

- `toAddress`: What ethereum address to send the MANA to
- `amount`: How many MANA tokens to send

```ts
crypto.mana.send(`0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`, 100)
```

For example, your scene can have a button that requests players to make a MANA payment to the scene cretor's personal wallet. The button opens a door, but only once a transaction is sent to pay the fee.

```ts
import * as mana from '../node_modules/@dcl/crypto-utils/mana/index'

(...)

let myWallet = `0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`

button.addComponent(new OnPointerDown(async e => {
	await mana.send(myWallet, 100).then(
		// open door
	)
  }
))
```

In this scenario, when players click on the button, they are prompted by Metamask to accept the transaction, paying the required MANA sum plus an ETH gas fee dictated by the market at that time . Once that transaction is accepted on Metamask, the door opens.

> Note: What's in the `.then()` argument that follows the `.send()` function gets called once the player approves the transaction in the Metamask window. The transaction at this point has no confirmations from the blockchain, so this function is currently vulnerable to a 0 gas fee exploit. If a player sets the gas price of the transaction to 0, or lower than the market fee, the transaction will never be carried out by the workers in the blockchain.


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

getContract()

### Send


To make players in your scene send a currency token to a specific address, use the `send()` function. This function requires the following arguments:

- `contractAddress`: The address of the smart contract for the token to be sent
- `toAddress`: What ethereum address to send the tokens to
- `amount`: How many tokens to send


```ts
crypto.currency.send('0x6B175474E89094C44Da98b954EedeAC495271d0F' , `0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`, 100)
```

For example, your scene can have a button that requests players to make a DAI payment to the scene cretor's personal wallet. The button opens a door, but only once a transaction is sent to pay the fee.

```ts
import * as currency from '../node_modules/@dcl/crypto-utils/currency/index'

(...)

let myWallet = `0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`

button.addComponent(new OnPointerDown(async e => {
	await currency.send('0x6B175474E89094C44Da98b954EedeAC495271d0F', myWallet, 1).then(
		// open door
	)
  }
))
```

In this scenario, when players click on the button, they are prompted by Metamask to accept the transaction, paying the required DAI sum plus an ETH gas fee dictated by the market at that time. Once that transaction is accepted on Metamask, the door opens.

> Note: What's in the `.then()` argument that follows the `.send()` function gets called once the player approves the transaction in the Metamask window. The transaction at this point has no confirmations from the blockchain, so this function is currently vulnerable to a 0 gas fee exploit. If a player sets the gas price of the transaction to 0, or lower than the market fee, the transaction will never be carried out by the workers in the blockchain.


### Check balance


Look up how much of a coin a player has in their wallet. This is useful to know in advance if a player will be able to pay a fee or buy something in the scene.

Check the balance of any other wallet with `balance()`. This function requires the following arguments:

- `contractAddress`: Addess of the token's smart contract.
- `address`: Wallet address that you want to check the balance of.


```ts
import * as currency from '../node_modules/@dcl/crypto-utils/currency/index'

let myWallet = `0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`

let balance = await mana.balance('0x6B175474E89094C44Da98b954EedeAC495271d0F', myWallet)
log(balance)
```


### Other functions

getContract()
...

## NFTs

### Transfer an NFT

transfer()

### Other functions

getContract()
...

## Signing Messages


## The Marketplace


## Trading tokens with Kyberswap


## Third parties operating tokens

### Currencies


setApproval()

isApproved()

allowance()

### NFTs

isApprovedForAll()
setApprovalForAll()


## Using Other contracts



## Avatar

### Get user information

To get information about an user, use the `getUserInfo` function.

`getUserInfo` has one optional argument:

- `address`: `string` which is the ETH address of an user

If an address is not specified, the function will use the address of the user

This example retrieves to data of an address and print the username in the console:

```ts
import avatar from '../node_modules/decentraland-crypto-utils/avatar/index'

avatar
  .getUserInfo('0x521b0fef9cdcf250abaf8e7bc798cbe13fa98692')
  .then(userInfo => {
    log(userInfo.metadata.avatars[0].name)
  })
```

### Get user inventory

To get information about an user, use the `getUserInventory` function.

`getUserInventory` has one optional argument:

- `address`: `string` which is the ETH address of an user

If an address is not specified, the function will use the address of the user

This example retrieves to data of an address and print a list of items in the console:

```ts
import avatar from '../node_modules/decentraland-crypto-utils/avatar/index'

avatar
  .getUserInventory('0x521b0fef9cdcf250abaf8e7bc798cbe13fa98692')
  .then(inventory => {
    log(inventory)
  })
```

### Do user has an item

To check the inventory of an user, use the `itemInInventory` function.

`itemInInventory` has one required argument:

- `wearable`: `string` which is the name of a wearable (e.g.: `dcl://dcl_launch/razor_blade_upper_body`)

and one optional argument:
- `equiped`: `boolean` if true, the item has to be equiped (default: false)

This example check if the user has the Razor Blade Jacket equiped:

```ts
import avatar from '../node_modules/decentraland-crypto-utils/avatar/index'

avatar
  .itemInInventory('dcl://dcl_launch/razor_blade_upper_body', true)
  .then(isItemEquiped => {
    if(isItemEquiped) log("The Razor Blade jacket is equiped")
    else log("This item is not equiped equiped")
  })
```

### Do user has one of those items

To check the inventory of an user, use the `itemsInInventory` function.

`itemsInInventory` has one required argument:

- `wearables`: `string` which is the name of a wearable (e.g.: `dcl://dcl_launch/razor_blade_upper_body`)

and one optional argument:
- `equiped`: `boolean` if true, the item has to be equiped (default: false)

This example check if the user has the Razor Blade Jacket equiped:

```ts
import avatar from '../node_modules/decentraland-crypto-utils/avatar/index'

avatar
  .itemInInventory('dcl://dcl_launch/razor_blade_upper_body', true)
  .then(isItemEquiped => {
    if(isItemEquiped) log("The Razor Blade jacket is equiped")
    else log("This item is not equiped equiped")
  })
```


