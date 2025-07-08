/* global WebImporter */
export default function parse(element, { document }) {
  // Create header row as required by the block definition
  const cells = [['Accordion (accordion21)']];

  // The structure is: each accordion item is a direct child .divider
  // Each .divider contains a .w-layout-grid with (title, content)
  // Use only the direct .divider children
  const accordionItems = Array.from(element.querySelectorAll(':scope > div.divider'));

  accordionItems.forEach(item => {
    const grid = item.querySelector(':scope > .w-layout-grid');
    if (!grid) return;
    // The two children are: 0 = title, 1 = content
    const title = grid.children[0];
    const content = grid.children[1];
    if (title && content) {
      cells.push([title, content]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
