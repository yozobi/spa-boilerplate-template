set -e

# Removes troublesome changesets files that prevent
# our strange changeset setup (combination of lerna.json
# and package.json) from working

rm -rf node_modules/@changesets/cli/node_modules/@manypkg
rm -rf node_modules/@changesets/apply-release-plan/node_modules/@manypkg
rm -rf node_modules/@changesets/assemble-release-plan/node_modules/@manypkg
rm -rf node_modules/@changesets/get-release-plan/node_modules/@manypkg
rm -rf node_modules/@changesets/get-dependents-graph/node_modules/@manypkg