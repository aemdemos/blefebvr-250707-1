/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row with block name
  const headerRow = ['Hero (hero41)'];

  // 2. Row with background image (should be an <img>, not a link)
  // Look for the first .cover-image img (not a picture or link)
  const bgImg = element.querySelector('img.cover-image');
  const bgImgRow = [bgImg ? bgImg : ''];

  // 3. Row with headings, subheading, text, and CTA (grouped in one cell)
  // The right text column has class 'container', find that
  const container = element.querySelector('.container');
  let contentParts = [];
  if (container) {
    // Look for the grid inside (sometimes there may only be one, sometimes not)
    const innerGrid = container.querySelector('.w-layout-grid');
    if (innerGrid) {
      // Find all direct children: h1, and .flex-vertical (which holds text, cta), in order
      for (const child of innerGrid.children) {
        // h1 (title)
        if (child.tagName.toLowerCase() === 'h1') {
          contentParts.push(child);
        }
        // .flex-vertical (contains paragraph and button-group)
        if (child.classList.contains('flex-vertical')) {
          // Add all its children (paragraph, button-group)
          for (const flexChild of child.children) {
            contentParts.push(flexChild);
          }
        }
      }
    } else {
      // fallback: just push all children
      for (const child of container.children) {
        contentParts.push(child);
      }
    }
  }
  const contentRow = [contentParts.length ? contentParts : ''];

  // Compose the table rows
  const cells = [
    headerRow,
    bgImgRow,
    contentRow,
  ];
  // Create the table and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
