/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid that holds the cards
  let grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Support: Cards may be in direct children or nested grid columns
  let cardLinks = Array.from(grid.querySelectorAll(':scope > a.utility-link-content-block, :scope > div.grid-layout > a.utility-link-content-block'));

  // Defensive: filter out any non-card nodes (they must have an image and some text)
  cardLinks = cardLinks.filter(card => {
    const hasImg = card.querySelector('img');
    const hasText = card.querySelector('h2, h3, h4, h5, h6, p');
    return hasImg && hasText;
  });

  const cells = [];
  // Header, exactly as in the example
  cells.push(['Cards (cards39)']);

  cardLinks.forEach(card => {
    // IMAGE CELL
    let imgDiv = card.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    let img = imgDiv ? imgDiv.querySelector('img') : card.querySelector('img');
    let imgCell = imgDiv || img;

    // TEXT CELL
    // If text is wrapped, preserve that container for spacing & order
    let textContainer = card.querySelector('.utility-padding-all-2rem') || card;
    // Get heading (keep first heading under textContainer)
    let heading = textContainer.querySelector('h2, h3, h4, h5, h6');
    // Get paragraph (first)
    let para = textContainer.querySelector('p');
    // Get CTA button (may be .button, button, or .utility-link)
    let cta = textContainer.querySelector('.button, button, .utility-link');
    // Compose text cell content in correct order, referencing existing elements only
    const textCell = [];
    if (heading) textCell.push(heading);
    if (para) textCell.push(para);
    if (cta) textCell.push(cta);
    cells.push([imgCell, textCell]);
  });

  // Create and replace block
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
