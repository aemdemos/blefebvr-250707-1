/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct children (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // Grab main content per column (prefer img, else use the div itself)
  const cells = columns.map(col => {
    const img = col.querySelector('img');
    return img ? img : col;
  });
  // Construct the table: header should be a single cell array, then a row with the columns
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns31)'],
    cells
  ], document);
  element.replaceWith(table);
}
