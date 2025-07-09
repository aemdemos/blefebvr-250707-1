/* global WebImporter */
export default function parse(element, { document }) {
  // Fetch all direct card containers within the grid
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Each card is a row: first cell is the icon SVG, second cell is the descriptive text (as HTML)
  const rows = cardDivs.map(card => {
    // Find the icon/svg container (first .icon descendant)
    const iconWrapper = card.querySelector('.icon');
    let iconCell = null;
    if (iconWrapper) {
      // Use a reference to the actual SVG element (not a string)
      const svg = iconWrapper.querySelector('svg');
      if (svg) {
        iconCell = svg;
      } else {
        // If no SVG, fallback to the icon div itself
        iconCell = iconWrapper;
      }
    }
    // Find the text content (the <p> in each card)
    let textCell = null;
    const p = card.querySelector('p');
    if (p) {
      textCell = p;
    }
    // If both are missing, put empty cell (should never happen, but for robustness)
    return [iconCell || '', textCell || ''];
  });

  // Compose the header row as required (block name exactly)
  const tableRows = [
    ['Cards (cards18)'],
    ...rows
  ];

  // Create the table block using real DOM elements
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the newly created table block
  element.replaceWith(table);
}
