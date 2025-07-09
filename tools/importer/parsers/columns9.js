/* global WebImporter */
export default function parse(element, { document }) {
  // Only operate on the correct grid block
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid as columns
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Use the required header row format
  const headerRow = ['Columns (columns9)'];

  // Each cell should be a REFERENCE to the actual column element
  const columnsRow = columns.map(col => col);

  // Table rows: header, then one row of columns
  const tableRows = [headerRow, columnsRow];

  // Use built-in helper to create the table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original block with the table block
  element.replaceWith(table);
}
