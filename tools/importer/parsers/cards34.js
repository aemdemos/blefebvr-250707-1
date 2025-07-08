/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row as in the example
  const headerRow = ['Cards (cards34)'];

  // Select all card anchor elements (each card)
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));

  const rows = cardLinks.map((card) => {
    // First cell: the image in the card
    const img = card.querySelector('img');

    // Second cell: assemble content (meta, heading, description, CTA) in order
    const infoDiv = card.querySelector('img + div');
    const contentFrag = document.createDocumentFragment();

    // Meta (tag and read time) -- both are inside the same flex-horizontal div
    const meta = infoDiv ? infoDiv.querySelector('.flex-horizontal') : null;
    if (meta) contentFrag.appendChild(meta);

    // Card heading (h3 or .h4-heading)
    const heading = infoDiv ? infoDiv.querySelector('h3, .h4-heading') : null;
    if (heading) contentFrag.appendChild(heading);

    // Description paragraph
    const desc = infoDiv ? infoDiv.querySelector('p') : null;
    if (desc) contentFrag.appendChild(desc);

    // CTA: look for the last div (after desc) whose text is 'Read'.
    // In this HTML, it is a div with textContent 'Read' after the paragraph
    if (infoDiv) {
      // Find all divs after the paragraph
      const para = infoDiv.querySelector('p');
      let cta = null;
      if (para) {
        let sibling = para.nextElementSibling;
        while (sibling) {
          if (sibling.tagName.toLowerCase() === 'div' && sibling.textContent.trim().toLowerCase() === 'read') {
            cta = sibling;
            break;
          }
          sibling = sibling.nextElementSibling;
        }
      }
      if (cta) contentFrag.appendChild(cta);
    }

    return [img, contentFrag];
  });

  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
