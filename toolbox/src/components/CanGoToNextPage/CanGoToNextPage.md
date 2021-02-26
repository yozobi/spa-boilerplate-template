# CanGoToNextPage

## Usage

```tsx
type LoginParams = { username: string; password: string };

const LoginForm = makeMutationForm<LoginParams>({
  config: {
    username: {
      type: 'text',
    },
    password: {
      type: 'password',
    },
  },
});

const Example = () => {
  return (
    <LoginForm.Wrapper>
      {/** Form stuff in here... */}
      <CanGoToNextPage<LoginParams> required={['username']}>
        {(canGo) => (
          <Button
            onClick={() => {
              if (canGo) {
                goToTheNextPage();
              }
            }}
          >
            Next Step
          </Button>
        )}
      </CanGoToNextPage>
    </LoginForm.Wrapper>
  );
};
```
