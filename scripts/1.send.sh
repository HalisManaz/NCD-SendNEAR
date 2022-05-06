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
