# Yozobi Shared Repo

## Installation

Run `npm run setup` or `yarn setup` (yarn is preferred) in the root repo. The script will:

- Ensure you have the correct global dependencies installed
- Bootstrap the repo for you with yarn workspaces

## Repositories

### Toolbox

The toolbox is a repo for sharing code between repositories. We can put anything in here and import it into other projects. Anything exported from `exports.ts` will be available in any client project with `import { ComponentName } from 'toolbox';`.

This will be invaluable for building up a library of reusable components, unifying approaches to data fetching, and building a handy library of hooks.

Run `yarn toolbox start`, and you'll see the components inside laid out in a storybook.

Run `yarn generate component`, to bootstrap a new component in the toolbox.

> [Read the full Toolbox docs here](./toolbox/readme.md)

### SPA Boilerplate

Starting new projects can be daunting. Webpack configs, frameworks, all sorts of decisions to make. The SPA boilerplate is a clean boilerplate for bootstrapping an SPA, complete with Urql, Hasura, Tailwind CSS and Typescript.

1. Run `cp spa-boilerplate/.example.env spa-boilerplate/.env.local` to get your environment variables.
2. Kick off a Hasura backend on `localhost:6060` with `yarn spa hasura:up`.
3. Run `cp spa-boilerplate/hasura/config.example.yaml spa-boilerplate/hasura/config.yaml` to set up using hasura from the CLI
4. Run `yarn spa start` to start the hasura console, the react app, and kick off some helpful dev tasks.

> [Read the SPA boilerplate docs here](./spa-boilerplate/readme.md)

### Generating Graphql code

We use `graphql-codegen` to automatically generate code to talk to our API. Here's how you use it:

1. Run `yarn spa start`.
2. Write some queries under `src/graphql/queries/<QueryName>.graphql`
3. The queries will get auto-built into Urql hooks, in the same folder as the query.

## Tools

### Storybook

An invaluable tool for unit testing, component creation, and catching regressions.

> [View the storybook here](https://yozobi-storybook.netlify.com/)

### Playroom

Design your UI with JSX, and save as a shareable URL. It even bundles up your component library. I envision us using it as a design process - design new pages in Playroom, share and discuss on Slack, and then just lift that code into a new view.

> [Try the playroom here](https://yozobi-playroom.netlify.com/)

> [An example of what you can do with playroom](https://yozobi-playroom.netlify.com/#?code=N4Igxg9gJgpiBcIA8UCWA3ABGANgQwGcCA5PAWxgF4AdEAIwHMBaBgJzwE8mBGABl8xlUAOyYALJgTCsYMYbQB81YZkwoM2fEVIUa9ZnRwBXGEwDs-RctWqkAMRwwAHtZurchEuSq0A7kwAzIxwcTAAHViYAFlpXNwArIwIAF1QAjgBhCGFkuWS9AjC8MFM6GGTfWXkQOJs8HFQGYQBJXLICPRKcmFZYlRslfrd1LA9tbz0w6PCnJgA2TEYmQxMmAFZLEEG3YbEAJk1PHR8QXKdkpl8xVFzMZPYwAGsRZlSGMVzWTADsi7oIHBQRQAQTCYSQAHp9tsdpC0OgYcM6EZkslsodxrpaEYwT0wIQYHdnBcnAQiecmLl6jx+HcHs9hMxfKhYF8wrMAMzhLjcRYQVispgHVgQIzCWBQPkCnrLYymOa0n5gJLwUXJBrCUzCbKEpUqpYrUwADk2iJ2AFk5EZarYIcjUdkzZCHM4YXCMG6yHgRBivFiQFMFl7Zv4ok5QmRZngURArEM1PDfcc9EsrjdCYHMAQxHgoBB-GRJSKxRKs2R4MHLkxSYIozG4zs1C6nN9HE4ACKoGRgVLZToAoxkaqCDiUYBzAC+Zt2vLGfpOZwuOAY31+khgQn+gPJfzlTBNAkXTC6n0w-iCIQbjZsABkICvmvJ48ModxpzYRkmJn5AsEcFfrzUAAVYlHzCFFMHQeoTD0WhMHwMocD0ABRL1UH-LZIRA84wJRd9bXhQYbQ-RM52TH8Lww-CP2w5JcOSSDoJOOCEJgJDaAABU8Xx+SBTCIVo+jqPdBFiNsAAhFE0WEcSCQUO8H2ESFJIdGS5LEtQ8EwMQZACPQAGI4LI78QHPP8d2rMkj0NeZaSPE8egA687H5BgIFRORMA4UU2W43iAH4NMhPB32dNsnQhQjXEhNDhDdH53J6L9-TMkJwh4A4ljYThbIEMgLjmJykDCZKF2JSzMBxMI8QJOligZJkWSSo9sq4KI7PKhzei2YisjCDhWEaD5MAATQgAAvCA6FQTA9l4ObakhMI3QhBLPkGETBhACcgA)

### Plop

Generate component boilerplate easily. Run `yarn generate` to scaffold a new component in the Toolbox, or a new route within a client.

## Scripts

### setup

`yarn setup`

Sets up the repo, ensures you have docker installed, and installs necessary dependencies.

### spa

`yarn spa`

Allows you to run a script inside the `spa-boilerplate` package. For instance, `yarn spa start` is the same as `yarn start` inside the spa-boilerplate folder.

### toolbox

`yarn toolbox`

The same as above, but for the `toolbox` package.

### tb

`yarn tb`

An alias for `yarn toolbox`

### lint

`yarn lint`

Runs the `lint` command in all the workspaces. Useful for CI, or for checking if you're safe to push.

### gql

`yarn gql`

Runs the `gql` command in all the workspaces. Useful for autogenerating all types within a workspace.

### test:ci

`yarn test:ci`

Runs `yarn test` in each repo. This should usually only be run in a CI.

### generate

`yarn generate`

Opens a dialog to bootstrap a component or route in the repo. Too much description here is unnecessary - try it out and feel the power!

### pretty-staged

`yarn pretty-staged`

Runs prettier on the files you've staged for commit. This is currently set up to run every commit, with husky git hooks.
