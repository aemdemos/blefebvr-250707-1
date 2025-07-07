/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row for the Cards block
  const headerRow = ['Cards (cards27)'];
  const rows = [headerRow];

  // Each direct child div is a card
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach(card => {
    // Extract the image: the first img inside this card
    const img = card.querySelector('img');
    // Extract the text content (may be inside .utility-padding-all-2rem or may be absent)
    let textCell = null;
    const textWrap = card.querySelector('.utility-padding-all-2rem');
    if (textWrap) {
      // Use the entire text wrapper div (contains heading and paragraph)
      textCell = textWrap;
    } else {
      // If absent, fall back to an empty div (for image-only cards)
      textCell = document.createElement('div');
    }
    rows.push([img, textCell]);
  });

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
