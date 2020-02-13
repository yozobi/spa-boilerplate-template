/**
 * Ensures introspection result is up to date,
 * and does not fail if the variables are not set.
 * This is so you can safely generate code from the
 * introspected json.
 */
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const introspectionFilePath = path.resolve(
  __dirname,
  '../schema.generated.graphql',
);

if (
  process.env.REACT_APP_HASURA_ENDPOINT &&
  process.env.REACT_APP_HASURA_SECRET
) {
  try {
    const result = execSync(
      `gq ${process.env.REACT_APP_HASURA_ENDPOINT} --introspect -H 'X-Hasura-Admin-Secret: ${process.env.REACT_APP_HASURA_SECRET}'`,
      { stdio: 'pipe' },
    ).toString();
    if (result) {
      fs.writeFileSync(introspectionFilePath, result);
    }
  } catch (e) {
    console.log(e);
    console.log(
      'WARNING: Could not fetch from remote schema\n - Check your Hasura endpoint is running',
    );
    console.log();
    console.log(`Endpoint: ${process.env.REACT_APP_HASURA_ENDPOINT}`);
    console.log(
      `X-Hasura-Admin-Secret: ${process.env.REACT_APP_HASURA_SECRET}`,
    );
    console.log();
    console.log('Falling back on local schema...');
    console.log();
  }
}
