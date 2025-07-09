/* global WebImporter */

export default function parse(element, { document }) {
  // Helper to extract the image and text content for each card
  function extractCardContent(cardDiv) {
    // Find the first image in the card
    const img = cardDiv.querySelector('img');
    // Find the text content (h3 and p)
    let textBlock = cardDiv.querySelector('.utility-padding-all-2rem');
    
    // Fallback if no .utility-padding-all-2rem
    if (!textBlock) {
      const h3 = cardDiv.querySelector('h3');
      const p = cardDiv.querySelector('p');
      if (h3 || p) {
        textBlock = document.createElement('div');
        if (h3) textBlock.appendChild(h3);
        if (p) textBlock.appendChild(p);
      }
    }
    return [img, textBlock];
  }

  // Only consider divs which contain an image as a card container
  const cards = Array.from(element.querySelectorAll(':scope > div')).filter(div => div.querySelector('img'));

  // Build table rows: header, then one per card
  const rows = [['Cards (cards24)']];
  cards.forEach((cardDiv) => {
    const [img, textBlock] = extractCardContent(cardDiv);
    // Only accept rows with both image and text
    if (img && textBlock && (textBlock.textContent.trim() || textBlock.querySelector('h3'))) {
      rows.push([img, textBlock]);
    }
  });

  // Create and replace with the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
