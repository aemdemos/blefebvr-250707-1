/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout that contains the columns
  const grid = element.querySelector('.grid-layout');
  let cellsRow = [];

  if (grid) {
    // Get all immediate children of the grid (should be 2: left content, right image)
    const columns = Array.from(grid.children);
    // Usually the left is content, the right is an image
    const leftCol = columns[0];
    const rightCol = columns[1];

    // For the left column, keep all its children as is, in a fragment
    const leftFrag = document.createDocumentFragment();
    Array.from(leftCol.childNodes).forEach(node => {
      leftFrag.appendChild(node);
    });

    // For the right column, if it's just an image, use it directly; otherwise, take all its content
    let rightContent = null;
    if (rightCol && rightCol.tagName === 'IMG') {
      rightContent = rightCol;
    } else if (rightCol) {
      const rightFrag = document.createDocumentFragment();
      Array.from(rightCol.childNodes).forEach(node => {
        rightFrag.appendChild(node);
      });
      rightContent = rightFrag;
    }

    cellsRow = [leftFrag, rightContent];
  }

  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns26)'],
    cellsRow
  ], document);

  element.replaceWith(table);
}
