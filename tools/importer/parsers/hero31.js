/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Hero (hero31)'];

  // Defensive: find the main grid (content root)
  let grid = element.querySelector('.grid-layout');
  if (!grid) grid = element;

  // Find main image: prefer first meaningful <img>
  let image = grid.querySelector('img');
  // If not found, put empty cell
  let imageRow = [image || ''];

  // Find the main text area (the block with headline, subhead, byline, etc)
  // Look for a div with an h2 child and author list
  let textBlock = null;
  for (const div of grid.querySelectorAll('div')) {
    if (
      div.querySelector('.h2-heading') &&
      div.querySelector('.flex-horizontal.flex-gap-xxs')
    ) {
      textBlock = div;
      break;
    }
  }
  // Defensive fallback
  if (!textBlock) textBlock = grid;

  // Compose rows: header, image, content
  const rows = [
    headerRow,
    imageRow,
    [textBlock]
  ];

  // Use the actual DOM node, not a clone or new element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
