/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block: header + 1 row per accordion item, 2 columns (title, content)
  const headerRow = ['Accordion (accordion22)'];
  const rows = [];

  // The direct children of the element are: 1 or more .divider elements
  // Each .divider contains a .w-layout-grid with 2 items: [title, content]
  const dividers = element.querySelectorAll(':scope > .divider');
  dividers.forEach((divider) => {
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return;
    // Get first 2 direct children of the grid (should be title and content)
    const children = grid.querySelectorAll(':scope > *');
    if (children.length < 2) return; // skip incomplete
    const titleEl = children[0];
    const contentEl = children[1];
    rows.push([titleEl, contentEl]);
  });

  // Handle edge case: if no .divider children, try to look for .w-layout-grid directly
  if (rows.length === 0) {
    const grids = element.querySelectorAll(':scope > .w-layout-grid');
    grids.forEach((grid) => {
      const children = grid.querySelectorAll(':scope > *');
      if (children.length < 2) return;
      const titleEl = children[0];
      const contentEl = children[1];
      rows.push([titleEl, contentEl]);
    });
  }

  // Compose the table rows
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
