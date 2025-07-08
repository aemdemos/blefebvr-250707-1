/* global WebImporter */
export default function parse(element, { document }) {
  // Table header, matching the block/component name exactly
  const headerRow = ['Hero (hero7)'];

  // Second row: background image (none in provided HTML)
  const bgRow = [''];

  // Third row: Heading, subheading, CTA
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get all immediate children of grid layout
  const children = Array.from(grid.children);

  // The heading (usually h2)
  const heading = children.find(el => /^H[1-6]$/.test(el.tagName));
  // The div with paragraph and CTA button
  const textCtaDiv = children.find(el => el !== heading);

  // Gather content in correct order
  const contentArr = [];
  if (heading) contentArr.push(heading);
  if (textCtaDiv) {
    // Add all child elements of textCtaDiv (e.g. paragraph and CTA button)
    contentArr.push(...Array.from(textCtaDiv.children));
  }

  // Third row: everything in a single cell
  const contentRow = [contentArr];

  // Assemble the table rows
  const cells = [headerRow, bgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
