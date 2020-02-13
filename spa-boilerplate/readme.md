# SPA Boilerplate

## Scripts

### start

From root: `yarn spa start`
From this package: `yarn start`

This will run the create react app setup script, as well as running `hasura:console` and `gql:watch` (documented below)

### build

From root: `yarn spa build`
From this package: `yarn build`

This will run a build script to make a production-ready version of the app.

### e2e

From root: `yarn spa e2e`
From this package: `yarn e2e`

This will run puppeteer on jest to run end-to-end tests on the repo. E2E tests are any test that matches `*.e2e.tsx`.

### e2e:watch

From root: `yarn spa e2e:watch`
From this package: `yarn e2e:watch`

The same as above, but will watch for changes

### lint

From root: `yarn spa lint`
From this package: `yarn lint`

Runs Typescript type checking on the package.

### test

From root: `yarn spa test`
From this package: `yarn test`

Currently, there is no unit testing available in the repo.

### hasura:up

From root: `yarn spa hasura:up`
From this package: `yarn hasura:up`

Runs docker-compose to start the hasura backend locally.

### hasura:down

From root: `yarn spa hasura:down`
From this package: `yarn hasura:down`

Closes the hasura backend using docker-compose.

### get-schema

From root: `yarn spa get-schema`
From this package: `yarn get-schema`

Runs a script to get the introspected graphql schema from the hasura backend. It is built so that it doesn't fail if it doesn't find the schema, so you can run it on a CI.

### gql

From root: `yarn spa gql`
From this package: `yarn gql`

Runs `yarn gql:clear`, then `yarn get-schema`, then runs `graphql-codegen` to generate code from the graphql files you have declared locally.

### gql:watch

From root: `yarn spa gql:watch`
From this package: `yarn gql:watch`

Like the above command, but runs it every time there are changes.

> Note, this will only run `yarn get-schema` once, so if you make changes to your Hasura backend you'll need to run `yarn get-schema` again to keep it up to date.

### gql:clear

From root: `yarn spa gql:clear`
From this package: `yarn gql:clear`

Clears out any generated files. This is useful for getting rid of files that are still present when you switch branches.

### hasura:<local|dev|beta|production>

From root: `yarn spa hasura:<local|dev|beta|production>`
From this package: `yarn hasura:<local|dev|beta|production>`

Loads the correct .env file (either `.env.local`, `.env.dev`, `.env.beta`, `.env.production`) and runs a hasura CLI command for you. For instance, to open the local console, run `yarn spa hasura:local console`.

> `yarn spa hasura` has been aliased to `yarn spa hasura:local`, so you can run `yarn spa hasura console` if you like.
