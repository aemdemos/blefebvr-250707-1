/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: reference immediate children of a grid
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter(el => el.matches(selector));
  }

  // 1. Main content extraction
  const container = element.querySelector('.container');
  if (!container) return;

  // First main grid: headline/desc/author/button
  const mainGrid = container.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  // Second grid: two images
  const imagesGrid = container.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');

  // Fallback: if structure isn't as expected, exit
  if (!mainGrid || !imagesGrid) return;

  // MainGrid: find left and right columns (headline etc, content)
  const mainGridDivs = getDirectChildren(mainGrid, 'div');
  if (mainGridDivs.length !== 2) return;

  const leftCol = mainGridDivs[0];
  const rightCol = mainGridDivs[1];

  // Left content: headline (eyebrow + h1)
  // Compose a fragment to hold all left-side content
  const leftColFrag = document.createDocumentFragment();
  Array.from(leftCol.childNodes).forEach(node => leftColFrag.appendChild(node));

  // Right content: description, author, button
  // The rightCol contains a .rich-text (desc), a .w-layout-grid (author + button)
  // We'll create a fragment to keep all relevant content, in order
  const rightColFrag = document.createDocumentFragment();
  const rightColRichText = rightCol.querySelector('.rich-text');
  if (rightColRichText) rightColFrag.appendChild(rightColRichText);
  const rightColGrid = rightCol.querySelector('.w-layout-grid.grid-layout');
  if (rightColGrid) {
    // Keep all its children (author row and button)
    Array.from(rightColGrid.children).forEach(child => rightColFrag.appendChild(child));
  }

  // Group left and right fragments for the left cell
  const leftCellContent = document.createElement('div');
  leftCellContent.appendChild(leftColFrag);
  leftCellContent.appendChild(rightColFrag);

  // 2. Images extraction
  const imageDivs = getDirectChildren(imagesGrid, 'div.utility-aspect-1x1');
  // Defensive: ensure we have at least two images
  let img1 = null, img2 = null;
  if (imageDivs.length >= 2) {
    img1 = imageDivs[0].querySelector('img');
    img2 = imageDivs[1].querySelector('img');
  }

  // 3. Build the block table
  const headerRow = ['Columns (columns41)'];
  const secondRow = [leftCellContent, img1];
  const thirdRow = [img2, ''];
  const cells = [headerRow, secondRow, thirdRow];

  // 4. Replace the original element with the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
