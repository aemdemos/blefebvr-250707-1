/* global WebImporter */

export default function parse(element, { document }) {
  // 1. Set table header row with target block name
  const headerRow = ['Hero (hero34)'];

  // 2. Background image row: none present in this HTML, so cell is empty
  const imageRow = [''];

  // 3. Content row: heading, subheading, CTA button (all from grid-layout children)
  const grid = element.querySelector('.grid-layout');
  const contentElements = [];
  if (grid) {
    // Left: heading and subheading
    const textBlock = grid.querySelector('div');
    if (textBlock) {
      // Find heading (h1-h6)
      const heading = textBlock.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) contentElements.push(heading);
      // Find subheading (paragaph with class 'subheading' or any <p>)
      let subheading = textBlock.querySelector('p.subheading, p');
      if (subheading && !contentElements.includes(subheading)) contentElements.push(subheading);
    }
    // Right: CTA button
    const button = grid.querySelector('a.button, button');
    if (button) contentElements.push(button);
  }
  // Remove any null/undefined just in case
  const filteredContentElements = contentElements.filter(Boolean);
  const contentRow = [filteredContentElements];

  // Compose table rows
  const cells = [headerRow, imageRow, contentRow];

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
