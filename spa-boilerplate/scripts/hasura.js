const { execSync } = require('child_process');
const path = require('path');

const [_, __, ...args] = process.argv;

if (!process.env.HASURA_ENDPOINT) {
  console.log(
    `You don't have HASURA_ENDPOINT configured in your .env.<local|dev|beta|production> file`,
  );
  process.exit(1);
}
if (!process.env.HASURA_GRAPHQL_ADMIN_SECRET) {
  console.log(
    `You don't have HASURA_GRAPHQL_ADMIN_SECRET configured in your .env.<local|dev|beta|production> file`,
  );
  process.exit(1);
}

/**
 * This script just formats the hasura CLI command properly,
 * which I was having trouble with in bash.
 */
execSync(
  `hasura ${args.join(' ')} --endpoint=${
    process.env.HASURA_ENDPOINT
  } --admin-secret=${process.env.HASURA_GRAPHQL_ADMIN_SECRET}`,
  {
    cwd: path.resolve(__dirname, '../'),
    stdio: 'inherit',
  },
);
