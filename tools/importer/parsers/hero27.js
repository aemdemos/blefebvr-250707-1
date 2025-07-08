/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row - exact as provided
  const headerRow = ['Hero (hero27)'];
  
  // 2. Background image row (none in this HTML)
  const backgroundImageRow = [''];

  // 3. Content row: Should contain the heading, subheading, etc. from the main grid
  // The .container > .grid-layout contains all of the relevant content
  const container = element.querySelector(':scope > .container');
  
  // Defensive: if no container, fall back to whole element
  let mainContentBlock = container;
  if (!mainContentBlock) mainContentBlock = element;
  // Within .container, find the first immediate .grid-layout (not nested)
  let grid = mainContentBlock.querySelector(':scope > .grid-layout');
  if (!grid) {
    // fallback: first .grid-layout anywhere inside
    grid = mainContentBlock.querySelector('.grid-layout');
  }
  // Defensive: if still not found, use the container itself
  const contentToUse = grid || mainContentBlock;

  // Table: [header], [bgimage], [content]
  const cells = [headerRow, backgroundImageRow, [contentToUse]];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
