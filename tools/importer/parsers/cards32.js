/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards32) block: Header row and then one row per card, each with image and text content
  const headerRow = ['Cards (cards32)'];
  const rows = [headerRow];
  // Each direct child <a> in the grid is a card
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  cards.forEach(card => {
    // IMAGE: Find the first <img> within the card
    const image = card.querySelector('img');
    // TEXT: Find the second child <div> within the inner grid, which holds the text info
    // Structure:
    // <a>
    //   <div.grid-layout>
    //     <img>
    //     <div>...</div>
    //   </div>
    // </a>
    let mainGrid = card.querySelector('div.w-layout-grid');
    // Defensive: fallback to first grid layout div
    if (!mainGrid) {
      mainGrid = card.querySelector('div');
    }
    let textCol = null;
    if (mainGrid) {
      // The text column is the second child div (skip the img)
      // Gather the divs directly under the grid
      const gridChildren = Array.from(mainGrid.children);
      // Assume first child is img, second child is a div with all text
      textCol = gridChildren.find(el => el.tagName === 'DIV' && el.querySelector('h3'));
      // fallback: just get the second child div
      if (!textCol) {
        textCol = gridChildren.find((el, i) => el.tagName === 'DIV' && i !== 0) || null;
      }
    }
    // Defensive fallback
    if (!textCol) {
      textCol = document.createElement('div');
    }
    // Remove the last div if it contains only 'Read' (as CTA, already implied by card link)
    const lastDiv = textCol.lastElementChild;
    if (lastDiv && lastDiv.tagName === 'DIV' && lastDiv.textContent.trim().toLowerCase() === 'read') {
      lastDiv.remove();
    }
    // Reference existing elements (do NOT clone)
    rows.push([image, textCol]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
