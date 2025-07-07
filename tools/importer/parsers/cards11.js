/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards11) block table header
  const headerRow = ['Cards (cards11)'];
  const rows = [headerRow];
  // Each card is an <a> direct child of the container
  const cards = element.querySelectorAll(':scope > a.card-link');
  cards.forEach(card => {
    // Image: first .utility-aspect-3x2 img inside card
    let imageEl = null;
    const imageDiv = card.querySelector('.utility-aspect-3x2');
    if (imageDiv) {
      imageEl = imageDiv.querySelector('img');
    }
    // Text content: .utility-padding-all-1rem inside card
    const textDiv = card.querySelector('.utility-padding-all-1rem');
    const cellEls = [];
    if (textDiv) {
      // Tag (optional)
      const tag = textDiv.querySelector('.tag');
      if (tag) {
        // Place tag in a div for visual separation
        const tagDiv = document.createElement('div');
        while (tag.firstChild) tagDiv.appendChild(tag.firstChild);
        cellEls.push(tagDiv);
      }
      // Title (h3 or .h4-heading)
      const heading = textDiv.querySelector('h3, .h4-heading');
      if (heading) {
        cellEls.push(heading);
      }
      // Description (p)
      const desc = textDiv.querySelector('p');
      if (desc) {
        cellEls.push(desc);
      }
    }
    // Always maintain two columns: image, text content
    // Reference elements directly from the doc (do not clone)
    rows.push([
      imageEl,
      cellEls.length === 1 ? cellEls[0] : cellEls
    ]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
