#!/bin/sh

FEATHER_PATH=`dirname "$0"`/feather

# Clone feather repository
git clone --depth=1 git@github.com:feathericons/feather.git $FEATHER_PATH

pushd $FEATHER_PATH

# Install dependencies
yarn

mkdir dist

# Generate icons.json
npx babel-node bin/build-icons-json.js

# Copy icons.json into theme data
cp dist/icons.json ../../data/m10c/icons.json

popd

# Remove the repository
rm -rf $FEATHER_PATH
