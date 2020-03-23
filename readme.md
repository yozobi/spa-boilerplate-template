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

### codegen

`yarn codegen`

Runs the `codegen` command in all the workspaces. Useful for autogenerating all types within a workspace.

### test:ci

`yarn test:ci`

Runs `yarn test` in each repo. This should usually only be run in a CI.

### generate

`yarn generate`

Opens a dialog to bootstrap a component or route in the repo. Too much description here is unnecessary - try it out and feel the power!

### pretty-staged

`yarn pretty-staged`

Runs prettier on the files you've staged for commit. This is currently set up to run every commit, with husky git hooks.

### version-minor / version-patch

`yarn version-minor` / `yarn version-patch`

Creates a new git tag and pushes it to the remote repo. This is used when you need to create a new tag to deploy to.

### quick-pr

`yarn quick-pr "A message describing what the PR does"`

Runs a script to PR your current changes to the branch you're currently on. Handy for when you want to split up lots of small changes into several PR's.

> You need **hub** installed on your machine before you run this command.

### draft-pr

`yarn draft-pr "A message describing what the PR does"`

Same as `quick-pr`, but this makes the PR a draft. Handy for when you're starting off a piece of work.

### changeset

`yarn changeset`

Add a new changeset using the changesets CLI.

### release

`yarn release "release message"`

Create a new GitHub release from the master branch. This increments the version number of the repository, creates changelogs from the stored changesets, and creates a GitHub release.

# Amplify 📢

The AWS Amplify toolchain (SDK and CLI) brings together various other AWS services for building mobile & web apps in a single API. Out of the box, it will give you Authentication, Serverless Functions, REST/GraphQL APIs, Offline Sync, NoSQL DB, File Storage, Logging, Analytics, Notifications, Bots, AR/VR, and more.

## Glossary 👀

- Profile - this is a set of credentials, used by Amplify CLI to programmatically access an AWS account. Credentials are usually stored locally on dev machines inside ~/.aws, they should never be checked in to a git repo.
- Environment - this is a bunch of related infrastructure in AWS, usually named like git branches (e.g. prod, beta, staging, feature-test1)
- CloudFormation Template - these template files are how the Amplify CLI actually manipulates the services within AWS
- Cognito - the authentication service we use
- S3 - the storage service we use for blobs of data (files), but also used to store our frontend bundle after it is built
- CloudFront - a global CDN that serves up our bundle from S3
- Amplify Console - continuous deployment tool that builds/tests both the frontend and backend for us by watching a git repo. It deploys to S3 and invalidates any CloudFront caches where required.

## Background Reading 📕

- [AWS Command Line Interface Profiles](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html)
- [Setting up your dev workstation with the Amplify CLI](https://www.youtube.com/watch?v=fWbM5DLh25U)
- [Key Amplify Concepts](https://aws-amplify.github.io/docs/cli-toolchain/quickstart#concepts-1)
- [Environments and Teams](https://aws-amplify.github.io/docs/cli-toolchain/quickstart#environments-and-teams)

## Project structure 📁

- _amplify_ the entire definition of our backend AWS environment, committed to git, right alongside our frontend code 🎉
- _amplify/#current-cloud-backend_ a reflection of what is already deployed
- _amplify/backend_ work in progress, not applied/deployed until we run `amplify push`
- _team-provider-info.json_ a list describing the different backend environments (but no credentials!)
- _amplify/.config_ mostly config that is local to your dev machine, with the exception of 'project-config.json'

### TLDR 🥱

1. [Install the generic AWS CLI tools](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
2. Install the Amplify CLI tools - `yarn global add @aws-amplify/cli` or `npm i -g @aws-amplify/cli`
3. Set up an AWS account, add an IAM user with programmatic access, and make a note of the _access key_ & _secret_.
4. Set up a credential profile `aws configure --profile projectname-amplify-profile`, you can give the profile whatever alias you like as its local to your dev machine. It will ask for the _access key_ & _secret_ above.
5. Run `amplify init` after you checkout to choose an existing environment, or add a new one. It will ask if you want to use an existing profile (yes!).
6. Add or reconfigure features using the amplify CLI, or edit existing functions from within the amplify/backend folder in the repo. Test functions locally. When you are ready to apply changes to the AWS backend, run `amplify status` (optional), and then `amplify push --yes`.

#### Switching git branches

If you change from _dev_ to _feature-new-login-page_ it is likely that you will be testing against the same AWS backend environment ('dev').

However, if you switch branches from _dev_ to _master_ your amplify CLI will still be pointing to the last backend (dev), so you need to do this:
`amplify env checkout prod` (where _prod_ is the environment name).

You can see a list of environments in amplify/team-provider-info.json, or by running `amplify env list`. New ones can be added with `amplify env add`.

Even if you haven't switched branches, you should routinely run `amplify env pull` to overwrite the local reflection of the deployed AWS environment (stored in amplify/#current-cloud-backend). We do this just in case someone else has made changes (and given that this folder should be in .gitignore). If things ever get screwed up `amplify init` is usually the best recourse.
