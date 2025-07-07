/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified
  const headerRow = ['Cards (cards21)'];
  // Select all immediate child divs that represent cards
  const cardDivs = element.querySelectorAll(':scope > div');
  const rows = [headerRow];
  cardDivs.forEach(card => {
    // Icon SVG: .icon > svg
    let iconElem = null;
    const iconContainer = card.querySelector(':scope > div > .icon');
    if (iconContainer && iconContainer.firstElementChild) {
      iconElem = iconContainer.firstElementChild;
    }
    // Text content: p (direct child with specific class)
    const textElem = card.querySelector('p.utility-margin-bottom-0');
    // Fallback for robustness: if no icon or text, use empty placeholders
    rows.push([
      iconElem || document.createElement('span'),
      textElem || document.createElement('span')
    ]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
