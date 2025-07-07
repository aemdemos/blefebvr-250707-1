/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns container (should be a grid-layout or similar direct child)
  let grid = element.querySelector('.grid-layout, .grid, [class*="column"], [class*="columns"]');
  if (!grid) grid = element;

  // Get all immediate column children (the columns)
  const columns = Array.from(grid.children);

  // Header row: only one cell, as in the example
  const headerRow = ['Columns (columns8)'];

  // Content row: one cell for each column
  const columnsRow = columns.map(col => col);

  // Compose the table
  const cells = [
    headerRow,
    columnsRow
  ];

  // Create the table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Ensure the header cell spans all columns (for visual parity with example)
  const th = block.querySelector('th');
  if (th && columns.length > 1) {
    th.setAttribute('colspan', columns.length);
  }

  // Replace the original element with the new block table
  element.replaceWith(block);
}
