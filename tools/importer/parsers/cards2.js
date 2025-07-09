/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract cards from grid structure
  function extractCardsFromGrid(grid) {
    const cardEls = [];
    // Get first column: large prominent card
    const largeCard = grid.querySelector('a.utility-link-content-block');
    if (largeCard) cardEls.push(largeCard);
    // Second area: a horizontal flexbox with two cards (has its own flex container)
    const flex1 = grid.querySelector('.flex-horizontal.flex-vertical.flex-gap-sm.w-node-f71f504d-ed02-fbe1-5974-4ebc66911f0e-86a1a9b3');
    if (flex1) {
      flex1.querySelectorAll('a.utility-link-content-block').forEach(card => cardEls.push(card));
    }
    // Third area: a flex with several mini cards (no images, just headings/descriptions) separated by dividers.
    const flex2 = grid.querySelector('.flex-horizontal.flex-vertical.flex-gap-sm.w-node-f71f504d-ed02-fbe1-5974-4ebc66911f34-86a1a9b3');
    if (flex2) {
      flex2.querySelectorAll('a.utility-link-content-block').forEach(card => cardEls.push(card));
    }
    return cardEls;
  }

  // Helper to build content cell for a card
  function buildCardTextCell(card) {
    const content = [];
    // Tag group (preserve the real element)
    const tagGroup = card.querySelector('.tag-group');
    if (tagGroup) content.push(tagGroup);
    // Heading - choose the heading element, preserve source heading level
    let heading = card.querySelector('h1,h2,h3,h4,h5,h6');
    if (heading) content.push(heading);
    // Paragraph/description
    const paragraph = card.querySelector('p');
    if (paragraph) content.push(paragraph);
    return content.length === 1 ? content[0] : content;
  }

  // Helper to build image cell for a card
  function buildCardImageCell(card) {
    const img = card.querySelector('img');
    if (img) return img;
    // If no image, must return empty string
    return '';
  }

  // Main logic
  const headerRow = ['Cards (cards2)'];
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const cards = extractCardsFromGrid(grid);

  // Build rows
  const rows = cards.map(card => {
    const image = buildCardImageCell(card);
    const textContent = buildCardTextCell(card);
    return [image, textContent];
  });

  // Compose table data
  const table = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(table, document);
  element.replaceWith(block);
}
