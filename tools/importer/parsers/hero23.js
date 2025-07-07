/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row with exact block name
  const headerRow = ['Hero (hero23)'];

  // 2. Background image(s) collage extraction (as a single cell with all <img> elements)
  let imagesCell = '';
  const scaleDiv = element.querySelector('.ix-hero-scale-3x-to-1x');
  if (scaleDiv) {
    const imageGrid = scaleDiv.querySelector('.grid-layout.desktop-3-column');
    if (imageGrid) {
      // Collect all images in order
      const imgs = Array.from(imageGrid.querySelectorAll('img'));
      if (imgs.length > 0) {
        // Reference the existing img elements from the DOM
        imagesCell = imgs;
      }
    }
  }
  // If no images found, leave cell blank

  // 3. Content (headline, subheading, CTAs)
  let contentCell = '';
  // Find the main content container in the hero
  const contentDiv = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  if (contentDiv) {
    contentCell = contentDiv;
  }

  // Compose the cells for the block table
  const cells = [
    headerRow,
    [imagesCell],
    [contentCell],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
