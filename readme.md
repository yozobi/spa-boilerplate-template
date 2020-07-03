# Yozobi Shared Repo

## Installation

Run `npm run setup` or `yarn setup` (yarn is preferred) in the root repo. The script will:

- Ensure you have the correct global dependencies installed
- Bootstrap the repo for you with yarn workspaces

## More Info

[Go here for our full docs](./internals/docs/index.md)

## Repositories

### Toolbox

The toolbox is a repo for sharing code between repositories. We can put anything in here and import it into other projects. Anything exported from `exports.ts` will be available in any client project with `import { ComponentName } from 'toolbox';`.

This will be invaluable for building up a library of reusable components, unifying approaches to data fetching, and building a handy library of hooks.

Run `yarn toolbox start`, and you'll see the components inside laid out in a storybook.

Run `yarn generate component`, to bootstrap a new component in the toolbox.

> [Read the full Toolbox docs here](./toolbox/readme.md)

### Generating Graphql code

We use `graphql-codegen` to automatically generate code to talk to our API. Here's how you use it:

1. Run `yarn spa start`.
2. Write some queries under `src/graphql/queries/<QueryName>.graphql`
3. The queries will get auto-built into Urql hooks, in the same folder as the query.
