/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row exactly as specified
  const headerRow = ['Cards (cards5)'];
  const rows = [headerRow];

  // Locate the main grid
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get all top-level direct children of the grid
  const gridChildren = Array.from(grid.children);

  // Helper: extract card data
  function extractCard(cardElem, withImage) {
    let imageElem = '';
    if (withImage) {
      // Try both 1x1 and 3x2 aspect wrappers
      const imgWrap = cardElem.querySelector('.utility-aspect-1x1, .utility-aspect-3x2');
      if (imgWrap) {
        const img = imgWrap.querySelector('img');
        if (img) imageElem = img;
      }
    }
    // Tag (optional)
    const tag = cardElem.querySelector('.tag');
    // Heading (h3)
    const heading = cardElem.querySelector('h3');
    // Description (p)
    const desc = cardElem.querySelector('p');
    // Compose text cell (original nodes, not cloned, to preserve references)
    const textCell = [];
    if (tag) textCell.push(tag);
    if (heading) textCell.push(heading);
    if (desc) textCell.push(desc);
    // If all text cell items are undefined, fallback to empty string
    return [imageElem, textCell.length ? textCell : ''];
  }

  // 1. First card (large left card)
  // It's always the first <a> direct child of the grid
  const mainCard = gridChildren.find(
    el => el.tagName === 'A' && el.classList.contains('utility-link-content-block')
  );
  if (mainCard) {
    rows.push(extractCard(mainCard, true));
  }

  // 2. Two vertical cards with images (inside a flex container)
  // Next direct child of the grid is a flex, containing two <a>
  const flexWithTwoCards = gridChildren.find(
    el => el.classList.contains('flex-horizontal') && el.querySelector('img')
  );
  if (flexWithTwoCards) {
    const cards = Array.from(flexWithTwoCards.querySelectorAll('a.utility-link-content-block'));
    cards.forEach(card => {
      rows.push(extractCard(card, true));
    });
  }

  // 3. Series of text-only cards (right column flex)
  // Find the flex that has many <a> without images
  const flexTextCards = gridChildren.find(
    el => el.classList.contains('flex-horizontal') && !el.querySelector('img')
  );
  if (flexTextCards) {
    // Only select direct <a>s, not dividers
    const textCards = Array.from(flexTextCards.children).filter(
      el => el.tagName === 'A' && el.classList.contains('utility-link-content-block')
    );
    textCards.forEach(card => {
      // No image for these
      rows.push(extractCard(card, false));
    });
  }

  // Build and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
