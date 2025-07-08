/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout div which contains the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of grid (each column is a direct child)
  const columns = Array.from(grid.children);
  const numCols = columns.length;

  // Header row: first cell is header text, the rest are empty to match the number of columns
  const headerRow = ['Columns (columns32)'];
  for (let i = 1; i < numCols; i++) {
    headerRow.push('');
  }

  // Content row: one cell for each column's content
  const contentRow = columns.map(col => col);

  // Build the table cells structure
  const cells = [headerRow, contentRow];
  
  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
