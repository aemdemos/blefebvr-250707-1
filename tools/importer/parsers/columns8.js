/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container which holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (intended to be columns)
  const columns = Array.from(grid.children);

  // Compose a cell for each column, ensuring all content is included
  // For divs, include all of their child nodes (including text nodes and elements)
  // For images and other elements, include the element itself
  const columnsRow = columns.map(col => {
    // If it's an Element with children, collect all non-empty nodes
    if (col.children.length > 0 || col.childNodes.length > 1) {
      // Gather all non-empty nodes (text or element)
      return Array.from(col.childNodes).filter(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          return node.textContent.trim().length > 0;
        }
        return true;
      });
    } else {
      // Single image or leaf node
      return col;
    }
  });

  // The header row must match exactly
  const headerRow = ['Columns (columns8)'];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element in the DOM
  element.replaceWith(table);
}
