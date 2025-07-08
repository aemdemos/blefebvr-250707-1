/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to gather card [image, text array]
  function buildCardRow(imgElem, textElems) {
    return [imgElem || '', textElems];
  }

  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  // Find the grid layout inside the section
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const children = Array.from(grid.children);

  // 1st child: main large card on the left
  const mainCard = children[0]?.tagName === 'A' ? children[0] : null;
  if (mainCard) {
    const img = mainCard.querySelector('div[class*="utility-aspect"] img');
    const tag = mainCard.querySelector('.tag-group');
    const heading = mainCard.querySelector('h2, h3, h4, h5, h6');
    const desc = mainCard.querySelector('p');
    const textParts = [];
    if (tag) textParts.push(tag);
    if (heading) textParts.push(heading);
    if (desc) textParts.push(desc);
    rows.push(buildCardRow(img, textParts));
  }

  // 2nd child: group with 2 vertical cards having images
  const twoCardGroup = children[1]?.classList?.contains('flex-horizontal') ? children[1] : null;
  if (twoCardGroup) {
    const cardLinks = twoCardGroup.querySelectorAll(':scope > a.utility-link-content-block');
    cardLinks.forEach(card => {
      const img = card.querySelector('div[class*="utility-aspect"] img');
      const tag = card.querySelector('.tag-group');
      const heading = card.querySelector('h2, h3, h4, h5, h6');
      const desc = card.querySelector('p');
      const textParts = [];
      if (tag) textParts.push(tag);
      if (heading) textParts.push(heading);
      if (desc) textParts.push(desc);
      rows.push(buildCardRow(img, textParts));
    });
  }

  // 3rd child: group with text-only cards separated by dividers
  const textCardGroup = children[2]?.classList?.contains('flex-horizontal') ? children[2] : null;
  if (textCardGroup) {
    // Only pick <a> direct children (skip dividers)
    const cardLinks = textCardGroup.querySelectorAll(':scope > a.utility-link-content-block');
    cardLinks.forEach(card => {
      const heading = card.querySelector('h2, h3, h4, h5, h6');
      const desc = card.querySelector('p');
      const textParts = [];
      if (heading) textParts.push(heading);
      if (desc) textParts.push(desc);
      rows.push(['', textParts]);
    });
  }

  // Replace element with table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
