/* global WebImporter */
export default function parse(element, { document }) {
  // Block name header - must match example exactly
  const headerRow = ['Cards (cards34)'];

  // Extract all immediate card divs from the grid
  const cardDivs = element.querySelectorAll(':scope > div');

  // Build rows for each card: image in cell 1, empty cell 2 (no text provided)
  const rows = Array.from(cardDivs).map(cardDiv => {
    // Reference the original image element
    const img = cardDiv.querySelector('img');
    return [img, ''];
  });

  // Compose the final table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
