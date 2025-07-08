/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const grid = element.querySelector('.container .w-layout-grid');
  if (!grid) return;
  // Get all direct child elements of the grid as the columns
  const columns = Array.from(grid.children);
  // The header row must be a single cell (not one for each column)
  const cells = [
    ['Columns (columns11)'], // single-cell header row
    columns                  // one cell for each column in a single row
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
