/* global WebImporter */
export default function parse(element, { document }) {
  // Must have header row with exactly one column
  const headerRow = ['Accordion (accordion17)'];
  const rows = [headerRow];

  // Find all accordion items: direct .divider children, or the element itself if .divider
  const dividerEls = Array.from(element.querySelectorAll(':scope > .divider'));
  if (element.classList.contains('divider')) {
    dividerEls.unshift(element);
  }

  dividerEls.forEach(divider => {
    // Expect a .w-layout-grid direct child with two cells: h4-heading and rich-text
    const grid = divider.querySelector(':scope > .w-layout-grid');
    if (!grid) return;
    const children = Array.from(grid.children);
    const title = children.find(el => el.classList && el.classList.contains('h4-heading')) || children[0];
    const content = children.find(el => el.classList && el.classList.contains('rich-text')) || children[1];
    if (!title || !content) return; // skip incomplete rows
    // Compose single column: combine referenced elements into a new div
    const cell = document.createElement('div');
    cell.appendChild(title); // keep referenced element
    cell.appendChild(content); // keep referenced element
    rows.push([cell]); // only one column per row
  });

  // Build and replace with a 1-col table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
