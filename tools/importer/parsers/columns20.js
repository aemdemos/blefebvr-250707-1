/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container that holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get the immediate children (should be: text block, contacts list, image)
  const gridChildren = Array.from(grid.querySelectorAll(':scope > *'));
  // Prepare variables for each column
  let textDiv = null;
  let contactsUl = null;
  let img = null;
  gridChildren.forEach(child => {
    if (child.tagName === 'DIV') {
      textDiv = child;
    } else if (child.tagName === 'UL') {
      contactsUl = child;
    } else if (child.tagName === 'IMG') {
      img = child;
    }
  });
  // Left column: text block + contacts list
  const leftColumn = [];
  if (textDiv) leftColumn.push(textDiv);
  if (contactsUl) leftColumn.push(contactsUl);
  // Right column: image
  const rightColumn = img ? [img] : [];
  // Prepare the cells for the block table (header row must be a single cell)
  const cells = [
    ['Columns (columns20)'],
    [leftColumn, rightColumn]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the new table
  element.replaceWith(table);
}
