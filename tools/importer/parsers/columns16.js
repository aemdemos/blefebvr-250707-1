/* global WebImporter */
export default function parse(element, { document }) {
  // Get the top-level grids
  const container = element.querySelector('.container');
  if (!container) return;
  const grids = container.querySelectorAll('.grid-layout');
  if (grids.length < 1) return;

  // First main grid: two columns (headline/eyebrow & intro/author/cta)
  const topGrid = grids[0];
  const topGridCols = topGrid.querySelectorAll(':scope > div');
  const leftCol = topGridCols[0]; // Headline and eyebrow
  const rightCol = topGridCols[1]; // Paragraph, author, button

  // The image grid (2 columns, 1 row)
  const bottomGrid = element.querySelector('.mobile-portrait-1-column.grid-gap-md');
  let imgCol1 = null, imgCol2 = null;
  if (bottomGrid) {
    const imgs = bottomGrid.querySelectorAll('.utility-aspect-1x1');
    imgCol1 = imgs[0];
    imgCol2 = imgs[1];
  }

  // Compose content rows as arrays matching number of columns
  const contentRow1 = [leftCol, rightCol];
  const contentRow2 = [
    imgCol1 ? imgCol1.querySelector('img') : '',
    imgCol2 ? imgCol2.querySelector('img') : '',
  ];

  // Header row: exactly one column (not two)
  const headerRow = ['Columns (columns16)'];

  // Compose table data: header row, then body rows
  const cells = [headerRow, contentRow1, contentRow2];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
