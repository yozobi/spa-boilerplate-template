// https://stackoverflow.com/questions/21825157/internet-explorer-11-detection
export const isIE11 = () => {
  // @ts-ignore
  return Boolean(window.MSInputMethodContext) && Boolean(document.documentMode);
};
