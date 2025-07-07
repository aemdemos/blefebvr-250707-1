/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Set up header row as required
  const headerRow = ['Cards (cards35)'];
  // 2. Get all direct card links (each card is a link <a>)
  const cards = Array.from(element.querySelectorAll(':scope > a.utility-link-content-block'));
  const rows = cards.map(card => {
    // Get the inner grid div (which has image and content)
    const grid = card.querySelector(':scope > div');
    if (!grid) return [document.createTextNode(''), document.createTextNode('')];
    // The first child is the image, the second is the text content
    let img = grid.querySelector('img');
    // Find the text container (should be the div after the img)
    let textDiv;
    const gridChildren = Array.from(grid.children);
    for (let i = 0; i < gridChildren.length; i++) {
      if (gridChildren[i].tagName !== 'IMG') {
        textDiv = gridChildren[i];
        break;
      }
    }
    // Fallback: if not found, use the second child
    if (!textDiv && gridChildren.length > 1) {
      textDiv = gridChildren[1];
    }
    // Defensive: if textDiv is missing, provide empty cell
    if (!textDiv) {
      return [img || document.createTextNode(''), document.createTextNode('')];
    }
    // Remove the "Read" CTA at the very bottom if present
    const lastChild = textDiv.lastElementChild;
    if (lastChild && lastChild.textContent && lastChild.textContent.trim().toLowerCase() === 'read') {
      textDiv.removeChild(lastChild);
    }
    // Extract tag + min read row (usually first child, flex-horizontal)
    const flexMeta = textDiv.querySelector('.flex-horizontal');
    // Extract heading
    const heading = textDiv.querySelector('h3, h4, .h4-heading');
    // Extract description/paragraph
    const desc = textDiv.querySelector('p');
    // Compose text cell
    const cellFragments = [];
    if (flexMeta) cellFragments.push(flexMeta);
    if (heading) cellFragments.push(heading);
    if (desc) cellFragments.push(desc);
    return [img, cellFragments];
  });
  // Compose the 2d array for the table
  const tableData = [headerRow, ...rows];
  // Create the table block
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  // Replace original element
  element.replaceWith(table);
}
