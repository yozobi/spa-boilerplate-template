const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../', process.env.ENV_FILE),
});
const { execSync } = require('child_process');

/**
 * Minimist captures any flags (--from-server, etc)
 * in the objectArgs object below.
 */
var { _: arrayArgs, ...objectArgs } = require('minimist')(
  process.argv.slice(2),
);

const args = [
  ...arrayArgs,
  ...Object.keys(objectArgs).map((key) => `--${key}=${objectArgs[key]}`),
];

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

try {
  const script = `hasura ${args.join(' ')} --endpoint=${
    process.env.HASURA_ENDPOINT
  } --admin-secret=${process.env.HASURA_GRAPHQL_ADMIN_SECRET}`;

  console.log(script);

  execSync(script, {
    cwd: path.resolve(__dirname, '../'),
    stdio: 'inherit',
  });
} catch (e) {
  console.log(e.toString());
  process.exit(1);
}
