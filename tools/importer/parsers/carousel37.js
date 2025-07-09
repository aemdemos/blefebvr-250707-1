/* global WebImporter */

export default function parse(element, { document }) {
  // Use the required block name as a single-column header
  const headerRow = ['Carousel (carousel37)'];
  const rows = [headerRow];

  // For each slide, only include the image in a single cell (no empty cells)
  element.querySelectorAll(':scope > div').forEach(div => {
    const img = div.querySelector('img');
    if (img) rows.push([img]);
  });

  // Create table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
