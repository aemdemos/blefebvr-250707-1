/* global WebImporter */
export default function parse(element, { document }) {
  // Table (no header), 2 columns: question and answer
  const headerRow = ['Table (no header)'];
  const cells = [headerRow];

  // Each child with class 'divider' represents a row
  const dividers = element.querySelectorAll(':scope > .divider');
  dividers.forEach((divider) => {
    const grid = divider.querySelector('.w-layout-grid');
    if (grid) {
      // We expect two children: the heading and the rich text answer
      const children = Array.from(grid.children);
      // Defensive: if not exactly two, skip row
      if (children.length >= 2) {
        // Reference actual elements (not their contents), preserving structure
        cells.push([children[0], children[1]]);
      }
    }
  });

  // Only create and replace if any rows were found (besides header)
  if (cells.length > 1) {
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }
}
