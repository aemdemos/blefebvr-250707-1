/* global WebImporter */
export default function parse(element, { document }) {
  // For each tab pane (so a single parse handles all tabs)
  const tabPanes = element.querySelectorAll('.w-tab-pane');
  tabPanes.forEach((tabPane) => {
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is a direct child anchor
    const cards = Array.from(grid.querySelectorAll(':scope > a'));
    // Start with the correct block header
    const rows = [['Cards (cards17)']];
    cards.forEach((card) => {
      // --- IMAGE COLUMN ---
      // Try to find an image in the card
      let img = null;
      const aspectDiv = card.querySelector('.utility-aspect-3x2');
      if (aspectDiv) {
        img = aspectDiv.querySelector('img');
      }
      // For blank or text-only cards, image is blank
      const imageCell = img ? img : '';

      // --- TEXT COLUMN ---
      // Look for heading and description text
      // For some cards, heading is direct child of card, for others, nested:
      let heading = card.querySelector('h3');
      // Description is a .paragraph-sm inside the card
      let paragraph = card.querySelector('.paragraph-sm');
      // Compose text cell
      const textCell = [];
      if (heading) textCell.push(heading);
      if (paragraph) textCell.push(paragraph);
      rows.push([imageCell, textCell]);
    });
    // Replace the original grid with the created table
    const blockTable = WebImporter.DOMUtils.createTable(rows, document);
    grid.replaceWith(blockTable);
  });
}