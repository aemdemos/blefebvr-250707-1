/* global WebImporter */
export default function parse(element, { document }) {
  // Find grid layout inside section
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get all immediate children of the grid
  const gridChildren = Array.from(grid.children);

  // Left column: should be the div (text/eyebrow/heading/desc), then the ul (contact methods)
  let leftColDiv = null;
  let leftColUl = null;
  let rightColImg = null;
  for (const child of gridChildren) {
    if (child.tagName === 'DIV' && !leftColDiv) {
      leftColDiv = child;
    } else if (child.tagName === 'UL' && !leftColUl) {
      leftColUl = child;
    } else if (child.tagName === 'IMG' && !rightColImg) {
      rightColImg = child;
    }
  }
  // Defensive: If any column is missing, set to an empty array
  const leftCell = [];
  if (leftColDiv) leftCell.push(leftColDiv);
  if (leftColUl) leftCell.push(leftColUl);
  const rightCell = [];
  if (rightColImg) rightCell.push(rightColImg);

  const headerRow = ['Columns (columns17)'];
  const cells = [headerRow, [leftCell, rightCell]];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
