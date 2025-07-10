/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;

  // Get all columns (direct children of the grid)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // The header row must be a single cell array, so only one column in the header
  const headerRow = ['Columns (columns9)'];
  // The second row is one cell for each column
  const secondRow = columns;

  // The table structure matches:
  // [ [header], [col1, col2, ... colN] ]
  const table = WebImporter.DOMUtils.createTable([headerRow, secondRow], document);

  // The resulting table's first row will have one <th> cell,
  // and the implementation of createTable() will automatically set colspan to match the number of columns if the header row has only one cell.
  // This matches the markdown and structural requirements.

  // Replace the original element with the new table
  element.replaceWith(table);
}
