/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  // Get all immediate children of the grid (these are columns)
  const gridColumns = Array.from(grid.children);
  if (gridColumns.length < 2) return;

  // Reference the *existing* elements for the left and right column cells
  // Do NOT clone or create new content; reference the element blocks directly
  const leftCell = gridColumns[0];
  const rightCell = gridColumns[1];

  // Compose the block table: header row (exact text), then content row
  const cells = [
    ['Columns (columns42)'],
    [leftCell, rightCell]
  ];

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the new table
  element.replaceWith(table);
}
