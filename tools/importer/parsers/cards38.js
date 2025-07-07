/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as in the example
  const cells = [['Cards (cards38)']];

  // Find the main grid inside the section
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get the main card (large image/feature card) and the side cards (nested grid)
  const gridChildren = Array.from(grid.children);

  // Helper: extract card info (image, [heading, desc, cta]) from card element
  function extractCard(cardEl) {
    // Image: Find .utility-aspect-2x3 or .utility-aspect-1x1 then the img
    let imgDiv = cardEl.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    let img = imgDiv ? imgDiv.querySelector('img') : null;
    // Texts: Heading, p, button if present (keep order)
    const textParts = [];
    let heading = cardEl.querySelector('h3, h4');
    if (heading) textParts.push(heading);
    let desc = cardEl.querySelector('p');
    if (desc) textParts.push(desc);
    let cta = cardEl.querySelector('.button');
    if (cta) textParts.push(cta);
    return [img, textParts];
  }

  // First direct child <a> (feature card)
  const mainCard = gridChildren.find(el => el.tagName === 'A');
  if (mainCard) {
    cells.push(extractCard(mainCard));
  }

  // Nested grid of smaller cards
  const nestedGrid = gridChildren.find(el => el.classList.contains('w-layout-grid'));
  if (nestedGrid) {
    // Each card is a <a>
    const nestedCards = Array.from(nestedGrid.querySelectorAll(':scope > a'));
    nestedCards.forEach(card => {
      cells.push(extractCard(card));
    });
  }

  // Replace the section with the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
