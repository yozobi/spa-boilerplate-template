# toolbox

## 1.5.8

### Patch Changes

- 472006ea: Added CSS Modules type generation to spa-boilerplate, agent-relay and payewg
- 6f9b5ee3: - Adds a text component with styling
  - Adds a select component with styling

## 1.5.7

### Patch Changes

- e6978a91: Improved release script to make the root changelog more readable
- 0339ea8b: Updated quick-pr to allow for adding drafts, and made the changeset a separate field

## 1.5.6

### Patch Changes

- c09c9ae6: Allowed for adding a description to a pr
- 7d219c8c: Made quick-pr script use prompts and also write a changeset

## 1.5.5

### Patch Changes

- 7fab79fa: Added amplifyAuthExchange to payewg and jcap, to refresh the amplify token if expired.

## 1.5.4

### Patch Changes

- 4b0f380: Ensured all statuses in payewg used proper case
  Also made sure that the view payment page handled deleted payments

## 1.5.3

### Patch Changes

- c394950: Added useSortedTable and implemented it in JCAP view bank accounts

## 1.5.2

### Patch Changes

- fdec673: Added a VSCode task to add classNames to a file
- e3aeb07: Made the usePagination hook respond when it was on a page out of range
- 7c55db1: Implemented payewg account selector design 4C

## 1.5.1

### Patch Changes

- f929dfa: Implement Conversion wizard
- 6067cb9: Made the release script check if the ci checks have completed

## 1.5.0

### Minor Changes

- b5f8f12: Fix conversion formula in useFetchConversionRate formula (invert the base/target)

### Patch Changes

- 66cbab5: Added an inline edit form for the Upload Balances Page to update troublesome bank accounts
- f575c69: Added fields in JCAP database for fetching the maturity date on import. Improved errors in upload balances.

## 1.4.8

### Patch Changes

- 9b567a3: Implement new design for account switcher
- 544dca0: Add simple popover component to the toolbox
- 17852f1: Added ViewActualBalances page with editable interest rate field
- 0ebc1db: Added AdminViewBalances for JCAP so that admins can view the full list of actual balances and edit them

## 1.4.7

### Patch Changes

- 287e35a: Fixed nprogress showing up on login screen

## 1.4.6

### Patch Changes

- 1955954: Removed filterOption default on SelectBase, and added it to AsyncSearchSelect instead.
- 1e3fbea: Fixed local urql issue

  Added nprogress loading indicator when you switch users

## 1.4.5

### Patch Changes

- fa6d81a: Fixed peerDependencies on urql in payewg

## 1.4.4

### Patch Changes

- 3ef8376: Built create beneficiary form
- 5a81162: Removed labels from SelectBase
- 5d65aff: Added CRUD to currency books. Refactored several components into useful shorthands. Built a makeMutationForm for JCAP.

  Built an AsyncSearchSelect for the toolbox which takes an Urql query.

- 1609daf: Added labels to jcap select

  Added an extra type export from the toolbox

- 7f434a3: Added makeUseNavigate hook to toolbox, and added basic route maps for jcap, payewg.

  Made yarn generate work with the routeMap syntax.

- 5adbd62: Refactored async logic in AsyncSearchSelect into its own hook
- 9696f7f: Running yarn generate component or yarn generate hook will now allow you to create hooks and components within any workspace, not just the toolbox.

## 1.4.3

### Patch Changes

- d54449a: Toolbox: added useCopyToClipboard hook. This gives you a handy utility for copying work to the clipboard.

  Toolbox: added addComponentSeparator - this utility lets you add components as separators to a list of other comps. Handy for breadcrumbs.

  PayEWG: Completed the fund balance page.

- ed24c25: Completed UX styling for find balances page. Added more styling to the app.

## 1.4.2

### Patch Changes

- 4229b83: Fixed clickaway issue on payewg side menu. Added useOnClickOutside hook to the toolbox.
- 3a7db22: Changed SelectBase component to use React-Select

  Implemented new SelectBase in PayEWG, and added currency flag function to grab flag emojis.

## 1.4.1

### Patch Changes

- d68beb7: Added checkbox component to toolbox
- 38c1ffd: Made the stepper component able to take numbers as its values.
- 01ff90b: Added radio groups to toolbox, and implemented them in PayEWG
- 52352e9: Added icons to storybook

## 1.4.0

### Minor Changes

- 0d343b0: Added lots of quality of life improvements for payewg - nav bars, better loading states etc

### Patch Changes

- bbd93cb: Built an initial go at the fund balance page
- 97dc4ec: Added a stepper component to the toolbox.
- 8a72bf9: Added a SelectBase component for handling Select logic

## 1.3.5

### Patch Changes

- 7f34280: Test changeset!

## 1.3.4

### Patch Changes

- c477f29: Re built hasura schema (BREAKING CHANGES). Added currency cloud logic. Refactored the store to use useFsmReducer

## 1.3.3

### Patch Changes

- 54de51e: Added useConfirm hook to aid with confirmation logic

## 1.3.2

### Patch Changes

- dd02956: Add an edit form component to the sidebar so that the user can edit their 'name' attribute.

## 1.3.1

### Patch Changes

- 636dd42: Moved useFsmReducer into the repo and added simple examples

## 1.3.0

### Minor Changes

- 9fa1311: Softened form validation on declareMakeMutationForm - now will only error when the user has pressed submit.
- debece9: Updated UrqlWrapper to use a headers object instead of fetchOptions. Completed work on payewg schema.

## 1.2.0

### Minor Changes

- 9b9730f: Added isEmailAddress in toolbox for simple email validation
- 9b9730f: Added useAmplifyQuery, which radically simplifies accessing in-built Amplify API's
- b5358d5: Fixed a bug where a client name was displaying in the QR Code logic in the toolbox. Added the 'clientName' prop to make it configurable.
- 22deb18: Added a useSessionTimeout hook to the toolbox, and implemented it in payewg
- fe318a2: Added usePaginatedAmplifyQuery, a helper for pagination state.

### Patch Changes

- 9b9730f: Made useThrottle accept zero parameters
- b13f7db: Added an eslint config to the root of the project, to make enforcing and autofixing formatting easier.
- b1cce24: Improved error messaging in release script

## 1.1.0

### Minor Changes

- 45a1c0f: Added AwsAuthenticator to toolbox, and implemented it in PayEWG. This handles sign ups, attribute verification and forgotten passwords.
- 45a1c0f: Added a headless TOTPSetupWrapper to make TOTP setup easier

### Patch Changes

- 45a1c0f: Added changesets support, changelog and release script
