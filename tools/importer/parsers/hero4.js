/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: Block name exactly as in the example
  const headerRow = ['Hero (hero4)'];
  // Background image row: empty, as there is no image in the HTML
  const backgroundImageRow = [''];

  // Content row: gather the heading, subheading, CTA from within the two grid columns
  const grid = element.querySelector('.w-layout-grid');
  let contentItems = [];
  if (grid) {
    // The grid children are the headline column and the content column
    const gridChildren = Array.from(grid.children);
    // Find the first h2 in grid (the main heading)
    const h2 = grid.querySelector('h2');
    if (h2) {
      contentItems.push(h2);
    }
    // Find the div with paragraph-lg and CTA
    const contentDiv = gridChildren.find((child) => child.querySelector('p, a'));
    if (contentDiv) {
      // Add all direct children that are elements (e.g., p, a)
      const nodes = Array.from(contentDiv.children).filter((el) => el.nodeType === 1);
      if(nodes.length) {
        contentItems = contentItems.concat(nodes);
      }
    }
  }
  // If no content found, add an empty string for edge case
  if (contentItems.length === 0) {
    contentItems = [''];
  }
  // Build the table cells
  const cells = [headerRow, backgroundImageRow, [contentItems]];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
