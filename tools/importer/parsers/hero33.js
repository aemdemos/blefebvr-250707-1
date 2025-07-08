/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout with image and content
  const grid = element.querySelector('.grid-layout');
  let imgEl = null;
  let contentEl = null;

  if (grid) {
    const children = Array.from(grid.children);
    imgEl = children.find(child => child.tagName === 'IMG');
    // The content container: the non-IMG child
    contentEl = children.find(child => child !== imgEl);
  }

  // Table header row: must match the example exactly
  const headerRow = ['Hero (hero33)'];

  // Row 2: image (may be empty if missing)
  const imageRow = [imgEl || ''];

  // Row 3: content block (headings, eyebrow, tags, byline, etc)
  // If no content container found, use empty string
  const contentRow = [contentEl || ''];

  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}
