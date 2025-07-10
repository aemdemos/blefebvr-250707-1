/* global WebImporter */
export default function parse(element, { document }) {
  // Header row exactly as required
  const headerRow = ['Accordion'];

  // Select all direct accordion panels
  const accordions = Array.from(element.querySelectorAll(':scope > .accordion'));

  const rows = accordions.map(acc => {
    // Title: .w-dropdown-toggle > .paragraph-lg (preferred), or whole toggle if not found
    let title = '';
    const toggle = acc.querySelector('.w-dropdown-toggle');
    if (toggle) {
      const paragraph = toggle.querySelector('.paragraph-lg');
      title = paragraph ? paragraph : toggle;
    }
    // Content: nav.accordion-content > (first child div) > .w-richtext if present, else the inner div, else nav
    let content = '';
    const nav = acc.querySelector('nav.accordion-content');
    if (nav) {
      const innerDiv = nav.querySelector(':scope > div');
      if (innerDiv && innerDiv.children.length === 1 && innerDiv.firstElementChild.classList.contains('w-richtext')) {
        content = innerDiv.firstElementChild;
      } else if (innerDiv) {
        content = innerDiv;
      } else {
        content = nav;
      }
    }
    return [title, content];
  });

  // Create and replace table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  element.replaceWith(table);
}
