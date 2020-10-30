/**
 * Downloads an array of objects to the user as a CSV
 */
export const downloadAsCsv = (data: {}[], filename: string) => {
  let csvContent = 'data:text/csv;charset=utf-8,';

  const appendToContent = function(rowArray: string[]) {
    const row = rowArray.map((item) => JSON.stringify(item)).join(',');
    csvContent += row + '\r\n';
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

  const downloadLink = document.createElement('a');

  downloadLink.href = csvContent;
  downloadLink.download = filename;
  downloadLink.click();
};
