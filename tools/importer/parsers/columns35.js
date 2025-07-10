/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two main columns in the grid
  const container = element.querySelector('.container');
  if (!container) return;

  const grid = container.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children (should be 2: text and images)
  const gridChildren = grid.querySelectorAll(':scope > div');
  if (gridChildren.length < 2) return;

  // First column: text content (heading, subheading, buttons)
  const leftCol = gridChildren[0];
  const leftContent = [];
  // Reference the heading if present
  const heading = leftCol.querySelector('h1, h2, h3, h4, h5, h6');
  if (heading) leftContent.push(heading);
  // Reference the subheading/paragraph if present
  const subheading = leftCol.querySelector('p');
  if (subheading) leftContent.push(subheading);
  // Reference the button group if present
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) leftContent.push(buttonGroup);

  // Second column: all images (as elements, not links)
  const rightCol = gridChildren[1];
  let images = [];
  // There may be a grid inside the right column containing the images
  const imagesGrid = rightCol.querySelector('.w-layout-grid');
  if (imagesGrid) {
    images = Array.from(imagesGrid.querySelectorAll('img'));
  } else {
    images = Array.from(rightCol.querySelectorAll('img'));
  }

  // Table header as in the example (exact match)
  const headerRow = ['Columns (columns35)'];
  // Table row: left cell is array of content, right cell is array of images
  const contentRow = [leftContent, images];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
