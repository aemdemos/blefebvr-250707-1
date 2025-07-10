/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: extract all cards within a grid
  function getCardsFromGrid(grid) {
    const cardLinks = Array.from(grid.querySelectorAll(':scope > a'));
    return cardLinks.map((a) => {
      // Image cell: look for first <img> anywhere inside the <a>
      const img = a.querySelector('img');
      const imageCell = img || '';
      // Text cell: gather everything in the anchor that's not the image wrapper
      // We want all children except the image wrapper (usually contains the img)
      let textCellContent = [];
      a.childNodes.forEach((node) => {
        // Element node
        if (node.nodeType === 1) {
          // If this element (or descendants) contains an <img>, skip it
          if (node.querySelector && node.querySelector('img')) return;
          // Otherwise, it's text content (heading, description, CTAs, etc)
          textCellContent.push(node);
        } else if (node.nodeType === 3) { // Text node
          if (node.textContent.trim()) {
            textCellContent.push(document.createTextNode(node.textContent));
          }
        }
      });
      // Remove empty nodes
      textCellContent = textCellContent.filter(n => {
        if (typeof n === 'string') return n.trim();
        if (n.nodeType === 3) return n.textContent.trim();
        if (n.nodeType === 1) return n.textContent.trim().length > 0;
        return n;
      });
      // If text cell is empty, use empty string
      return [imageCell, textCellContent.length ? textCellContent : ''];
    });
  }

  // Find the currently-active tab or use the first
  let activeTab = element.querySelector('.w-tab-pane.w--tab-active') || element.querySelector('.w-tab-pane');
  if (!activeTab) return;
  // Find the grid inside the tab
  let grid = activeTab.querySelector('.w-layout-grid');
  if (!grid) return;

  // Build table: header + all card rows
  const rows = [['Cards (cards22)']];
  const cards = getCardsFromGrid(grid);
  cards.forEach(card => rows.push(card));

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
