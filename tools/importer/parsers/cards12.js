/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row as per the block definition
  const headerRow = ['Cards (cards12)'];
  const rows = [headerRow];

  // 2. Each card is a direct child of the grid layout
  const cards = Array.from(element.children);
  cards.forEach((card) => {
    // The image is always present (mandatory), pick the first <img>
    const img = card.querySelector('img');
    // For text, look for .utility-padding-all-2rem (if present), else fallback to card
    let textParent = card.querySelector('.utility-padding-all-2rem') || null;
    let textElements = [];
    if (textParent) {
      // Text section
      const heading = textParent.querySelector('h1,h2,h3,h4,h5,h6');
      if (heading) textElements.push(heading);
      const para = textParent.querySelector('p');
      if (para) textElements.push(para);
    }
    // Some cards (images only, no text)
    // If no .utility-padding-all-2rem, check for h3/h2/para directly under the card
    if (!textParent) {
      const heading = card.querySelector('h1,h2,h3,h4,h5,h6');
      if (heading) textElements.push(heading);
      const para = card.querySelector('p');
      if (para) textElements.push(para);
    }
    // Compose the row as [image, text-content]. If image missing, skip this card (per block spec)
    if (img) {
      // If there are no text elements, use an empty string
      rows.push([
        img,
        textElements.length > 0 ? textElements : ''
      ]);
    }
  });
  // 3. Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
