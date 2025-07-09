/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing hero image + content
  const grid = element.querySelector('.grid-layout, .w-layout-grid');

  // Find the image element (first <img> direct child of the grid)
  let imageEl = null;
  if (grid) {
    imageEl = Array.from(grid.children).find(child => child.tagName === 'IMG');
  }

  // Find the text/content area (first direct child div that is not the image)
  let contentDiv = null;
  if (grid) {
    contentDiv = Array.from(grid.children).find(child => child.tagName !== 'IMG');
  }

  // Table header: Must match the target block name exactly
  const headerRow = ['Hero (hero1)'];
  // Row 2: main image element (reference, do not clone)
  const imageRow = [imageEl || ''];
  // Row 3: main content (reference, do not clone)
  const contentRow = [contentDiv || ''];

  // Create table using the source elements (no hardcoded content, no markdown)
  const rows = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the input root with the generated block table
  element.replaceWith(table);
}
