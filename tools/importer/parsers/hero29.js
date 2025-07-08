/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header must match exactly
  const headerRow = ['Hero (hero29)'];

  // 2. Find the grid container for layout (should have background image and content)
  const grid = element.querySelector('.w-layout-grid');

  // Defensive checks for presence
  if (!grid) {
    // No grid present; cannot build block as expected, do nothing
    return;
  }

  // 3. Get the image (background visual)
  let imageEl = null;
  let contentEl = null;
  // The grid layout has two children: one text, one image
  const gridChildren = Array.from(grid.children);
  for (const child of gridChildren) {
    if (child.tagName === 'IMG') {
      imageEl = child;
    } else if (!contentEl) {
      contentEl = child;
    }
  }

  // 4. Second row: the background image, or empty string if missing
  const imageRow = [imageEl || ''];

  // 5. Third row: all text/cta content as single cell
  // We want to keep heading, subhead, paragraph, cta button, etc, together
  let contentRowContent;
  if (contentEl) {
    // Reference all children in order, so all text and CTA is included
    contentRowContent = Array.from(contentEl.children);
  } else {
    // Fallback: empty if not present
    contentRowContent = '';
  }
  const contentRow = [contentRowContent];

  // 6. Compose cells as instructed: 1 column, 3 rows
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];

  // 7. Create the block table and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
