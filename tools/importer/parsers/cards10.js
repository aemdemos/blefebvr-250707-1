/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all immediate card links
  const cards = Array.from(element.querySelectorAll(':scope > a.card-link'));

  // Header row: must match block name
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  cards.forEach(card => {
    // Left: image container (not just the image, the aspect box)
    const imageContainer = card.querySelector(':scope > .utility-aspect-3x2');
    // Right: content box with tag, heading, and description
    const contentBox = card.querySelector(':scope > .utility-padding-all-1rem');

    // Only include if both present
    if (imageContainer && contentBox) {
      rows.push([imageContainer, contentBox]);
    }
  });

  // Replace the element with the HTML table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
