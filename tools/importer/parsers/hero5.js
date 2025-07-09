/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as required (must match target block name exactly)
  const headerRow = ['Hero (hero5)'];

  // This block visually has no image, so row 2 is empty
  const imageRow = [''];

  // Find the grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // The immediate children of the grid are: [content, button]
  const gridChildren = grid.querySelectorAll(':scope > div');
  if (gridChildren.length < 2) return;
  const contentDiv = gridChildren[0];
  const buttonDiv = gridChildren[1];

  // Gather cell contents for row 3
  const cellContent = [];
  if (contentDiv) {
    // Retain heading and paragraph
    contentDiv.childNodes.forEach((child) => {
      if (child.nodeType === Node.ELEMENT_NODE) {
        // Only add heading (of any level) or paragraphs
        if (/^H[1-6]$/.test(child.tagName) || child.tagName === 'P') {
          cellContent.push(child);
        }
      }
    });
  }

  // Add call-to-action links from button group
  if (buttonDiv) {
    buttonDiv.querySelectorAll('a').forEach((a) => {
      cellContent.push(a);
    });
  }

  const contentRow = [cellContent];

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow
  ], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
