set -e

# Check that you have npm installed
npm --version

# Install global dependencies
npm i -g yarn
yarn global add graphqurl hasura-cli

# Install local dependencies
yarn