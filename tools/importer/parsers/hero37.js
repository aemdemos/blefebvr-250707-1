/* global WebImporter */
export default function parse(element, { document }) {
  // Compose header row
  const headerRow = ['Hero (hero37)'];
  // Compose background image row (none present in this example)
  const bgRow = [''];

  // Compose content row
  // Find grid within the container
  const container = element.querySelector('.container');
  let contentCell = [];

  if (container) {
    const grid = container.querySelector('.grid-layout');
    if (grid) {
      // Get direct grid children
      const gridItems = grid.querySelectorAll(':scope > *');
      if (gridItems.length) {
        // Typically, left is text (heading, subheading), right is CTA
        let textContent = [];
        let cta = null;
        if (gridItems.length === 2) {
          const left = gridItems[0];
          const right = gridItems[1];
          // Get all element children of left (preserves all headings and paragraphs)
          textContent = Array.from(left.children);
          // If right is a link or button, keep it
          if (right.tagName === 'A' || right.tagName === 'BUTTON') {
            cta = right;
          } else {
            // if it's a wrapper, try to find link/button inside
            cta = right.querySelector('a,button');
          }
          if (cta) {
            contentCell = [...textContent, cta];
          } else {
            contentCell = [...textContent];
          }
        } else {
          // fallback: use all children in order
          contentCell = Array.from(grid.children);
        }
      } else {
        // fallback: use grid itself
        contentCell = [grid];
      }
    } else {
      // fallback: use container's children
      contentCell = Array.from(container.children);
    }
  } else {
    // fallback: use element's children
    contentCell = Array.from(element.children);
  }

  const contentRow = [contentCell];
  // Compose the block rows
  const rows = [headerRow, bgRow, contentRow];
  // Create table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace element
  element.replaceWith(table);
}
