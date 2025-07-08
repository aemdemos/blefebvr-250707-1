/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find background image (decorative image outside the main card)
  let backgroundImg = null;
  const rootDivs = element.querySelectorAll(':scope > div');
  for (const div of rootDivs) {
    const img = div.querySelector('img.cover-image.utility-position-absolute');
    if (img) {
      backgroundImg = img;
      break;
    }
  }

  // 2. Find the main card section that contains the headline, features, cta, and inner image
  let card = null;
  for (const div of rootDivs) {
    const found = div.querySelector('.card');
    if (found) {
      card = found;
      break;
    }
  }

  // 3. Compose table rows: header, background image, content
  // If a row is missing (e.g., backgroundImg or card), use an empty string
  const cells = [
    ['Hero (hero13)'],
    [backgroundImg || ''],
    [card || ''],
  ];

  // 4. Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
