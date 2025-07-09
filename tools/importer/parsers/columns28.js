/* global WebImporter */
export default function parse(element, { document }) {
  // Only proceed if this is the grid-layout block
  if (!element || !element.classList.contains('grid-layout')) return;

  // Get all .utility-aspect-1x1 divs (columns)
  const columnDivs = Array.from(element.querySelectorAll(':scope > .utility-aspect-1x1'));
  if (columnDivs.length === 0) return;

  // The header row must be a single column
  const headerRow = ['Columns (columns28)'];

  // The content row must be a single column (all images together in one cell)
  const images = columnDivs.map(div => div.querySelector('img')).filter(Boolean);
  const contentRow = [images];

  const tableRows = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
