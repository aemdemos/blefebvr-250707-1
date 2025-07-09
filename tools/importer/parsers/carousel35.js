/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two main columns (text and image grid)
  let textCol, imageCol;
  const mainGrid = element.querySelector('.grid-layout.tablet-1-column');
  if (mainGrid) {
    const cols = mainGrid.querySelectorAll(':scope > div');
    if (cols.length === 2) {
      textCol = cols[0];
      imageCol = cols[1];
    }
  }

  // Defensive fallback if not found
  if (!textCol || !imageCol) {
    const innerCols = element.querySelectorAll(':scope > div > div > div');
    if (innerCols.length === 2) {
      textCol = innerCols[0];
      imageCol = innerCols[1];
    }
  }

  // Collect images from the image grid column
  let imageGrid = null;
  if (imageCol) {
    imageGrid = imageCol.querySelector('.w-layout-grid');
  }
  const imageEls = imageGrid ? Array.from(imageGrid.querySelectorAll('img')) : Array.from(element.querySelectorAll('img'));

  // Compose the first text cell from heading, subheading, and button group
  let firstTextCell = [];
  if (textCol) {
    const heading = textCol.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) firstTextCell.push(heading);
    const subheading = textCol.querySelector('.subheading, p');
    // Only push subheading if it's not the same as the heading
    if (subheading && (!heading || heading !== subheading)) firstTextCell.push(subheading);
    const buttonGroup = textCol.querySelector('.button-group');
    if (buttonGroup) firstTextCell.push(buttonGroup);
  }

  // Build the table
  const rows = [];
  rows.push(['Carousel (carousel35)']); // Header row: exact block name

  imageEls.forEach((img, idx) => {
    let textCell = '';
    // Only the first slide gets the text content
    if (idx === 0 && firstTextCell.length > 0) {
      textCell = firstTextCell;
    }
    rows.push([img, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
