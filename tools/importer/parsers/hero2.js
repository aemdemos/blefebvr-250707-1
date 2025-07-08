/* global WebImporter */
export default function parse(element, { document }) {
  // Create header row with correct block name and variant
  const headerRow = ['Hero (hero2)'];

  // Find the main image (optional background/decorative image)
  // The HTML has: header > div.container > div.grid-layout > img
  let img = element.querySelector('img');

  // Find the content column (headings, subheadings, CTAs)
  // The direct children of .grid-layout, that's not an IMG, are candidates
  const grid = element.querySelector('.grid-layout');
  let contentDiv = null;
  if (grid) {
    // Find first DIV child under grid-layout (the text content column)
    contentDiv = Array.from(grid.children).find(
      (child) => child.tagName === 'DIV'
    );
  }

  // Guard against missing nodes
  // If no image, use undefined (the table cell will be empty)
  // If no contentDiv, use undefined (should not happen but preserves structure)
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [img || ''],
    [contentDiv || ''],
  ], document);

  element.replaceWith(table);
}
