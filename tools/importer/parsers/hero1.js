/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get the grid layout
  const grid = element.querySelector('.grid-layout, .w-layout-grid');
  let image = null;
  let contentDiv = null;

  if (grid) {
    const gridChildren = Array.from(grid.children);
    // Find first img (image), and first non-img (content)
    for (const child of gridChildren) {
      if (!image && child.tagName === 'IMG') {
        image = child;
      } else if (!contentDiv && child.tagName !== 'IMG') {
        contentDiv = child;
      }
    }
  }

  // Defensive: fallback if grid not found
  if (!image) {
    image = element.querySelector('img');
  }
  if (!contentDiv) {
    // Try to find first div that looks like content
    const candidates = Array.from(element.querySelectorAll('div'));
    contentDiv = candidates.find(div => div.querySelector('h1, h2, .h2-heading, [class*="heading"], .eyebrow'));
  }

  // Build rows
  const headerRow = ['Hero (hero1)'];
  const imageRow = [image ? image : ''];
  const contentRow = [contentDiv ? contentDiv : ''];

  const rows = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
