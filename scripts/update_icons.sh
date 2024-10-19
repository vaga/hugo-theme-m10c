#!/bin/sh

pushd `dirname "$0"`/icons

yarn install
yarn build

popd
