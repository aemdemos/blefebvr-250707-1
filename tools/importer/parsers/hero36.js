/* global WebImporter */
export default function parse(element, { document }) {
  // Header row exactly as required
  const headerRow = ['Hero (hero36)'];

  // Background image row (empty, as there is no image in this HTML)
  const bgRow = [''];

  // Prepare content cell for title, subheading, CTA
  let contentCell = [];

  // Find grid-layout (main content wrapper)
  const grid = element.querySelector('.grid-layout');
  if (grid) {
    // First div: likely holds h2 and subheading
    const firstCol = grid.querySelector('div');
    if (firstCol) {
      const h2 = firstCol.querySelector('h2');
      if (h2) contentCell.push(h2);
      const subheading = firstCol.querySelector('p, .subheading');
      if (subheading) contentCell.push(subheading);
    }
    // Button/CTA (second child, could be outside firstCol)
    // Find any direct children that are a link or button
    const cta = Array.from(grid.children).find((child) => child.tagName === 'A' || child.tagName === 'BUTTON');
    if (cta) contentCell.push(cta);
  }

  if (contentCell.length === 0) contentCell = [''];
  const contentRow = [contentCell];

  // Assemble the table as per requirements
  const cells = [headerRow, bgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}
