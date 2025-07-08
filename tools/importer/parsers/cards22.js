/* global WebImporter */
export default function parse(element, { document }) {
  // Header for the block table
  const headerRow = ['Cards (cards22)'];
  const rows = [headerRow];

  // Collect all tab panes (to support all tabs, not just the active one)
  const tabPanes = element.querySelectorAll('.w-tab-pane');

  tabPanes.forEach(tabPane => {
    // Within each pane, find the grid
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;

    // Each direct child <a> is a card
    const cards = Array.from(grid.children).filter(child => child.tagName === 'A');
    cards.forEach(card => {
      // Find image
      let imageCell = '';
      const aspectBox = card.querySelector('.utility-aspect-3x2');
      if (aspectBox) {
        const img = aspectBox.querySelector('img');
        if (img) {
          imageCell = img;
        }
      }
      // Some cards may not have an image

      // For text, use heading and paragraph, maintaining their order
      const textFragments = [];
      // Get heading (h3 or .h4-heading)
      const heading = card.querySelector('h3, .h4-heading');
      if (heading) textFragments.push(heading);
      // Get the first .paragraph-sm under this card
      const paragraph = card.querySelector('.paragraph-sm');
      if (paragraph) textFragments.push(paragraph);
      // If no heading or paragraph, leave cell empty
      rows.push([imageCell, textFragments]);
    });
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}