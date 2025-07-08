/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children divs
  const getDirectDivs = (parent) => Array.from(parent.children).filter(el => el.tagName === 'DIV');

  const headerRow = ['Columns (columns16)'];

  // Find main container and grid layouts
  const container = element.querySelector('.container');
  if (!container) return;

  // The top area (text + heading, right column details)
  const topGrid = container.querySelector('.w-layout-grid.grid-layout.tablet-1-column.grid-gap-lg');
  if (!topGrid) return;
  const topGridDivs = getDirectDivs(topGrid);
  if (topGridDivs.length !== 2) return;
  const leftCol = topGridDivs[0];
  const rightCol = topGridDivs[1];

  // Compose leftCol cell: Eyebrow + Heading (if present, keep order)
  const leftColContent = [];
  const eyebrow = leftCol.querySelector('.eyebrow');
  if (eyebrow) leftColContent.push(eyebrow);
  const heading = leftCol.querySelector('h1, h2, h3, h4, h5, h6');
  if (heading) leftColContent.push(heading);

  // Compose rightCol cell: rich text, author/date info, button (if present, keep order)
  const rightColContent = [];
  const paragraph = rightCol.querySelector('.rich-text');
  if (paragraph) rightColContent.push(paragraph);

  const metaGrid = rightCol.querySelector('.w-layout-grid.grid-layout');
  if (metaGrid) {
    // Author row: contains avatar, author name, date, reading time
    const authorRow = metaGrid.querySelector('.flex-horizontal.y-center.flex-gap-xs');
    if (authorRow) rightColContent.push(authorRow);
    // Button row
    const button = metaGrid.querySelector('a.button');
    if (button) rightColContent.push(button);
  }

  // Bottom images grid
  const bottomGrid = container.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column.grid-gap-md');
  if (!bottomGrid) return;
  // Each image is in a .utility-aspect-1x1
  const imageDivs = Array.from(bottomGrid.querySelectorAll('.utility-aspect-1x1'));
  // Defensive: only take first two
  const img1 = imageDivs[0] ? imageDivs[0].querySelector('img') : null;
  const img2 = imageDivs[1] ? imageDivs[1].querySelector('img') : null;

  // Compose table rows
  const cells = [
    headerRow,
    [leftColContent, rightColContent],
    [img1, img2]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
