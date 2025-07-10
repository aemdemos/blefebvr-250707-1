/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid inside the section
  const rootGrid = element.querySelector(':scope > div > div.grid-layout');
  if (!rootGrid) return;

  // Get the first (large) card on the left, and the right inner grid
  const gridChildren = Array.from(rootGrid.children);
  // The first card is always an anchor (a.utility-link-content-block)
  let firstCard = null;
  let rightGrid = null;
  for (const child of gridChildren) {
    if (child.matches('a.utility-link-content-block')) {
      firstCard = child;
    } else if (child.matches('div.grid-layout')) {
      rightGrid = child;
    }
  }

  const cards = [];

  // Helper function to get image and text content from a card
  function getCardCells(cardEl) {
    // Find image
    let img = cardEl.querySelector('img');
    // Find heading (h2, h3, h4)
    let heading = cardEl.querySelector('h1, h2, h3, h4, h5, h6');
    // Find paragraphs
    const paragraphs = Array.from(cardEl.querySelectorAll('p'));
    // Find CTA (button or .button)
    let cta = cardEl.querySelector('.button, a.button');
    // Build text content fragment
    const textContent = document.createDocumentFragment();
    if (heading) textContent.appendChild(heading);
    paragraphs.forEach(p => textContent.appendChild(p));
    if (cta) textContent.appendChild(cta);
    // If no heading/paragraphs/cta, fallback to all text nodes
    if (!heading && paragraphs.length === 0 && !cta) {
      Array.from(cardEl.childNodes).forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          textContent.appendChild(node);
        }
      });
    }
    return [img, textContent];
  }

  // Process first card
  if (firstCard) {
    cards.push(getCardCells(firstCard));
  }

  // Process right grid cards
  if (rightGrid) {
    const rightCards = Array.from(rightGrid.querySelectorAll(':scope > a.utility-link-content-block'));
    rightCards.forEach(card => {
      cards.push(getCardCells(card));
    });
  }

  // Compose the table as per spec
  const cells = [
    ['Cards (cards36)'],
    ...cards
  ];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
