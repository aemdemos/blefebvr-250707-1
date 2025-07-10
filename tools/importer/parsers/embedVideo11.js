/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per block name
  const headerRow = ['Embed'];

  // Collect all images (as in the HTML, each direct child div holds one img)
  const imageDivs = Array.from(element.querySelectorAll(':scope > div'));
  const images = imageDivs.map(div => div.querySelector('img')).filter(Boolean);

  // If there are no images, cell should be empty
  let cellContent;
  if (images.length === 0) {
    cellContent = '';
  } else if (images.length === 1) {
    cellContent = images[0];
  } else {
    // Multiple images: all in order, stacked vertically
    const frag = document.createDocumentFragment();
    images.forEach(img => frag.appendChild(img));
    cellContent = frag;
  }

  const cells = [
    headerRow,
    [cellContent]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}