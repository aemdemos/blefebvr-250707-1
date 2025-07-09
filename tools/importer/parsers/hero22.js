/* global WebImporter */

export default function parse(element, { document }) {
  // Helper: get immediate children
  const children = Array.from(element.querySelectorAll(':scope > .w-layout-grid, :scope > div, :scope > img, :scope > picture, :scope > section'));

  // Find the main grid container (containing image and text)
  let grid = children.find(child => child.classList && child.classList.contains('w-layout-grid'));
  if (!grid) grid = element; // fallback

  // Find the hero image (first img direct child of grid)
  let heroImg = null;
  // Only take as background image if it's not inside the text section
  let textSection = null;
  // Find a container with a heading (text panel)
  if (grid) {
    const divs = Array.from(grid.querySelectorAll(':scope > div'));
    textSection = divs.find(div => div.querySelector('h1, h2, h3'));
    // Fallback: any div with a heading
    if (!textSection) {
      textSection = Array.from(grid.querySelectorAll('div')).find(div => div.querySelector('h1, h2, h3'));
    }
  }
  if (!textSection) {
    textSection = element.querySelector('h1, h2, h3')?.closest('div');
  }

  // Find a grid-level img (direct child or immediate descendant)
  const gridImgs = Array.from(grid.querySelectorAll(':scope > img, :scope > div > img'));
  for (const img of gridImgs) {
    if (!textSection || !textSection.contains(img)) {
      heroImg = img;
      break;
    }
  }
  // Fallback: any img not inside text
  if (!heroImg) {
    const allImgs = Array.from(element.querySelectorAll('img'));
    heroImg = allImgs.find(img => !textSection || !textSection.contains(img));
  }
  // Fallback: empty (no bg image)

  // Compose text cell (headline, body, CTAs)
  const textParts = [];
  if (textSection) {
    // Headline: first h1/h2/h3 in textSection
    const headline = textSection.querySelector('h1, h2, h3');
    if (headline) textParts.push(headline);
    // Subheading: richtext, or first p in textSection
    let sub = textSection.querySelector('.rich-text, .w-richtext');
    if (!sub) sub = textSection.querySelector('p');
    if (sub) textParts.push(sub);
    // CTA(s): all .button-group a, or a.button not in a .button-group
    let ctas = Array.from(textSection.querySelectorAll('.button-group a'));
    if (ctas.length === 0) {
      ctas = Array.from(textSection.querySelectorAll('a.button'));
    }
    // Only add if visible (not empty)
    if (ctas.length > 0) {
      if (ctas.length === 1) {
        textParts.push(ctas[0]);
      } else {
        // Group multiple CTAs in a div
        const group = document.createElement('div');
        ctas.forEach(btn => group.appendChild(btn));
        textParts.push(group);
      }
    }
  }

  // Build table
  const headerRow = ['Hero (hero22)'];
  const rows = [headerRow];
  rows.push([heroImg ? heroImg : '']);
  // Text content as a fragment (as a single cell)
  if (textParts.length) {
    rows.push([textParts]);
  } else {
    rows.push(['']);
  }

  // Block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
