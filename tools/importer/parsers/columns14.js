/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .grid-layout inside the input element
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Collect all column content into a single cell for the data row
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Create a wrapper div to hold all columns' content
  const wrapper = document.createElement('div');
  columns.forEach(col => {
    wrapper.appendChild(col);
  });

  // Header must have exactly one column
  const headerRow = ['Columns (columns14)'];
  // Data row: one cell with all columns' content
  const contentRow = [wrapper];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace element with the new block table
  element.replaceWith(table);
}
