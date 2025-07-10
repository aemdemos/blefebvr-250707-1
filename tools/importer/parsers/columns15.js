/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main container and the grid layout
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.w-layout-grid');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // Left column: collect all non-empty nodes for full content
  const leftCol = gridChildren[0];
  const leftContent = [];
  leftCol.childNodes.forEach((node) => {
    if (node.nodeType === 1) {
      leftContent.push(node);
    } else if (node.nodeType === 3 && node.textContent.trim()) {
      const span = document.createElement('span');
      span.textContent = node.textContent.trim();
      leftContent.push(span);
    }
  });

  // Right column: use first meaningful element (usually an image)
  const rightCol = gridChildren[1];
  let rightContent = null;
  if (rightCol.tagName === 'IMG') {
    rightContent = rightCol;
  } else {
    const rcImg = rightCol.querySelector('img');
    if (rcImg) {
      rightContent = rcImg;
    } else {
      const rContent = [];
      rightCol.childNodes.forEach((node) => {
        if (node.nodeType === 1) {
          rContent.push(node);
        } else if (node.nodeType === 3 && node.textContent.trim()) {
          const span = document.createElement('span');
          span.textContent = node.textContent.trim();
          rContent.push(span);
        }
      });
      rightContent = rContent.length === 1 ? rContent[0] : rContent;
    }
  }

  // Fix: Header row must have exactly one column, as in the example
  const cells = [
    ['Columns (columns15)'],
    [leftContent, rightContent]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // The createTable function will handle the single header cell, regardless of content columns
  element.replaceWith(table);
}
