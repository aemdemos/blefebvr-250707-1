/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure we only process non-empty elements
  if (!element) return;
  // Find all top-level grid card containers (direct children)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));
  // Compose each card row: [image, ''] (no text content present in the HTML)
  const cardRows = cardDivs
    .map(div => {
      const img = div.querySelector('img');
      // Only process if <img> exists
      if (img) {
        return [img, ''];
      }
      return null;
    })
    .filter(Boolean);
  // Table header per block guidelines
  const headerRow = ['Cards (cards6)'];
  // Build table: header + card rows
  const tableData = [headerRow, ...cardRows];
  // Create table using provided utility
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  // Replace the source element with the new table
  element.replaceWith(table);
}
