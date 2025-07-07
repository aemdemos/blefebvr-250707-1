/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Hero (hero12)'];

  // Find the top-level grid layout containing the hero content and image
  const mainGrid = element.querySelector('.grid-layout.tablet-1-column');
  if (!mainGrid) return;
  // Get all immediate children (these should include content and image)
  const children = Array.from(mainGrid.children);
  
  // Find the image element (usually background or main hero image)
  let img = null;
  for (const child of children) {
    if (child.tagName === 'IMG') {
      img = child;
      break;
    }
  }

  // Find the hero content block (contains heading, text, buttons)
  let contentBlock = null;
  for (const child of children) {
    // Looks for something with a heading (h1, h2, etc)
    if (child.querySelector && (child.querySelector('h1, h2, h3, h4, h5, h6'))) {
      contentBlock = child;
      break;
    }
  }
  // Fallback: If not found, take the first non-image child
  if (!contentBlock) {
    contentBlock = children.find((el) => el !== img);
  }
  // To handle edge case: if nothing found, provide empty string for semantic safety
  const imageCell = img ? img : '';
  const contentCell = contentBlock ? contentBlock : '';

  // Compose block rows
  const rows = [
    headerRow,
    [imageCell],
    [contentCell]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}
