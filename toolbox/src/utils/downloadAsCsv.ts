/**
 * Downloads an array of objects to the user as a CSV
 */
export const downloadAsCsv = (data: {}[], filename: string) => {
  let csvContent = 'data:text/csv;charset=utf-8,';
  let csvContentEdge = '';

  const appendToContent = function (rowArray: string[]) {
    const row = rowArray.map((item) => JSON.stringify(item)).join(',');
    csvContent += encodeURI(row + '\r\n');
    csvContentEdge += row + '\\n';
  };

  appendToContent(Object.keys(data?.[0] || {}));

  data.forEach((item) => {
    appendToContent(
      Object.values<string>(item || {}).map((value) => {
        if (typeof value === 'string') {
          return value.replace(/<br \/>/g, ' ');
        }
        return value;
      }),
    );
  });

  let blob = new Blob([csvContentEdge], { type: 'text/csv;charset=utf-8' });

  if (window.navigator.userAgent.indexOf('Trident/') > -1) {
    window.navigator.msSaveBlob(blob, filename);
  } else {
    const downloadLink = document.createElement('a');

    downloadLink.href = csvContent;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink); // Required for FF
    downloadLink.click();
  }
};
