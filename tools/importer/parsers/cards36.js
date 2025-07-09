/* global WebImporter */

export default function parse(element, { document }) {
  // Always use target block name for header row
  const headerRow = ['Cards (cards36)'];
  const rows = [];

  // Find the top-level card grid
  const mainGrid = element.querySelector('.w-layout-grid');
  if (!mainGrid) return;

  // First card: large left (h2 heading)
  const firstCard = mainGrid.querySelector('a.utility-link-content-block.w-inline-block');
  if (firstCard) {
    // First cell: image (mandatory)
    let image = null;
    const imgDiv = firstCard.querySelector('.utility-aspect-2x3');
    if (imgDiv) image = imgDiv.querySelector('img');

    // Second cell: text (title, description, CTA)
    const textDiv = firstCard.querySelector('.utility-padding-all-2rem');
    const cardText = [];
    if (textDiv) {
      const heading = textDiv.querySelector('h3');
      const para = textDiv.querySelector('p');
      const cta = textDiv.querySelector('.button');
      if (heading) cardText.push(heading);
      if (para) cardText.push(para);
      if (cta) cardText.push(cta);
    }
    rows.push([image, cardText]);
  }

  // Find nested grid for the other cards
  const nestedGrid = mainGrid.querySelector('.w-layout-grid.grid-layout.tablet-1-column.grid-gap-sm.y-top');
  if (nestedGrid) {
    const innerCards = Array.from(nestedGrid.children).filter(child => child.tagName === 'A' && child.classList.contains('utility-link-content-block'));
    innerCards.forEach(card => {
      // First cell: image
      let image = null;
      const aspectDiv = card.querySelector('div[class*="utility-aspect"]');
      if (aspectDiv) image = aspectDiv.querySelector('img');
      // Second cell: text
      const cardText = [];
      const heading = card.querySelector('h3');
      const para = card.querySelector('p');
      const cta = card.querySelector('.button'); // defensive, not present in sample
      if (heading) cardText.push(heading);
      if (para) cardText.push(para);
      if (cta) cardText.push(cta);
      rows.push([image, cardText]);
    });
  }

  // Build table
  const tableRows = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
