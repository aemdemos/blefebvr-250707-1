/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing all image blocks
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Each grid child contains a .utility-aspect-2x3 with an <img>
  const items = Array.from(grid.children).map(container => {
    const aspectDiv = container.querySelector('.utility-aspect-2x3');
    if (!aspectDiv) return null;
    const img = aspectDiv.querySelector('img');
    if (!img) return null;
    return img;
  }).filter(Boolean);
  // Table header row must match target block name exactly
  const headerRow = ['Carousel (carousel30)'];
  // Each row: [imageElement, empty string]
  const rows = items.map(img => [img, '']);
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
