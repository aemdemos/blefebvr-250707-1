/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match example exactly
  const headerRow = ['Cards (cards10)'];

  // Get all top-level card anchors
  const cardLinks = Array.from(element.querySelectorAll(':scope > a.card-link'));

  // For each card, extract image and the text cell
  const rows = cardLinks.map(card => {
    // The first div contains the image
    const imgDiv = card.querySelector('.utility-aspect-3x2');
    // Use the existing <img> element, if present
    const img = imgDiv ? imgDiv.querySelector('img') : null;

    // The second div contains the text content
    const textDiv = card.querySelector('.utility-padding-all-1rem');
    
    // Compose a fragment for all text content
    const frag = document.createDocumentFragment();
    if (textDiv) {
      // Tag group (optional)
      const tagGroup = textDiv.querySelector('.tag-group');
      if (tagGroup) frag.appendChild(tagGroup);
      // Heading (optional)
      const heading = textDiv.querySelector('h3, .h4-heading');
      if (heading) frag.appendChild(heading);
      // Paragraph (optional)
      const para = textDiv.querySelector('p');
      if (para) frag.appendChild(para);
    }

    // Always keep two cells: [img, textFrag]
    return [img, frag];
  });

  // Compose the table: header row, then one row per card
  const tableArray = [headerRow, ...rows];

  // Create and insert the table
  const table = WebImporter.DOMUtils.createTable(tableArray, document);
  element.replaceWith(table);
}
