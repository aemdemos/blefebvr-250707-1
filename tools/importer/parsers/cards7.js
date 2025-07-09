/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Create block table header row
  const headerRow = ['Cards (cards7)'];

  // 2. Find all card links (direct children only)
  const cardLinks = Array.from(element.querySelectorAll(':scope > a.utility-link-content-block'));

  // 3. For each card, build a row: [image, text content]
  const rows = cardLinks.map(card => {
    // IMAGE CELL: reference the <img> element only (do not clone)
    const imageDiv = card.querySelector('.utility-aspect-2x3');
    let imageCell = '';
    if (imageDiv) {
      const img = imageDiv.querySelector('img');
      if (img) imageCell = img;
    }

    // TEXT CELL: reference the tag/date meta and heading (retain references, do not clone)
    const textCellFragments = [];
    
    // Tag & date meta
    const metaDiv = card.querySelector('.flex-horizontal');
    if (metaDiv) textCellFragments.push(metaDiv);

    // Card heading (as H3, always reference the heading element)
    const heading = card.querySelector('h3.h4-heading, h3, .h4-heading');
    if (heading) textCellFragments.push(heading);

    return [imageCell, textCellFragments];
  });

  // 4. Compose the table data with exact header
  const tableData = [headerRow, ...rows];

  // 5. Build the table using DOMUtils.createTable with references only
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}