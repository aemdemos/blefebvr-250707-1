/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row: Must match exactly
  const headerRow = ['Hero (hero40)'];

  // 2. Extract background image (if present)
  let bgImg = null;
  // Only select <img> that is visible and a likely background
  // In this HTML, it's the first img inside the header
  const imgEl = element.querySelector('img');
  if (imgEl) {
    bgImg = imgEl;
  }

  // 3. Extract content: title, subheading, CTA
  // Find the content grid: the one containing the <h1>
  let contentBlock = null;
  for (const div of element.querySelectorAll('.w-layout-grid')) {
    if (div.querySelector('h1')) {
      contentBlock = div;
      break;
    }
  }

  // Fallback: if no contentBlock found, use the first container .container
  if (!contentBlock) {
    const fallback = element.querySelector('.container');
    if (fallback) contentBlock = fallback;
  }

  // 4. Build table rows to fit: Header | [Image] | [Content]
  const rows = [headerRow];
  rows.push([bgImg ? bgImg : '']);
  rows.push([contentBlock ? contentBlock : '']);

  // 5. Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
