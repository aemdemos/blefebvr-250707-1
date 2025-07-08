/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row, as specified in the instructions
  const headerRow = ['Cards (cards36)'];
  // Get all immediate card divs
  const cardDivs = element.querySelectorAll(':scope > div');
  // Each card currently contains only an image, so text cell is empty
  const rows = Array.from(cardDivs).map(div => {
    // Find the first direct descendant img within this div
    const img = div.querySelector('img');
    // Reference the existing image directly; leave text cell empty
    return [img, ''];
  });
  // Build the cells array for the block table
  const cells = [headerRow, ...rows];
  // Create the table block and replace the original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
