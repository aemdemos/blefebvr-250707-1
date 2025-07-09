/* global WebImporter */

export default function parse(element, { document }) {
  // Always use the target block name as the table header
  const headerRow = ['Cards (cards8)'];

  // Select all direct card divs
  const cardDivs = Array.from(element.querySelectorAll(':scope > div.utility-aspect-1x1'));

  // If empty, do nothing
  if (!cardDivs.length) return;

  // Each card row: [image]
  const rows = cardDivs.map(div => {
    const img = div.querySelector('img');
    return [img || document.createTextNode('')];
  });

  // Build the table: header row + card rows
  const tableRows = [headerRow, ...rows];

  // Create the block table using the imported DOM utility
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original grid element with the table
  element.replaceWith(table);
}
