/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct children divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // For each column, get the first <img> if present, else the div itself
  const cellsContent = columns.map((col) => {
    const img = col.querySelector('img');
    return img || col;
  });

  // For the header row, to match the number of columns,
  // fill the array with header in first cell and empty strings for the rest
  const headerRow = ['Columns (columns28)'];
  while (headerRow.length < cellsContent.length) {
    headerRow.push('');
  }

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    cellsContent
  ], document);
  element.replaceWith(table);
}
