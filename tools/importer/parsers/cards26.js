/* global WebImporter */
export default function parse(element, { document }) {
  // Header row matches block name exactly
  const headerRow = ['Cards (cards26)'];
  const cardRows = [];

  // Find all direct card-like children by looking for a child div with an <img>
  const cards = Array.from(element.querySelectorAll(':scope > div')).filter(div => div.querySelector('img'));
  
  cards.forEach(card => {
    // Find the image (first img in the card)
    const img = card.querySelector('img');
    // Find the text block: prefer '.utility-padding-all-2rem', or the nearest div containing a heading
    let textBlock = card.querySelector('.utility-padding-all-2rem');
    if (!textBlock) {
      // fallback: look for the first heading or paragraph and get its parent
      const heading = card.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) {
        textBlock = heading.parentElement;
      } else {
        // fallback: just the card itself if no text block found
        textBlock = card;
      }
    }
    // For template consistency, if textBlock only contains the image (no heading or paragraph), create an empty div
    if (
      textBlock === card &&
      !card.querySelector('h1, h2, h3, h4, h5, h6') &&
      !card.querySelector('p')
    ) {
      textBlock = document.createElement('div');
    }
    cardRows.push([img, textBlock]);
  });

  const cells = [headerRow, ...cardRows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
