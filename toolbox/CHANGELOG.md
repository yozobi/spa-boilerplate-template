# toolbox

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
