/* global WebImporter */
export default function parse(element, { document }) {
  // HEADER: Must exactly match spec
  const headerRow = ['Hero (hero14)'];

  // 1. Background image: the first .cover-image.utility-position-absolute img in the section
  let bgImg = null;
  const topLevelDivs = element.querySelectorAll(':scope > div');
  for (const div of topLevelDivs) {
    const img = div.querySelector('img.cover-image.utility-position-absolute');
    if (img) {
      bgImg = img;
      break;
    }
  }

  // 2. Main content (headline, features, CTA, and secondary image): all content inside .card-body
  let contentCell = '';
  const cardBody = element.querySelector('.card-body');
  if (cardBody) {
    contentCell = cardBody;
  }

  // Table rows: header, background image, content
  const rows = [
    headerRow,
    [bgImg ? bgImg : ''],
    [contentCell]
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
