/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout which contains the columns
  const grid = element.querySelector(':scope > .grid-layout');
  if (!grid) {
    return;
  }
  const columnEls = Array.from(grid.children);
  if (!columnEls.length) return;
  // Create the table with WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns14)'],
    columnEls
  ], document);
  // Fix: Set correct colspan on the header <th> to span all columns
  const headerRow = table.querySelector('tr:first-child');
  if (headerRow && headerRow.children.length === 1) {
    headerRow.children[0].setAttribute('colspan', columnEls.length);
  }
  element.replaceWith(table);
}
