/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid layout which serves as the columns container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Extract the immediate columns (children divs of the grid)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return; // Defensive: need at least two for 'columns3'

  // Reference the actual DOM nodes that are the individual columns
  const firstCol = columns[0];
  const secondCol = columns[1];

  // Build the table structure as described
  const cells = [
    ['Columns (columns3)'],
    [firstCol, secondCol],
  ];

  // Create and insert the block table, referencing existing DOM nodes
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
