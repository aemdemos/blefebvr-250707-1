/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified
  const headerRow = ['Carousel (carousel37)'];

  // Find the grid containing the images (the carousel slides)
  const allGrids = element.querySelectorAll('.w-layout-grid');
  let imagesGrid = null;
  allGrids.forEach(grid => {
    if (grid.querySelector('img')) {
      imagesGrid = grid;
    }
  });
  if (!imagesGrid) return;

  // Get all slide images
  const imgs = Array.from(imagesGrid.querySelectorAll('img'));

  // Find the content area with heading, paragraph, and buttons
  let contentCol = null;
  // The direct child divs of grid-layout tablet-1-column grid-gap-xxl
  const layoutGrid = element.querySelector('.grid-layout.tablet-1-column');
  if (layoutGrid) {
    const children = Array.from(layoutGrid.children);
    // The column without images is the one with text
    contentCol = children.find(child => !child.querySelector('img'));
  }
  
  // Extract text info for the first slide
  let slideTextElements = [];
  if (contentCol) {
    // Heading
    const heading = contentCol.querySelector('h1, .h1-heading');
    if (heading) {
      const h2 = document.createElement('h2');
      h2.innerHTML = heading.innerHTML;
      slideTextElements.push(h2);
    }
    // Paragraph (description)
    const desc = contentCol.querySelector('p');
    if (desc) {
      slideTextElements.push(desc);
    }
    // Button group
    const btnGroup = contentCol.querySelector('.button-group');
    if (btnGroup) {
      slideTextElements.push(btnGroup);
    }
  }

  // Compose table rows: first row gets text, others get blank text cells
  const rows = imgs.map((img, idx) => {
    if (idx === 0 && slideTextElements.length) {
      return [img, slideTextElements.length === 1 ? slideTextElements[0] : slideTextElements];
    } else {
      return [img, ''];
    }
  });

  // Construct the final table data array
  const tableRows = [headerRow, ...rows];

  // Create block table and replace element
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
