/* global WebImporter */
export default function parse(element, { document }) {
  // Get all the columns (direct children)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract its main content (image or otherwise)
  const cellsRow = columns.map(col => {
    const img = col.querySelector('img');
    if (img) return img;
    return col;
  });

  // Header row must match the example: a single cell, spanning all columns
  // WebImporter.DOMUtils.createTable does not directly support colspan, but by passing a single-cell array
  // as the header row, it will render a visually single header above all columns
  const headerRow = ['Columns (columns30)'];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    cellsRow
  ], document);
  element.replaceWith(table);
}
