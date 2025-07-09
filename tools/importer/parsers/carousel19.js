/* global WebImporter */
export default function parse(element, { document }) {
  // Find the root carousel image grid
  const rootGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!rootGrid) return;

  // Locate the image panel grid
  const heroScale = rootGrid.querySelector('.ix-hero-scale-3x-to-1x');
  if (!heroScale) return;
  const imagesGrid = heroScale.querySelector('.grid-layout.desktop-3-column');
  if (!imagesGrid) return;

  // Find the text content panel (the column with the heading, description, and CTAs)
  const contentCol = rootGrid.querySelector('.ix-hero-scale-3x-to-1x-content');
  let textCellContent = '';
  if (contentCol) {
    const container = contentCol.querySelector('.container');
    if (container) {
      // Collect heading, subheading, and CTA buttons
      const heading = container.querySelector('h1');
      const subheading = container.querySelector('.subheading');
      const buttons = container.querySelectorAll('.button-group a');
      let contentParts = [];
      if (heading) contentParts.push(heading.cloneNode(true));
      if (subheading) contentParts.push(subheading.cloneNode(true));
      if (buttons.length) {
        const btnWrapper = document.createElement('div');
        btnWrapper.append(...Array.from(buttons).map(btn => btn.cloneNode(true)));
        contentParts.push(btnWrapper);
      }
      // Only keep non-empty
      if (contentParts.length) {
        const cell = document.createElement('div');
        contentParts.forEach(part => cell.appendChild(part));
        textCellContent = cell.childNodes.length === 1 ? cell.firstChild : cell;
      }
    }
  }

  // Collect all slide images in order
  const imageDivs = Array.from(imagesGrid.children).filter(child => child.querySelector('img'));
  if (!imageDivs.length) return;

  // Table header must match block name exactly
  const headerRow = ['Carousel (carousel19)'];
  // Each row: first cell is the image, second cell is the (shared) text content
  const rows = imageDivs.map(div => {
    const img = div.querySelector('img');
    if (!img) return null;
    return [img, textCellContent || ''];
  }).filter(Boolean);

  if (!rows.length) return;

  const table = [headerRow, ...rows];

  // Use WebImporter.DOMUtils to create the table referencing actual elements
  const block = WebImporter.DOMUtils.createTable(table, document);
  element.replaceWith(block);
}
