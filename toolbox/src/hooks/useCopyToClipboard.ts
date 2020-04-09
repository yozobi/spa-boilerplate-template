interface UseCopyToClipboardParams {
  onSuccess?: (name: string) => void;
  onError?: (name: string) => void;
}

export const useCopyToClipboard = ({
  onError,
  onSuccess,
}: UseCopyToClipboardParams) => {
  const copyToClipboard = (content: string) => {
    if (process.env.NODE_ENV === 'test') {
      onSuccess?.(content);
    } else {
      navigator.permissions
        .query({ name: 'clipboard-write' } as any)
        .then((result: any) => {
          if (
            String(result.state) === 'granted' ||
            String(result.state) === 'prompt'
          ) {
            navigator.clipboard.writeText(content).then(
              function() {
                onSuccess?.(content);
              },
              function() {
                onError?.(content);
              },
            );
          }
        });
    }
  };
  return copyToClipboard;
};
