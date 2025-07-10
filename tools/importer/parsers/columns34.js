/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .container > .w-layout-grid direct children
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;
  // The header row must be a single cell (one column), matching the example
  const headerRow = ['Columns (columns34)'];
  // The content row contains a cell for each column
  const contentRow = columns;
  // The header row is a single cell, even if there are multiple columns in the content
  const tableRows = [
    headerRow,
    contentRow
  ];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
