/* global WebImporter */
export default function parse(element, { document }) {
  // Header: Must match example exactly
  const headerRow = ['Cards (cards20)'];

  // Find all card bodies
  const cardBodies = element.querySelectorAll('.card-body');
  const rows = [];

  cardBodies.forEach(body => {
    // First cell: Image (mandatory if present)
    const img = body.querySelector('img, picture');

    // Second cell: All text content (heading, description, etc.), preserving order
    const textContent = [];
    body.childNodes.forEach(node => {
      // Exclude images from text cell
      if (node.nodeType === 1 && (node.tagName === 'IMG' || node.tagName === 'PICTURE')) return;
      // Include all other elements and text nodes (including heading, description, etc.)
      if (node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim())) {
        textContent.push(node);
      }
    });
    // Only push if there's at least one cell with content
    if (img || textContent.length) {
      rows.push([
        img ? img : '',
        textContent.length === 1 ? textContent[0] : textContent
      ]);
    }
  });

  if (rows.length === 0) return;
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
