/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (each column wrapper)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // For each column, extract the first <img> element for that column if present, else the div itself
  const cells = columns.map(div => {
    const img = div.querySelector('img');
    return img ? img : div;
  });
  // Table rows: header (1 cell), then content row (n cells for columns)
  const tableRows = [
    ['Columns (columns12)'],
    cells
  ];
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
