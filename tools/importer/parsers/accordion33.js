/* global WebImporter */

export default function parse(element, { document }) {
  // Find all immediate accordion dropdowns (do not select nested)
  const accordions = Array.from(element.querySelectorAll(':scope > .accordion.w-dropdown'));

  // Compose rows: header first
  const rows = [
    ['Accordion (accordion33)']
  ];

  accordions.forEach(accordion => {
    // TITLE: always use the .w-dropdown-toggle > .paragraph-lg
    const toggle = accordion.querySelector('.w-dropdown-toggle');
    let titleCell = null;
    if (toggle) {
      // Only get the label, not icons
      const para = toggle.querySelector('.paragraph-lg');
      if (para) {
        titleCell = para;
      } else {
        // fallback, but should not happen
        titleCell = toggle;
      }
    }

    // CONTENT: use w-dropdown-list > .w-richtext if present; otherwise, the full dropdown-list
    const nav = accordion.querySelector('.w-dropdown-list');
    let contentCell = null;
    if (nav) {
      const rich = nav.querySelector('.w-richtext');
      if (rich) {
        contentCell = rich;
      } else {
        contentCell = nav;
      }
    }

    // Only push row if both cells are found
    if (titleCell && contentCell) {
      rows.push([titleCell, contentCell]);
    }
  });

  // Make the table, referencing DOM elements (not clones or text)
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
