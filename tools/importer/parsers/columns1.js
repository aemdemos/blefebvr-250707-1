/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container that holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct child nodes of the grid (these are columns)
  const columns = Array.from(grid.children);
  const numCols = columns.length;

  // Header row: header text in the first cell, others empty for correct column consistency
  const headerRow = Array(numCols).fill('');
  headerRow[0] = 'Columns (columns1)';

  // Content row: reference each column element
  const contentRow = columns;

  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}
