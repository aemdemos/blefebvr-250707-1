/* global WebImporter */
export default function parse(element, { document }) {
  // Find all tab panes (each tab contains a grid of cards)
  const tabPanes = element.querySelectorAll('.w-tab-pane');
  const rows = [];

  tabPanes.forEach(tabPane => {
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Select all <a> that are direct cards (both image and non-image types)
    const cardLinks = Array.from(grid.querySelectorAll('a.utility-link-content-block, a.card-link'));
    cardLinks.forEach(cardLink => {
      // Image cell: look for .utility-aspect-3x2 > img
      let imageCell = '';
      const aspect = cardLink.querySelector('.utility-aspect-3x2');
      if (aspect) {
        const img = aspect.querySelector('img');
        if (img) imageCell = img;
      }
      // If no image, keep imageCell blank

      // Text cell: contains heading (h3) and optional description
      const textCellFrag = document.createElement('div');
      const heading = cardLink.querySelector('h3');
      if (heading) textCellFrag.appendChild(heading);
      const desc = cardLink.querySelector('.paragraph-sm');
      if (desc) textCellFrag.appendChild(desc);

      rows.push([imageCell, textCellFrag]);
    });
  });

  // Compose table: First row is block name
  const headerRow = ['Cards (cards26)'];
  const tableRows = [headerRow, ...rows];

  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
