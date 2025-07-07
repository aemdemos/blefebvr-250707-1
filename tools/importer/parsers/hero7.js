/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row for the block name, must match markdown example exactly
  const headerRow = ['Hero (hero7)'];

  // 2. Background Image (the block expects exactly one image in the 2nd row)
  // From the example markdown and screenshots: use only ONE image in the background row, the first of the images
  let backgroundImg = null;
  const firstImageDiv = element.querySelector(':scope > div');
  if (firstImageDiv) {
    backgroundImg = firstImageDiv.querySelector('img');
  }
  const backgroundRow = [backgroundImg ? backgroundImg : ''];

  // 3. Third row: Headline/subheading/cta area - not present in provided HTML, so leave blank string
  const contentRow = [''];

  // 4. Create the table as per spec (all elements referenced directly, no cloning)
  const cells = [
    headerRow,
    backgroundRow,
    contentRow,
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // 5. Replace the original element with the new table
  element.replaceWith(table);
}
