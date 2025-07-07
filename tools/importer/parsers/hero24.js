/* global WebImporter */
export default function parse(element, { document }) {
  // Find the active tab pane (or fallback to first if not found)
  let pane = element.querySelector(':scope > .w-tab-pane.w--tab-active');
  if (!pane) {
    pane = element.querySelector(':scope > .w-tab-pane');
  }
  if (!pane) return;

  // Find the first .w-layout-grid in the pane
  const grid = pane.querySelector('.w-layout-grid');
  if (!grid) return;

  // Gather all children of the grid (order matters)
  const children = Array.from(grid.children);
  // Find the first image (background image)
  const img = children.find(el => el.tagName && el.tagName.toLowerCase() === 'img');
  // All other elements (headings, paragraphs, buttons, etc) in order
  const textElements = children.filter(el => !(el.tagName && el.tagName.toLowerCase() === 'img'));

  // Ensure all text elements (not just h3) are included in the text cell, as an array if multiple
  const rows = [];
  rows.push(['Hero (hero24)']); // Header row, must match example exactly
  rows.push([img ? img : '']); // Background image row
  rows.push([textElements.length > 0 ? textElements : '']); // All text content from grid

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
