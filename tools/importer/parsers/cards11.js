/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the target block name as the header row (single column)
  const headerRow = ['Cards (cards11)'];
  const rows = [];

  // For each card, get the image (should be in .utility-aspect-1x1)
  const cardDivs = element.querySelectorAll(':scope > .utility-aspect-1x1');
  cardDivs.forEach(cardDiv => {
    const img = cardDiv.querySelector('img');
    if (img) {
      rows.push([img]); // SINGLE cell per row (no empty cell)
    }
  });

  // Compose table rows (all rows are single-cell except header)
  const tableRows = [headerRow, ...rows];
  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element
  element.replaceWith(table);
}
