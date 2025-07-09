/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  
  // Find the text container and the image
  let textDiv = null;
  let imageEl = null;
  for (const child of Array.from(grid.children)) {
    if (!textDiv && child.querySelector('h1, h2, h3, h4, h5, h6')) {
      textDiv = child;
    }
    if (!imageEl && child.tagName === 'IMG') {
      imageEl = child;
    }
  }
  
  // Compose table rows according to requirements
  const headerRow = ['Hero (hero27)'];
  const imageRow = [imageEl ? imageEl : ''];
  const textRow = [textDiv ? textDiv : ''];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    textRow
  ], document);

  // Replace the section element with the block table
  element.replaceWith(table);
}
