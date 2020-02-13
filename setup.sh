set -e
# Check that you have docker installed
docker --version
# Check that you have docker-compose installed
docker-compose --version
# Check that you have npm installed
npm --version
# Install global dependencies
npm i -g graphqurl yarn hasura-cli

yarn