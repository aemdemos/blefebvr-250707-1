/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as specified in the example
  const headerRow = ['Carousel (carousel38)'];

  // Locate the inner grid containing the left (text) and right (images) columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  let leftCol = null;
  let rightCol = null;
  if (grid) {
    const cols = Array.from(grid.children);
    if (cols.length >= 2) {
      leftCol = cols[0];
      rightCol = cols[1];
    }
  }

  // Get all images from the right column (the carousel's slides)
  let images = [];
  if (rightCol) {
    // There may be a nested grid holding the images
    let imgGrid = rightCol.querySelector('.w-layout-grid');
    if (imgGrid) {
      images = Array.from(imgGrid.querySelectorAll('img'));
    } else {
      images = Array.from(rightCol.querySelectorAll('img'));
    }
  }

  // Get heading, paragraph, and button group from left column
  let heading = leftCol ? leftCol.querySelector('h1, h2, h3, h4, h5, h6') : null;
  let desc = leftCol ? leftCol.querySelector('p') : null;
  let buttonGroup = leftCol ? leftCol.querySelector('.button-group') : null;

  // For the first slide: include all text and buttons; for others: just image
  const rows = images.map((img, idx) => {
    if (idx === 0) {
      const cellContent = [];
      if (heading) cellContent.push(heading);
      if (desc) cellContent.push(desc);
      if (buttonGroup) cellContent.push(buttonGroup);
      return [img, cellContent];
    } else {
      return [img, ''];
    }
  });

  // Compose table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  element.replaceWith(table);
}
