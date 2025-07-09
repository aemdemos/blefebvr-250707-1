/* global WebImporter */

export default function parse(element, { document }) {
  // Find the grid container
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  
  // Find the background image
  let imgElem = null;
  const imgCol = Array.from(grid.children).find(div => div.querySelector('img'));
  if (imgCol) {
    imgElem = imgCol.querySelector('img');
  }

  // Find the main content (headline group)
  let contentElem = null;
  const contentCol = Array.from(grid.children).find(div => div.querySelector('.utility-margin-bottom-6rem'));
  if (contentCol) {
    const contentBlock = contentCol.querySelector('.utility-margin-bottom-6rem');
    if (contentBlock) {
      // Ensure we reference the actual h1 (preserve heading semantics)
      const headline = contentBlock.querySelector('h1');
      // Remove empty divs (e.g. button-group) if present
      const contentClone = document.createElement('div');
      if (headline) contentClone.appendChild(headline);
      // If other relevant content (subheading, CTA) present, add here
      contentElem = contentClone;
    }
  }
  // Compose rows as per Hero (hero13) requirements
  const headerRow = ['Hero (hero13)'];
  const imageRow = [imgElem ? imgElem : ''];
  const contentRow = [contentElem && contentElem.childNodes.length ? contentElem : ''];

  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  
  element.replaceWith(table);
}
