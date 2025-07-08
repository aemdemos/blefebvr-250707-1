/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Header row: single cell, per requirements
  const headerRow = ['Columns (columns40)'];
  // Content row: one cell per column
  const contentRow = columns;

  // Construct block table per specification
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace original element with table
  element.replaceWith(table);
}
