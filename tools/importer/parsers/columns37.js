/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (columns)
  const columns = element.querySelectorAll(':scope > div');

  // Header row: exactly one column as per specification
  const headerRow = ['Columns (columns37)'];

  // Content row: one cell for each column div
  const contentRow = Array.from(columns);

  // Table data: header row (single cell), then content row (one cell per column)
  const tableData = [headerRow, contentRow];

  // Create table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}