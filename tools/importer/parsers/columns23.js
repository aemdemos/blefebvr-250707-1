/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid with two columns
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;
  const children = Array.from(mainGrid.children);

  // Find left (content) and right (image) columns
  let leftContent = null;
  let rightImage = null;
  for (const child of children) {
    if (child.tagName === 'IMG') {
      rightImage = child;
    } else if (child.classList.contains('w-layout-grid')) {
      // Instead of passing the whole grid, extract just the inner content div
      // Find the first child that is a .section (holds heading, text, buttons)
      const section = child.querySelector('.section');
      if (section) {
        leftContent = section;
      } else {
        // fallback if structure is different
        leftContent = child;
      }
    }
  }

  if (!leftContent || !rightImage) return;

  // Table header row
  const headerRow = ['Columns (columns23)'];
  // Second row: two columns only (no wrapper grid in left cell)
  const contentRow = [leftContent, rightImage];
  const cells = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
