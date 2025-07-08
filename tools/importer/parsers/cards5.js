/* global WebImporter */
export default function parse(element, { document }) {
  // Compose table rows
  const headerRow = ['Cards (cards5)'];
  const rows = [];

  // Find all direct card anchors
  const cards = element.querySelectorAll(':scope > a.card-link');
  cards.forEach(card => {
    // Image (first column)
    let imgEl = null;
    const imgDiv = card.querySelector('.utility-aspect-3x2');
    if (imgDiv) {
      imgEl = imgDiv.querySelector('img');
    }
    // Compose text (second column)
    // Use existing elements in correct order
    const textDiv = card.querySelector('.utility-padding-all-1rem');
    const textParts = [];
    if (textDiv) {
      // Tag (if present)
      const tag = textDiv.querySelector('.tag-group .tag');
      if (tag) textParts.push(tag);
      // Heading (if present)
      const heading = textDiv.querySelector('h3, .h4-heading');
      if (heading) textParts.push(heading);
      // Paragraph/desc (if present)
      const desc = textDiv.querySelector('p');
      if (desc) textParts.push(desc);
    }
    // row: [imageElement, [tag, heading, desc] (elements)]
    rows.push([
      imgEl || '',
      textParts.length > 1 ? textParts : (textParts[0] || '')
    ]);
  });

  // Create table
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
