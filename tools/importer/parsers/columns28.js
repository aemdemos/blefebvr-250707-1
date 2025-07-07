/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout inside the section
  const container = element.querySelector(':scope > .container');
  if (!container) return;
  const grid = container.querySelector(':scope > .w-layout-grid.grid-layout');
  if (!grid) return;
  // The grid contains: [heading, quote, innerGrid]
  const children = Array.from(grid.children);
  if (children.length < 3) return;
  const heading = children[0]; // p.h2-heading
  const quote = children[1];   // p.paragraph-lg
  const testimonialGrid = children[2]; // inner w-layout-grid
  // testimonialGrid has: [divider, flex-horizontal (avatar row), utility-display-inline-block (logo svg)]
  const testimonialChildren = Array.from(testimonialGrid.children);
  // flex-horizontal contains avatar and author info
  const flexHorizontal = testimonialGrid.querySelector('.flex-horizontal');
  // utility-display-inline-block contains the SVG logo
  const svgLogo = testimonialGrid.querySelector('.utility-display-inline-block');
  // Compose the left column: heading, avatar/author
  const leftCol = document.createElement('div');
  if (heading) leftCol.appendChild(heading);
  if (flexHorizontal) leftCol.appendChild(flexHorizontal);
  // Compose the right column: quote, company logo
  const rightCol = document.createElement('div');
  if (quote) rightCol.appendChild(quote);
  if (svgLogo) rightCol.appendChild(svgLogo);
  // Compose the block table
  const headerRow = ['Columns (columns28)'];
  const contentRow = [leftCol, rightCol];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);
  element.replaceWith(table);
}
