/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row for the cards block
  const rows = [['Cards (cards33)']];

  // Select all card containers (each with an image)
  const cardDivs = Array.from(element.querySelectorAll(':scope > .utility-aspect-1x1'));

  cardDivs.forEach((cardDiv) => {
    const img = cardDiv.querySelector('img');
    // The first cell: the existing image element
    const imgCell = img;
    // The second cell: text description from the image alt
    let textCell = '';
    if (img && img.alt && img.alt.trim()) {
      // Use the image's alt attribute for text content
      const p = document.createElement('p');
      p.textContent = img.alt;
      textCell = p;
    }
    rows.push([imgCell, textCell]);
  });

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
