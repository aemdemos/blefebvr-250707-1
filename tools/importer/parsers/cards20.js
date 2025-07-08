/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct card containers within the grid
  const cardDivs = element.querySelectorAll(':scope > div');

  // Header row as specified in example
  const headerRow = ['Cards (cards20)'];
  const rows = [headerRow];

  cardDivs.forEach(card => {
    // Icon cell: the .icon svg container (first div > .icon)
    let iconCell = '';
    const iconWrapper = card.querySelector(':scope > div > .icon');
    if (iconWrapper) iconCell = iconWrapper;

    // Text cell: the paragraph (p) inside the card
    let textCell = '';
    const textPara = card.querySelector('p');
    if (textPara) textCell = textPara;

    rows.push([iconCell, textCell]);
  });

  // Create and replace with the cards block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
