/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table Header
  const headerRow = ['Hero (hero6)'];

  // 2. Row: Background image
  // Look for <img> that is likely used as a background
  // Typically the first <img> within the element
  const imageEl = element.querySelector('img');

  // 3. Row: Content (headline, subheading, CTA)
  // Find the card container with text and buttons
  let contentEl = element.querySelector('.card');
  // Fallback: parent of first h1 if .card is not found
  if (!contentEl) {
    const h1 = element.querySelector('h1');
    if (h1 && h1.parentElement !== element) contentEl = h1.parentElement;
  }

  // Defensive: If nothing found, provide empty cell
  const imageCell = imageEl ? imageEl : '';
  const contentCell = contentEl ? contentEl : '';

  // Build block table: 1 column, 3 rows
  const cells = [
    headerRow,
    [imageCell],
    [contentCell]
  ];

  // Create table and replace element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
