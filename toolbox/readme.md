# Toolbox

## Scripts

### start

From root: `yarn toolbox start`
From this package: `yarn start`

Runs the storybook on the repo on localhost:6006

### build

From root: `yarn toolbox build`
From this package: `yarn build`

Builds a production-ready version of the storybook for hosting on Netlify.

### lint

From root: `yarn toolbox lint`
From this package: `yarn lint`

Runs typescript type-checking

### playroom:start

From root: `yarn toolbox playroom:start`
From this package: `yarn playroom:start`

Starts playroom on localhost:9000. This allows you to build prototypes quickly using the components you've defined in the Storybook.

### play

From root: `yarn toolbox play`
From this package: `yarn play`

An alias for the `yarn playroom:start`

### playroom:build

From root: `yarn toolbox playroom:build`
From this package: `yarn playroom:build`

Builds a production-ready version of playroom, ready for hosting on Netlify.

### test

From root: `yarn toolbox test`
From this package: `yarn test`

When enabled, runs all jest tests in the repo, including snapshot tests on the components defined in storybook. It's currently disabled as it's not much use while we're building the components.
