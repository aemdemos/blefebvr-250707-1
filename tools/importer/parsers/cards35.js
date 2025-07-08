/* global WebImporter */
export default function parse(element, { document }) {
  // Block header
  const headerRow = ['Cards (cards35)'];

  // Each direct child div is a card container
  const cardDivs = element.querySelectorAll(':scope > div');

  // For each card, extract the image (mandatory).
  // There is no text content in the provided HTML.
  const cardRows = Array.from(cardDivs).map(cardDiv => {
    const img = cardDiv.querySelector('img');
    // Defensive: if no image, put empty string
    return [img || '', '']; // 2 columns: [Image, Text]
  });

  const cells = [headerRow, ...cardRows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
