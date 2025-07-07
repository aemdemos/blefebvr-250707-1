/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: must match the block name exactly
  const headerRow = ['Hero (hero29)'];

  // Find the grid-layout wrapper (contains the two main columns: content and image)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // The image is the first <img> child in the grid (background image)
  const img = grid.querySelector('img');
  // If not found, leave cell empty
  const imageRow = [img || ''];

  // The text/cta column is the first (non-img) div in the grid
  // Get all immediate children and find the div (not the img)
  let contentDiv = null;
  const gridChildren = Array.from(grid.children);
  for (const child of gridChildren) {
    if (child.tagName === 'DIV') {
      contentDiv = child;
      break;
    }
  }
  // If not found, leave cell empty
  let contentRow = [''];
  if (contentDiv) {
    // Collect ALL child elements (eyebrow, heading, paragraphs, cta)
    // Retain order and existing references
    const contentEls = Array.from(contentDiv.children);
    contentRow = [contentEls];
  }

  // Compose the block table
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
