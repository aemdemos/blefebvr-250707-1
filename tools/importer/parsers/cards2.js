/* global WebImporter */
export default function parse(element, { document }) {
  // Block header matches exactly
  const headerRow = ['Cards (cards2)'];
  // Each card: two columns: [image, text content]
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  const rows = cards.map(card => {
    // First column: image (existing element from DOM)
    let img = null;
    const imgHolder = card.querySelector('div.utility-aspect-2x3');
    if (imgHolder) {
      img = imgHolder.querySelector('img');
    }
    // Second column: text content
    // We'll use a fragment to combine all relevant text elements, referencing them directly
    const content = [];
    // meta row: tags/date (optional)
    const metaDiv = card.querySelector('.flex-horizontal');
    if (metaDiv) content.push(metaDiv);
    // Title (h3)
    const heading = card.querySelector('h3');
    if (heading) content.push(heading);
    return [img, content];
  });

  const tableRows = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
