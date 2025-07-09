/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Make sure element exists
  if (!element) return;

  // 1. Header row - block name (must match target block)
  const headerRow = ['Hero (hero29)'];

  // 2. Background image row: none in input, so empty cell
  const bgRow = [''];

  // 3. Content row: extract in correct, visual order
  // Find the grid container
  const grid = element.querySelector('.grid-layout') || element.querySelector('[class*="grid-layout"]');
  const contentParts = [];
  if (grid) {
    // 1. Name (e.g., Taylor Brooks)
    const name = grid.querySelector('.paragraph-xl');
    if (name) contentParts.push(name);

    // 2. Tags (all tags, in order)
    const tagsWrapper = grid.querySelector('.flex-vertical');
    if (tagsWrapper) {
      const tagDivs = Array.from(tagsWrapper.querySelectorAll('.tag'));
      if (tagDivs.length) {
        // Use existing wrapper for semantic grouping
        contentParts.push(tagsWrapper);
      }
    }

    // 3. Headline (h2)
    const headline = grid.querySelector('h2');
    if (headline) contentParts.push(headline);

    // 4. Paragraphs (rich-text)
    // Defensive: look for .rich-text.paragraph-lg
    const richTextContainer = grid.querySelector('.rich-text.paragraph-lg');
    if (richTextContainer) contentParts.push(richTextContainer);
  }

  // If grid not found or contentParts empty: fallback to section children
  if (!grid || !contentParts.length) {
    contentParts.length = 0;
    Array.from(element.children).forEach(el => contentParts.push(el));
  }

  // Compose block table
  const tableCells = [
    headerRow,
    bgRow,
    [contentParts]
  ];
  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);
  // Replace the section with the new block table
  element.replaceWith(blockTable);
}
