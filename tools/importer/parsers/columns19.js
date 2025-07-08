/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container, which holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // The expected example markdown structure is:
  // | Columns (columns19) |
  // | [column1] | [column2] | [column3] |
  // Where column1 is the intro (eyebrow, heading, subheading),
  // column2 is the list of contact methods (email/call/visit),
  // column3 is the image.

  // Identify which child is which column semantically
  // Based on HTML: 0 = text block, 1 = ul with contacts, 2 = image
  let intro = null, contacts = null, image = null;
  gridChildren.forEach((child) => {
    if (child.tagName === 'UL') {
      contacts = child;
    } else if (child.tagName === 'DIV') {
      intro = child;
    } else if (child.tagName === 'IMG') {
      image = child;
    }
  });
  // Fallback: if any are still null, try to assign by order
  if (!intro || !contacts || !image) {
    if (gridChildren[0] && !intro) intro = gridChildren[0];
    if (gridChildren[1] && !contacts) contacts = gridChildren[1];
    if (gridChildren[2] && !image) image = gridChildren[2];
  }

  // Build the header row (single cell, single column)
  const headerRow = ['Columns (columns19)'];
  // Build the content row
  const contentRow = [intro, contacts, image].map((el) => el || '');

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
