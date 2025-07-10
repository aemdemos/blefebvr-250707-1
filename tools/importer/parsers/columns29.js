/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid within this section
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get direct children of the grid (should be 4: name, tags, heading, richtext)
  const columns = Array.from(grid.children);

  // Defensive: ensure sufficient columns
  if (columns.length < 4) return;

  // 2 columns: left (name+tags), right (heading+richtext)
  const leftCell = document.createElement('div');
  leftCell.appendChild(columns[0]); // name
  leftCell.appendChild(columns[1]); // tags

  const rightCell = document.createElement('div');
  rightCell.appendChild(columns[2]); // heading
  rightCell.appendChild(columns[3]); // richtext

  // Build the cells array as per Columns (columns29) block
  const cells = [
    ['Columns (columns29)'],
    [leftCell, rightCell]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
