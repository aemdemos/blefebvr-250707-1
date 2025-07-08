/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header: Must match the example block name exactly
  const headerRow = ['Hero (hero6)'];

  // 2. Find and use the background image (first <img> in the tree)
  let bgImg = element.querySelector('img');
  let bgRow = [''];
  if (bgImg) bgRow = [bgImg];

  // 3. For the content row, find the card div with all text/buttons
  // This preserves heading, subheading, and buttons as in the example
  let card = element.querySelector('.card');
  let contentRow = [''];
  if (card) {
    contentRow = [card];
  } else {
    // Fallback: find all h1, p, and button/link groups
    const contentParts = [];
    const h1 = element.querySelector('h1');
    if (h1) contentParts.push(h1);
    const p = element.querySelector('p');
    if (p) contentParts.push(p);
    const btnGroup = element.querySelector('.button-group');
    if (btnGroup) contentParts.push(btnGroup);
    if (contentParts.length > 0) {
      contentRow = [contentParts];
    }
  }

  // 4. Build table and replace original
  const cells = [ headerRow, bgRow, contentRow ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
