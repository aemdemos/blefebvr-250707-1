/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs that represent columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Second row: one cell per column
  const contentRow = columns.map(col => col);

  // Table: header row (single cell), then columns row
  const tableRows = [
    ['Columns (columns39)'], // exactly one cell in header
    contentRow               // one cell per column in the second row
  ];

  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
