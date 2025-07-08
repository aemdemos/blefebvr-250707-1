/* global WebImporter */
export default function parse(element, { document }) {
  // Find all immediate children that are accordions
  const accordions = Array.from(element.querySelectorAll(':scope > .accordion'));
  const rows = [];
  // Header row as per spec
  rows.push(['Accordion (accordion18)']);

  accordions.forEach((acc) => {
    // Title cell: from the .w-dropdown-toggle > .paragraph-lg (or fallback to toggle itself)
    const toggle = acc.querySelector('.w-dropdown-toggle');
    let titleEl = null;
    if (toggle) {
      titleEl = toggle.querySelector('.paragraph-lg') || toggle;
    }
    // Content cell: from .accordion-content .rich-text, or fallback to .accordion-content
    const contentNav = acc.querySelector('.accordion-content');
    let contentEl = null;
    if (contentNav) {
      const rich = contentNav.querySelector('.rich-text');
      if (rich) {
        contentEl = rich;
      } else {
        contentEl = contentNav;
      }
    }
    // Only add row if both title and content exist
    if (titleEl && contentEl) {
      rows.push([titleEl, contentEl]);
    }
  });

  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
  // If no accordions/items, do nothing (don't replace element)
}
