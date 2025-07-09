/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Find background image (should be the absolutely positioned cover-image)
  let backgroundImg = null;
  const imgCandidates = element.querySelectorAll('img');
  for (const img of imgCandidates) {
    if (
      img.classList.contains('cover-image') &&
      img.classList.contains('utility-position-absolute')
    ) {
      backgroundImg = img; // Reference the actual image element
      break;
    }
  }

  // Step 2: Find the main content column (contains h2, feature rows, button)
  let mainTextSection = null;
  const cardBody = element.querySelector('.card-body');
  if (cardBody) {
    // There are 2 columns in the grid; pick the one with the h2
    const columns = cardBody.querySelectorAll(
      '.w-layout-grid.grid-layout.desktop-3-column.tablet-1-column.grid-gap-md > div'
    );
    for (const col of columns) {
      if (col.querySelector('h2')) {
        mainTextSection = col;
        break;
      }
    }
  }

  // Step 3: Compose the content cell
  const contentParts = [];
  // (a) Heading (h2)
  if (mainTextSection) {
    const h2 = mainTextSection.querySelector('h2');
    if (h2) contentParts.push(h2);
  }
  // (b) Feature list (as paragraphs, in order)
  if (mainTextSection) {
    const featuresContainer = mainTextSection.querySelector('.flex-vertical.flex-gap-xs');
    if (featuresContainer) {
      const rows = featuresContainer.querySelectorAll('.flex-horizontal.flex-gap-xxs');
      for (const row of rows) {
        // Only include the text, not the icon
        const p = row.querySelector('p');
        if (p) contentParts.push(p);
      }
    }
  }
  // (c) Button / CTA
  if (mainTextSection) {
    const button = mainTextSection.querySelector(
      '.button-group a, .button-group button, a.button, button.button'
    );
    if (button) contentParts.push(button);
  }

  // Step 4: Assemble the table
  const headerRow = ['Hero (hero12)'];
  const secondRow = [backgroundImg ? backgroundImg : ''];
  const thirdRow = [contentParts];

  const rows = [headerRow, secondRow, thirdRow];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
