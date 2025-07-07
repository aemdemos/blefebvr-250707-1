/* global WebImporter */
export default function parse(element, { document }) {
  // Create header row as specified
  const headerRow = ['Hero (hero30)'];
  // Find the grid container
  const grid = element.querySelector('.w-layout-grid');

  // Prepare background image row
  let imageRow = [''];
  // Prepare content (title, subtitle, CTA) row
  let contentRow = [''];

  if (grid) {
    // The first cell (background image)
    const firstCol = grid.children[0];
    if (firstCol) {
      // Find the first <img> in the background area
      const bgImg = firstCol.querySelector('img');
      if (bgImg) {
        imageRow = [bgImg];
      }
    }
    // The second cell (content)
    const secondCol = grid.children[1];
    if (secondCol) {
      // Only include meaningful content: look for heading and CTA
      // We'll use the whole secondCol to preserve all structure
      contentRow = [secondCol];
    }
  }

  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
