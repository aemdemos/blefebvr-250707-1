/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: block name must match example exactly
  const headerRow = ['Carousel (carousel24)'];

  // Robustly locate the card body (handles variants in structure)
  // Find the first '.card-body' descendant within element
  let cardBody = element.querySelector('.card-body');
  if (!cardBody) {
    // fallback: search for a child div with a heading and img
    cardBody = Array.from(element.querySelectorAll('div')).find(div => div.querySelector('img') && div.querySelector('[class*=heading]')) || element;
  }

  // Extract the image element (first img descendant)
  const img = cardBody.querySelector('img');
  // For first cell: always the image (may be null)
  const imageCell = img || '';

  // Extract title (heading)
  // Accepts any heading tag or .h4-heading or similar
  let headingEl = cardBody.querySelector('h1, h2, h3, h4, h5, h6, [class*=heading]');
  let textCell = '';
  if (headingEl) {
    // If not already a heading, convert classed element to <h2>
    if (!/^H[1-6]$/.test(headingEl.tagName)) {
      const h2 = document.createElement('h2');
      h2.textContent = headingEl.textContent;
      textCell = h2;
    } else {
      textCell = headingEl;
    }
  }

  // Table rows: header row, then one slide row
  const cells = [headerRow, [imageCell, textCell]];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
