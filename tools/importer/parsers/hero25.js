/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero25)'];

  // 2. Find the background image (should be a prominent <img> in the grid)
  let image = null;
  // Try to locate an <img> that is a direct or indirect child, but not inside a button or link
  // The most likely candidate is the last direct child of the largest grid
  const outerGrid = element.querySelector(':scope > .w-layout-grid');
  if (outerGrid) {
    // Look for the first <img> in the outer grid
    image = outerGrid.querySelector('img');
  }
  if (!image) {
    // fallback: any img in the section
    image = element.querySelector('img');
  }
  const imgRow = [image ? image : ''];

  // 3. Find the text block (headline, paragraph, CTAs)
  // It's the deepest .section in the nested grid, with h2, .rich-text, .button-group
  let contentBlock = null;
  if (outerGrid) {
    // This grid contains a content grid (first div), which contains a section
    const nestedGrid = outerGrid.querySelector('.w-layout-grid');
    if (nestedGrid) {
      contentBlock = nestedGrid.querySelector('.section');
    }
  }
  if (!contentBlock) {
    // fallback: first .section
    contentBlock = element.querySelector('.section');
  }

  let contentParts = [];
  if (contentBlock) {
    // Headline: get h1/h2/h3 as the heading
    const headline = contentBlock.querySelector('h1, h2, h3');
    if (headline) contentParts.push(headline);
    // Paragraph(s): all <p> in .rich-text
    const richText = contentBlock.querySelector('.rich-text');
    if (richText) {
      Array.from(richText.querySelectorAll('p')).forEach(p => contentParts.push(p));
    } else {
      // fallback: all <p> in section
      Array.from(contentBlock.querySelectorAll('p')).forEach(p => contentParts.push(p));
    }
    // Button(s): CTA links (usually in .button-group, fallback to a.button)
    const buttonGroup = contentBlock.querySelector('.button-group');
    if (buttonGroup) {
      Array.from(buttonGroup.children).forEach(btn => contentParts.push(btn));
    } else {
      const buttons = contentBlock.querySelectorAll('a.button');
      buttons.forEach(btn => contentParts.push(btn));
    }
  }
  const contentRow = [contentParts];

  // 4. Combine into a table: 3 rows, 1 col (header, image, content)
  const cells = [
    headerRow,
    imgRow,
    contentRow
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
