/* global WebImporter */
export default function parse(element, { document }) {
  // Find the active tab pane; fallback to first if none marked active
  let activePane = element.querySelector(':scope > .w--tab-active') || element.querySelector(':scope > div');
  if (!activePane) return;

  // Get grid (content block) inside active pane, fallback to activePane
  const grid = activePane.querySelector('.w-layout-grid') || activePane;

  // Find the background image (first <img> direct child)
  let img = null;
  for (const child of grid.children) {
    if (child.tagName === 'IMG') {
      img = child;
      break;
    }
  }

  // Row 2: only the image (if present)
  const row2 = img ? [img] : [''];

  // Row 3: all non-image direct children (including heading, subheading, CTA, etc.)
  const textContent = [];
  for (const child of grid.children) {
    if (child !== img) {
      textContent.push(child);
    }
  }
  const row3 = textContent.length > 0 ? textContent : [''];

  // Compose the table
  const cells = [
    ['Hero (hero23)'],
    row2,
    row3
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
