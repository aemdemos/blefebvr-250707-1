/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: must match the block name exactly
  const headerRow = ['Hero (hero32)'];

  // 2. Background image row: none in this HTML, so just an empty string
  const bgImageRow = [''];

  // 3. Content row: gather all content as seen in the HTML and screenshots
  // All content is inside the .grid-layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  const contentElements = [];

  // Get the main heading (h2)
  const heading = grid.querySelector('h2');
  if (heading) {
    contentElements.push(heading);
  }

  // Tag group (optional, as subheading or badges)
  const tags = grid.querySelector('div.flex-vertical');
  if (tags) {
    contentElements.push(tags);
  }

  // Author (optional, may display at top as per screenshot)
  const author = grid.querySelector('.paragraph-xl');
  if (author) {
    contentElements.unshift(author);
  }
  
  // Main body content: rich text block
  const richText = grid.querySelector('.rich-text');
  if (richText) {
    contentElements.push(richText);
  }

  // Compose the final table for the block
  const cells = [
    headerRow,
    bgImageRow,
    [contentElements]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
