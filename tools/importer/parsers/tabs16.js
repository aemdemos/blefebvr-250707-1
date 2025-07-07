/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate tab links (children <a> elements)
  const tabLinks = Array.from(element.querySelectorAll(':scope > a'));

  // Prepare header row as in the example: only a single cell "Tabs"
  const headerRow = ['Tabs'];

  // Each subsequent row: [Tab Label, Tab Content (blank)]
  const tabRows = tabLinks.map(tabLink => {
    let label = '';
    const labelDiv = tabLink.querySelector('div');
    if (labelDiv) {
      label = labelDiv.textContent.trim();
    } else {
      label = tabLink.textContent.trim();
    }
    return [label, ''];
  });

  // The table must start with the header row (single cell!), then 2-cell rows
  // Insert headerRow as a single array, not [headerRow] (don't add empty cell)
  const cells = [headerRow, ...tabRows];

  // Create and insert table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
