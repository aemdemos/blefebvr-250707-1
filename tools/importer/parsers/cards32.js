/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to build the right card content cell (returns array of DOM nodes)
  function buildTextCell(cardRoot) {
    const grid = cardRoot.querySelector('.w-layout-grid');
    if (!grid) return [];
    // Find the direct child DIV after the image (text column)
    const children = Array.from(grid.children);
    let textCol = null;
    for (const child of children) {
      if (child.tagName === 'DIV') {
        textCol = child;
        break;
      }
    }
    if (!textCol) return [];
    // Tag+read time row
    const tagRow = textCol.querySelector('div.flex-horizontal');
    // Heading
    const h3 = textCol.querySelector('h3');
    // Paragraph (description)
    const p = textCol.querySelector('p');
    // CTA - the last direct DIV child (that is not tagRow), or if none, nothing
    const divs = Array.from(textCol.querySelectorAll(':scope > div'));
    let cta = null;
    if (divs.length > 0) {
      // Exclude tagRow
      const candidates = divs.filter(d => d !== tagRow);
      if (candidates.length > 0) {
        cta = candidates[candidates.length-1];
      }
    }
    // Compose content: tagRow, h3, p, cta (in order, if present)
    // Always preserve order from the DOM
    const result = [];
    if (tagRow) result.push(tagRow);
    if (h3) result.push(h3);
    if (p) result.push(p);
    if (cta) result.push(cta);
    return result;
  }

  // Get all direct child <a> (cards)
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  const rows = [];
  rows.push(['Cards (cards32)']); // Header row must match block name exactly

  cards.forEach(card => {
    const grid = card.querySelector('.w-layout-grid');
    if (!grid) return; // Defensive, skip if format is wrong
    // Find the image (first <img> in grid)
    const img = grid.querySelector('img');
    if (!img) return; // Defensive: skip if card has no image
    // Use the actual <img> DOM element (do NOT clone, per requirements)
    // Build the text content cell (array of nodes)
    const textCellNodes = buildTextCell(card);
    // For proper HTML import, wrap text nodes in a <div>
    let textCell = null;
    if (textCellNodes.length > 0) {
      textCell = document.createElement('div');
      textCellNodes.forEach(n => textCell.appendChild(n));
    }
    rows.push([img, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
