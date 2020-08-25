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
npm install https://github.com/HPrivakos/decentraland-crypto-utils.git
```

2. Import the library into the scene's script. Add this line at the start of your `game.ts` file, or any other TypeScript files that require it:

```ts
import crypto from '../node_modules/decentraland-crypto-utils/index'

```

If you'll only be using part of this library in your scene, we recommend instead only importing the specific relevant subfolder/s. For example:

```ts
import mana from '../node_modules/decentraland-crypto-utils/mana/index'
import currency from '../node_modules/decentraland-crypto-utils/currency/index'
import nft from '../node_modules/decentraland-crypto-utils/nft/index'
import marketplace from '../node_modules/decentraland-crypto-utils/marketplace/index'
import wearable from '../node_modules/decentraland-crypto-utils/wearable/index'
```

3. In your TypeScript file, write `crypto.` and let the suggestions of your IDE show the available helpers.

## MANA Operations


### Send MANA to an address

To send MANA to a predefined address, use the `send()` function. This function requires the following arguments:

- `toAddress`: What ethereum address to send the MANA to
- `amount`: How many MANA tokens to send

```ts
crypto.mana.send(`0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`, 100)
```

For example, you could have a button that requests players to make a MANA payment to the scene cretor's personal wallet. The button could open a door, but only once the transaction is sent to pay the fee.

```ts
button.addComponent(new OnPointerDown(e => {
	crypto.mana.send(`0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`, 100).then(
		// open door
	)
  }
))
```

In this scenario, when players click on the button, they would be prompted by Metamask to accept the transaction, paying the required MANA sum plus an ETH gas fee dictated by the market at that time . Once that transaction is accepted on Metamask, the door will open.

> Note: What's in the `.then()` argument gets called once the transaction is 




### Get a player's MANA Balance

crypto.mana.myBalance()

crypto.mana.balance()


## Other Currencies




## nfts


## The Marketplace


## Trading tokens with Kyberswap


## Calling Other contracts



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


