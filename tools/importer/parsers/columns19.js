/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get all direct child divs (non-empty)
  function getChildDivs(parent) {
    return Array.from(parent.children).filter(c => c.tagName === 'DIV');
  }

  // Find the grid-layout (section's first child)
  const sectionGrid = getChildDivs(element)[0];
  if (!sectionGrid) return;
  const gridDivs = getChildDivs(sectionGrid);

  // The first column: the image grid (within scale container)
  let imagesContainer = null;
  if (gridDivs[0]) {
    // .ix-hero-scale-3x-to-1x contains the images
    const ixHeroDiv = gridDivs[0].querySelector('.ix-hero-scale-3x-to-1x');
    if (ixHeroDiv) {
      const gridColImgs = ixHeroDiv.querySelector('.grid-layout.desktop-3-column');
      if (gridColImgs) imagesContainer = gridColImgs;
    }
  }

  // The second column: content overlay (text/buttons)
  let contentContainer = null;
  if (gridDivs[1]) {
    contentContainer = gridDivs[1].querySelector('.container');
  }

  // Defensive handling if containers are missing
  if (!imagesContainer && !contentContainer) return;

  // Table header as specified
  const headerRow = ['Columns (columns19)'];
  const row = [imagesContainer, contentContainer];
  const cells = [headerRow, row];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
