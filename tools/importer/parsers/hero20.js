/* global WebImporter */

export default function parse(element, { document }) {
  // Find the card-body for image and heading
  const cardBody = element.querySelector('.card-body');
  let image = null;
  let heading = null;

  if (cardBody) {
    image = cardBody.querySelector('img');
    heading = cardBody.querySelector('.h4-heading');
  }
  // Defensive fallback if .card-body not found
  if (!image) {
    image = element.querySelector('img');
  }
  if (!heading) {
    heading = element.querySelector('h1, h2, h3, h4, h5, h6, .h4-heading, .heading');
  }

  // Prepare rows
  const headerRow = ['Hero (hero20)'];
  const imageRow = [image ? image : '']; // Use the existing element reference

  // Only include heading if it has text
  const fragment = document.createElement('div');
  if (heading && heading.textContent.trim()) {
    fragment.appendChild(heading);
  }
  const contentRow = [fragment.childNodes.length ? fragment : ''];

  const rows = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
