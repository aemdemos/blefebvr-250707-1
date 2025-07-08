/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: EXACT match to example
  const headerRow = ['Hero (hero14)'];

  // The HTML structure:
  // <header>
  //   <div class="w-layout-grid">
  //     <div> ... BG image ... </div>
  //     <div> ... content ... </div>
  //   </div>
  // </header>

  // Defensive: Get the grid container
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get direct child divs of the grid
  const gridChildren = grid.querySelectorAll(':scope > div');
  if (gridChildren.length < 2) return;

  // First child: background image
  const bgDiv = gridChildren[0];
  // Try to get the prominent image
  const img = bgDiv.querySelector('img');
  const bgRow = [img ? img : ''];

  // Second child: content (container)
  const contentDiv = gridChildren[1];
  // Use the innermost container if present, or the div itself
  const container = contentDiv.querySelector('.container') || contentDiv;
  // The block's visible content is inside .utility-margin-bottom-6rem
  let mainContent = container.querySelector('.utility-margin-bottom-6rem') || container;
  // Compose the content cell: capture all children except empty .button-group
  const children = Array.from(mainContent.childNodes).filter(node => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      // Don't include empty .button-group
      if (node.classList.contains('button-group') && !node.hasChildNodes()) {
        return false;
      }
    } else if (node.nodeType === Node.TEXT_NODE) {
      // Exclude whitespace-only nodes
      if (!node.textContent.trim()) return false;
    }
    return true;
  });
  const contentRow = [children.length > 0 ? children : ''];

  // Compose table cell structure:[header, image, content]
  const cells = [headerRow, bgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace original element with the block table
  element.replaceWith(table);
}
