/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the montage of images for background
  const grids = element.querySelectorAll('.grid-layout');
  let imagesGrid = null;
  for (const grid of grids) {
    if (grid.querySelectorAll('img').length >= 6) {
      imagesGrid = grid;
      break;
    }
  }

  // Collect the image elements (reference, don't clone)
  let backgroundCell = '';
  if (imagesGrid) {
    // Wrap all images in a container div to preserve montage intent
    const div = document.createElement('div');
    div.style.display = 'grid';
    div.style.gridTemplateColumns = 'repeat(3,1fr)';
    div.style.gap = '0';
    imagesGrid.querySelectorAll('img').forEach(img => div.appendChild(img));
    backgroundCell = div;
  }

  // Find the text content container (heading, subheading, CTAs)
  const contentContainer = element.querySelector('.container.small-container');
  let contentCell = '';
  if (contentContainer) {
    // Collect heading, subheading, ctas (as references)
    const contentParts = [];
    const heading = contentContainer.querySelector('h1');
    if (heading) contentParts.push(heading);
    const subheading = contentContainer.querySelector('p');
    if (subheading) contentParts.push(subheading);
    const buttonGroup = contentContainer.querySelector('.button-group');
    if (buttonGroup) {
      // Add each button link
      buttonGroup.querySelectorAll('a').forEach(a => contentParts.push(a));
    }
    if (contentParts.length > 0) {
      contentCell = contentParts;
    }
  }

  const cells = [
    ['Hero (hero10)'],
    [backgroundCell],
    [contentCell],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
