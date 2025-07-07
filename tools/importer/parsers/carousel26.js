/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match example exactly
  const headerRow = ['Carousel (carousel26)'];

  // Find the main card slide container(s):
  // In this HTML, there's only one slide, nested deeply
  let img = null;
  let textContent = [];

  // Find '.card-body' (holds both image and heading)
  const cardBody = element.querySelector('.card-body');
  if (cardBody) {
    img = cardBody.querySelector('img');
    // Find heading (if any)
    const heading = cardBody.querySelector('.h4-heading');
    if (heading) {
      textContent.push(heading);
    }
    // (No description or CTA found in this HTML)
  }

  // Defensive: fallback to find img or heading if .card-body is missing
  if (!img) img = element.querySelector('img');
  if (textContent.length === 0) {
    const fallbackHeading = element.querySelector('.h4-heading');
    if (fallbackHeading) textContent.push(fallbackHeading);
  }

  // Edge case: allow empty text cell if there's genuinely no text
  const slideRow = [img, textContent.length ? textContent : ''];

  // Build the block table
  const cells = [headerRow, slideRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
