/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards5) block header, exactly as in the example
  const headerRow = ['Cards (cards5)'];

  // Get all cards (each immediate child div is a card container)
  const cardDivs = element.querySelectorAll(':scope > div');

  const rows = Array.from(cardDivs).map((cardDiv) => {
    // Find image in the card
    const img = cardDiv.querySelector('img');

    // Try to find text content associated with this card
    // Look for any elements that are NOT the image
    // (In this HTML, there is only the image, but this is future-proof for possible variants)
    // We'll collect all child nodes except the <img>
    const textNodes = Array.from(cardDiv.childNodes).filter(n => {
      // Remove text nodes that are just whitespace
      if (n === img) return false;
      if (n.nodeType === Node.TEXT_NODE && !n.textContent.trim()) return false;
      return n !== img;
    });

    // If there is any non-image content, use it as the text cell. Otherwise, empty string.
    let textCell = '';
    if (textNodes.length > 0) {
      textCell = textNodes;
    }

    return [img, textCell];
  });

  // Compose the table: header row, then all cards
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
