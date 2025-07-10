/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get all direct children of the grid (each is a column wrapper)
  const columnDivs = Array.from(grid.children);

  // For each column, find the inner .utility-aspect-2x3 and then the <img>
  const images = columnDivs.map(col => {
    const aspect = col.querySelector('.utility-aspect-2x3');
    if (aspect) {
      const img = aspect.querySelector('img');
      if (img) return img;
    }
    return null;
  });

  // Header row: exactly one cell, matching the example
  const headerRow = ['Columns (columns30)'];
  // Images row: one cell for each column/image
  const imagesRow = images;

  // Build the table cells array
  const cells = [
    headerRow,
    imagesRow
  ];

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
