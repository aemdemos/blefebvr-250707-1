/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find main grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // 2. Find the prominent image (background/side visual)
  let heroImage = null;
  heroImage = grid.querySelector('img.cover-image');
  if (!heroImage) {
    heroImage = grid.querySelector('img');
  }

  // 3. Find the main text container (headline, subheading, CTAs)
  let textBlock = null;
  for (const child of grid.children) {
    if (
      child.nodeType === 1 &&
      child.tagName === 'DIV' &&
      child.querySelector('h1')
    ) {
      textBlock = child;
      break;
    }
  }
  if (!textBlock) {
    for (const child of grid.children) {
      if (child.nodeType === 1 && child.tagName === 'DIV' && !child.querySelector('img')) {
        textBlock = child;
        break;
      }
    }
  }

  // --- Compose a single block of text content, including all headings, paragraphs, and CTAs
  let textCell = '';
  if (textBlock) {
    // Collect all children that are h1, h2, h3, p, a, .button-group
    const bits = [];
    // Headline (h1)
    const h1 = textBlock.querySelector('h1');
    if (h1) bits.push(h1.outerHTML);
    // Subheading (first .subheading or first p not inside a button group)
    let subheading = textBlock.querySelector('p.subheading');
    if (!subheading) {
      // fallback: first p not in .button-group
      subheading = Array.from(textBlock.querySelectorAll('p')).find(p => !p.closest('.button-group'));
    }
    if (subheading) bits.push(subheading.outerHTML);
    // CTAs (all direct links in .button-group)
    const buttonGroup = textBlock.querySelector('.button-group');
    if (buttonGroup) {
      buttonGroup.querySelectorAll('a').forEach(a => bits.push(a.outerHTML));
    } else {
      // Fallback: any direct a elements not inside .button-group
      Array.from(textBlock.querySelectorAll('a')).filter(a => !a.closest('.button-group')).forEach(a => bits.push(a.outerHTML));
    }
    // Join as a single cell, preserving block structure
    textCell = bits.join('\n');
    // If still empty fallback to textBlock outerHTML
    if (!textCell.trim()) textCell = textBlock.outerHTML;
  }

  // ---
  // Compose the hero15 block table
  const headerRow = ['Hero (hero15)'];
  const imageRow = [heroImage || ''];
  const textRow = [textCell || ''];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    textRow
  ], document);
  element.replaceWith(table);
}
