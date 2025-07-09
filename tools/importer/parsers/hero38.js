/* global WebImporter */
export default function parse(element, { document }) {
  // Find the outer grid
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Find background image (block-level background)
  let imageEl = null;
  for (const child of gridChildren) {
    const img = child.querySelector('img.cover-image');
    if (img) {
      imageEl = img;
      break;
    }
  }
  // Defensive fallback (should not trigger)
  if (!imageEl) imageEl = element.querySelector('img');

  // Find the text column (contains h1)
  let textCol = null;
  for (const child of gridChildren) {
    if (child.querySelector('h1')) {
      textCol = child;
      break;
    }
  }
  if (!textCol) textCol = element; // fallback

  // Compose text cell contents, preserving semantics
  const textParts = [];
  // Headline
  const headline = textCol.querySelector('h1');
  if (headline) textParts.push(headline);
  // Subheading
  const subheading = textCol.querySelector('p');
  if (subheading) textParts.push(subheading);
  // CTA button: look for an <a> in .button-group (reference, do not clone)
  let cta = null;
  const buttonGroup = textCol.querySelector('.button-group');
  if (buttonGroup) {
    cta = buttonGroup.querySelector('a, button');
  } else {
    cta = textCol.querySelector('a.w-button, button');
  }
  if (cta) textParts.push(cta);
  let textCell = textParts.length === 1 ? textParts[0] : textParts;

  // Table rows
  const headerRow = ['Hero (hero38)'];
  const backgroundRow = [imageEl ? imageEl : ''];
  const contentRow = [textCell];
  const cells = [headerRow, backgroundRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
