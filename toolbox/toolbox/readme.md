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

### test

From root: `yarn toolbox test`
From this package: `yarn test`

When enabled, runs all jest tests in the repo, including snapshot tests on the components defined in storybook. It's currently disabled as it's not much use while we're building the components.
