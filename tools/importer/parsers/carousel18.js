/* global WebImporter */
export default function parse(element, { document }) {
  // The header should match the block name as in the example
  const headerRow = ['Carousel (carousel18)'];

  // Find the grid of slides
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get each top-level slide container
  const slideDivs = Array.from(grid.children);
  // For each slide, extract the image element (do not clone!)
  const rows = slideDivs.map(div => {
    // Find first image inside this slide
    const img = div.querySelector('img');
    // If no image, gracefully fallback (avoid breaking)
    return [img || '', '']; // Second cell empty, as no text provided in this HTML
  });
  // Compose the final table: header row, then slides
  const cells = [headerRow, ...rows];
  // Build table block
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element
  element.replaceWith(table);
}
