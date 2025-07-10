/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as a single cell, exactly matching the example
  const headerRow = ['Cards (cards8)'];

  // Get all card containers (immediate children)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each card, extract the image for the first cell; text cell is empty because no text is present in this HTML
  const rows = cardDivs.map(cardDiv => {
    const img = cardDiv.querySelector('img');
    return [img, ''];
  });

  // Compose the table structure
  const tableData = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(block);
}
