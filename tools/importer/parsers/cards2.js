/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to assemble the text column for a card
  function getTextContent(cardLink) {
    // Gather tag, heading, and paragraph (in order)
    const items = [];
    const tagGroup = Array.from(cardLink.children).find(el => el.classList && el.classList.contains('tag-group'));
    if (tagGroup) items.push(tagGroup);
    const heading = Array.from(cardLink.children).find(el => (/^H[1-6]$/).test(el.tagName));
    if (heading) items.push(heading);
    const para = Array.from(cardLink.children).find(el => el.tagName === 'P');
    if (para) items.push(para);
    return items;
  }

  // Find the main grid
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  const rows = [];
  rows.push(['Cards (cards2)']);
  if (!grid) {
    // No grid, nothing to do
    element.replaceWith(WebImporter.DOMUtils.createTable(rows, document));
    return;
  }

  // The structure is:
  //   - First child: main big card (large image, tag, h3, p)
  //   - Second child: flex with 2 cards (both have image, tag, h3, p)
  //   - Third child: flex with only text-based cards (just h3, p)
  const gridChildren = Array.from(grid.children);

  // 1st card: large card, has image
  const firstCard = gridChildren[0];
  if (firstCard && firstCard.tagName === 'A') {
    const imgDiv = firstCard.querySelector('div.utility-aspect-1x1, div.utility-aspect-3x2');
    let img = imgDiv ? imgDiv.querySelector('img') : null;
    img = img || firstCard.querySelector('img');
    const textCol = getTextContent(firstCard);
    rows.push([img, textCol]);
  }

  // 2nd group: two cards with images
  const secondGroup = gridChildren[1];
  if (secondGroup && secondGroup.classList.contains('flex-horizontal')) {
    const links = Array.from(secondGroup.querySelectorAll(':scope > a.utility-link-content-block'));
    links.forEach(link => {
      // Find image in card
      let imgDiv = link.querySelector('div.utility-aspect-1x1, div.utility-aspect-3x2');
      let img = imgDiv ? imgDiv.querySelector('img') : null;
      img = img || link.querySelector('img');
      const textCol = getTextContent(link);
      rows.push([img, textCol]);
    });
  }

  // 3rd group: text-only cards
  const thirdGroup = gridChildren[2];
  if (thirdGroup && thirdGroup.classList.contains('flex-horizontal')) {
    const links = Array.from(thirdGroup.querySelectorAll(':scope > a.utility-link-content-block'));
    links.forEach(link => {
      const textCol = getTextContent(link);
      rows.push(['', textCol]);
    });
  }

  // Build the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
