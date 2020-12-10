/**
 * Ensures introspection result is up to date,
 * and does not fail if the variables are not set.
 * This is so you can safely generate code from the
 * introspected json.
 */
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const {
  getIntrospectionQuery,
  printSchema,
  buildClientSchema,
} = require('graphql');

const getRemoteSchema = async (endpoint, headers) => {
  const { data, errors } = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query: getIntrospectionQuery() }),
  }).then((res) => res.json());

  const schema = buildClientSchema(data);
  return printSchema(schema);
};

const introspectionFilePath = path.resolve(
  __dirname,
  '../schema.generated.graphql',
);

const run = async () => {
  try {
    const result = await getRemoteSchema(
      process.env.REACT_APP_HASURA_ENDPOINT,
      {
        'X-Hasura-Admin-Secret': process.env.REACT_APP_HASURA_SECRET,
      },
    );

    if (result) {
      fs.writeFileSync(introspectionFilePath, result);
    }
  } catch (e) {
    console.log(e);
    console.log(
      'WARNING: Could not fetch from remote schema\n - Check your Hasura endpoint is running',
    );
    console.log();
    console.log(
      `Endpoint: ${JSON.stringify(process.env.REACT_APP_HASURA_ENDPOINT)}`,
    );
    console.log(
      `X-Hasura-Admin-Secret: ${JSON.stringify(
        process.env.REACT_APP_HASURA_SECRET,
      )}`,
    );
    console.log();
    console.log('Falling back on local schema...');
    console.log();
  }
};

/** If in CI mode, don't fetch anything but don't fail */
if (process.env.CI) {
  return;
}

if (
  process.env.REACT_APP_HASURA_ENDPOINT &&
  process.env.REACT_APP_HASURA_SECRET
) {
  run();
}
