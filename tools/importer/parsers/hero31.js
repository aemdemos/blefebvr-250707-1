/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as in the example
  const headerRow = ['Hero (hero31)'];

  // Background image row is blank (no image in HTML)
  const backgroundRow = [''];

  // Get the grid, which holds the content
  let grid = element.querySelector('.w-layout-grid');
  if (!grid) {
    // Try to fallback to .container or the direct element
    grid = element.querySelector('.container') || element;
  }

  // Find the relevant children
  // Expecting structure: [0]=name, [1]=tags, [2]=h2, [3]=richtext
  const children = grid.querySelectorAll(':scope > *');

  // Create a fragment for the content cell
  const frag = document.createDocumentFragment();

  // Tags (if present)
  if (children[1]) frag.appendChild(children[1]);
  // Heading (if present)
  if (children[2]) frag.appendChild(children[2]);
  // Paragraphs (if present)
  if (children[3]) frag.appendChild(children[3]);

  const contentRow = [frag];

  // Compose table and replace original element
  const cells = [headerRow, backgroundRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
