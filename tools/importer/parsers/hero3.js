/* global WebImporter */

export default function parse(element, { document }) {
  // --- Find background image (first <img> inside the first grid cell) ---
  const bgCell = element.querySelector('.utility-position-relative.utility-min-height-100dvh');
  let bgImg = null;
  if (bgCell) {
    bgImg = bgCell.querySelector('img'); // reference the <img> element directly
  }

  // --- Find the card containing text content ---
  let card = element.querySelector('.card-on-inverse');
  // Defensive: fallback to .card if .card-on-inverse not found
  if (!card) card = element.querySelector('.card');

  // --- Build the block table ---
  // CRITICAL: header row must match target block name exactly
  const headerRow = ['Hero (hero3)'];
  // Second row: background image element as-is (not a string)
  const bgRow = [bgImg ? bgImg : ''];
  // Third row: reference card element, not clone or string
  const textRow = [card ? card : ''];

  const rows = [headerRow, bgRow, textRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
