/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns grid
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  
  // All columns are immediate children of the grid
  const columns = Array.from(grid.children);
  
  // Header row must be a single cell (column), matching the example
  const header = ['Columns (columns25)'];
  
  // Second row: each cell is a column's content (reference the element directly)
  const secondRow = columns;
  
  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    header,
    secondRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
