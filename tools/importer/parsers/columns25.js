/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Find the main content grid
  const container = element.querySelector(':scope > .container');
  if (!container) return;
  const outerGrid = container.querySelector('.grid-layout');
  if (!outerGrid) return;
  const outerGridChildren = Array.from(outerGrid.children);

  // Find the heading and quote (first 2 <p> elements)
  const heading = outerGridChildren.find(el => el.matches('p.h2-heading'));
  const quote = outerGridChildren.find(el => el.matches('p.paragraph-lg'));
  // Find the bottom row grid (author row)
  const bottomRow = outerGridChildren.find(el => el.matches('div.grid-layout'));

  // Find the author info and logo (in bottomRow, but skip the divider)
  let authorBlock = null;
  let logoBlock = null;
  if (bottomRow) {
    const bChildren = Array.from(bottomRow.children).filter(c => !c.classList.contains('divider'));
    if (bChildren[0]) authorBlock = bChildren[0];
    if (bChildren[1]) logoBlock = bChildren[1];
  }

  // Compose the columns for the block table
  // Example: 2 columns: left = heading + author, right = quote + logo
  // But per review, the desired structure is:
  // row1: header (1 cell)
  // row2: heading (col1), quote (col2)
  // row3: author (col1), logo (col2)

  const cells = [
    ['Columns (columns25)'],
    [heading, quote],
    [authorBlock, logoBlock]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
