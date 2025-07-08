/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Hero (hero3)'];

  // Second row: Background image, none in this HTML
  const imageRow = [''];

  // Third row: Content (heading, subheading, buttons)
  // Find the grid layout
  const grid = element.querySelector('.grid-layout');

  let contentCellElements = [];
  if (grid) {
    const children = grid.querySelectorAll(':scope > div');
    // Text content column
    if (children[0]) {
      // Push only non-empty nodes
      Array.from(children[0].childNodes).forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0)) {
          contentCellElements.push(node);
        }
      });
    }
    // Button group column
    if (children[1]) {
      Array.from(children[1].childNodes).forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0)) {
          contentCellElements.push(node);
        }
      });
    }
  }

  const contentRow = [contentCellElements.length ? contentCellElements : ['']];

  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
