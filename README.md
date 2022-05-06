# SendNEAR

This project provides the user to send NEAR tokens to multiple accounts at the same time and different amounts.

There are generally two types of money sending options in the project. 
- The first one, after subtracting the commission from the NEAR token invested in the contract, distributes the tokens equally to the specified addresses. 
- The second, after subtracting the commission from the NEAR token invested in the contract, distributes the tokens to the addresses in the specified amounts.

This repository includes a complete project structure for AssemblyScript contracts targeting the NEAR platform.

There are 1 AssemblyScript contracts in this project:

- **simple** in the `src/simple` folder

### Simple

AssemblyScript contract is written in the "simple style" when the `index.ts` file (the contract entry point) includes a series of exported functions.


```ts
import { storage, Context, u128, logging, ContractPromiseBatch, context} from "near-sdk-as"
import { Sending} from './model';


export function sendMoneyEqually(names: Array<string>): string{
  const sendtrans = new Sending();
  assert(sendtrans.totalAmount > u128.fromString('1000000000000000000000000'), 'Please deposit at least 1 NEAR to create a game');
  const netAmount = u128.sub(sendtrans.totalAmount,u128.fromString('1000000000000000000000000'));
  const amount = u128.sub(netAmount, u128.fromString(names.length.toString().concat('000000000000000000000000')));
  for (var i = 0, len = names.length; i < len; i++) {
    let adress = ContractPromiseBatch.create(names[i]);
    adress.transfer(amount);
  }
  
  return `Congratulations: ${amount} Ⓝ transferred to ${names.join(' and ')}`;
}

export function sendMoneySeperately(names: Array<string>, amounts: Array<i32>): string{
  const sendtrans = new Sending();
  assert(sendtrans.totalAmount > u128.fromString('1000000000000000000000000'), 'Please deposit at least 1 NEAR to create a game');
  const netAmount = u128.sub(sendtrans.totalAmount,u128.fromString('1000000000000000000000000'));
  //const amount = u128.sub(netAmount, u128.fromString(names.length.toString().concat('000000000000000000000000')));
  for (var i = 0, len = names.length; i < len; i++) {
    let adress = ContractPromiseBatch.create(names[i]);
    adress.transfer(u128.fromString(amounts[i].toString().concat('000000000000000000000000')));
  }
  
  return `Congratulations: ${amounts.join(' and ')} Ⓝ transferred to ${names.join(' and ')}`;
}
```


## Usage

INSTALL `NEAR CLI` first like this: `npm i -g near-cli`

1. clone this repo to a local folder
2. run `yarn`
3. run `./scripts/1.send.sh`
4. write terminal `export CONTRACT=<dev-123-456>` 
5. check CONTRACT is valid or not `echo $CONTRACT` 
6. write terminal `near call $CONTRACT sendMoneyEqually '{"names": ["user1.testnet", "user2.testnet"]}' --accountId sender.testnet --amount X` 
7. write terminal `near call $CONTRACT sendMoneySeperately '{"names": ["user1.testnet", "user2.testnet"], "amounts"=[x, y, z}' --accountId sender.testnet --amount X`


### Scripts

**`1.send.sh`**
```ts
#!/usr/bin/env bash

# exit on first error after this point to avoid redeploying with successful build
set -e

echo
echo ---------------------------------------------------------
echo "Step 1: Build the contract (may take a few seconds)"
echo ---------------------------------------------------------
echo

yarn build:release

echo
echo
echo ---------------------------------------------------------
echo "Step 2: Deploy the contract"
echo
echo "(edit scripts/1.dev-deploy.sh to deploy other contract)"
echo ---------------------------------------------------------
echo

# uncomment out the line below to deploy the other example contract
# near dev-deploy ./build/debug/simple.wasm

# comment the line below to deploy the other example contract
near dev-deploy ./build/release/simple.wasm

echo
echo
echo ---------------------------------------------------------
echo "Step 3: Prepare your environment for next steps"
echo
echo "(a) call sendMoney function to send NEAR token to multiple account at the same time"
echo
echo "(b) Insert your accounts which want to send NEAR token as a string array"
echo
echo ---------------------------------------------------------
echo run the following commands
echo
echo 'export CONTRACT=<dev-123-456>'
echo
echo "To check: echo $ CONTRACT"
echo ---------------------------------------------------------
echo

set -e

echo
echo ---------------------------------------------------------
echo "Step 4: Check for environment with string array"
echo ---------------------------------------------------------
echo

exit 0

```

www.patika.dev
