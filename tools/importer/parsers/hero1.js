/* global WebImporter */
export default function parse(element, { document }) {
  // Table header exactly as specified
  const headerRow = ['Hero (hero1)'];

  // Get the first image inside the grid
  const firstImgDiv = element.querySelector(':scope > div img');
  const imgRow = [firstImgDiv ? firstImgDiv : ''];

  // The HTML provided has no textual content or CTA in this block, so the text row is empty
  const textRow = [''];

  // Compose table cells as per the block spec: 1 column, 3 rows (header, bg img, text area)
  const cells = [
    headerRow,
    imgRow,
    textRow
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
