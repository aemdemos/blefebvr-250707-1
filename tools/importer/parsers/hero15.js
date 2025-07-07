/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row matches the example
  const headerRow = ['Hero (hero15)'];

  // Find the main grid layout container
  const grid = element.querySelector('.grid-layout');
  let imgEl = null;
  let contentDiv = null;

  if (grid) {
    // The image is always the first child (img), the content is the other child (div)
    const gridChildren = Array.from(grid.children);
    imgEl = gridChildren.find((child) => child.tagName === 'IMG') || null;
    contentDiv = gridChildren.find((child) => child.tagName === 'DIV') || null;
  }

  // If no image or text content found, handle gracefully with empty cells
  const rows = [
    headerRow,
    [imgEl || ''],
    [contentDiv || '']
  ];

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
