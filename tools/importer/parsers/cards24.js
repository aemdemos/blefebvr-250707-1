/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row
  const headerRow = ['Cards (cards24)'];
  const rows = [headerRow];

  // Select all card anchor elements directly under the grid
  const cards = element.querySelectorAll(':scope > a');
  cards.forEach((card) => {
    // Left cell: image (first <img> in the .utility-aspect-2x3 container)
    let imageEl = null;
    const imgContainer = card.querySelector('.utility-aspect-2x3');
    if (imgContainer) {
      imageEl = imgContainer.querySelector('img');
    }

    // Right cell: text content
    // Get meta block (tag + date) and heading
    const metaDiv = card.querySelector('.flex-horizontal');
    const heading = card.querySelector('h3, h4, h5, h6');
    // Compose right cell content
    const rightCellContent = [];
    if (metaDiv) rightCellContent.push(metaDiv);
    if (heading) rightCellContent.push(heading);
    if (rightCellContent.length === 0) rightCellContent.push(''); // fallback
    
    // Insert the row
    rows.push([
      imageEl || '',
      rightCellContent.length === 1 ? rightCellContent[0] : rightCellContent,
    ]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
