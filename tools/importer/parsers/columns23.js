/* global WebImporter */
export default function parse(element, { document }) {
  // Find the left column: the first .w-layout-grid.grid-layout inside .container
  const container = element.querySelector('.container');
  let leftCol = null;
  if (container) {
    leftCol = container.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  }

  // Find the right column: .w-layout-grid.grid-layout.mobile-portrait-1-column
  let rightCol = element.querySelector('.grid-layout.mobile-portrait-1-column');

  // If for some reason rightCol is missing, fallback to the second grid-layout in the section
  if (!rightCol) {
    const allGrids = element.querySelectorAll('.w-layout-grid.grid-layout');
    if (allGrids.length > 1) {
      rightCol = allGrids[1];
    }
  }

  // Defensive: ensure both are at least empty divs if not found
  const leftNode = leftCol || document.createElement('div');
  const rightNode = rightCol || document.createElement('div');

  // Block name header row
  const headerRow = ['Columns (columns23)'];

  // Table body row: left, right
  const contentRow = [leftNode, rightNode];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original section with the new table block
  element.replaceWith(table);
}
