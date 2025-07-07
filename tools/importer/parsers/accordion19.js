/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row with the correct block name
  const headerRow = ['Accordion (accordion19)'];
  const rows = [headerRow];
  // Each accordion item is a direct child .accordion.w-dropdown
  const items = Array.from(element.querySelectorAll(':scope > .accordion.w-dropdown'));
  items.forEach((item) => {
    // Title: .w-dropdown-toggle > .paragraph-lg (if exists), else fallback to .w-dropdown-toggle
    let title = null;
    const toggle = item.querySelector('.w-dropdown-toggle');
    if (toggle) {
      // Prefer the .paragraph-lg for title, fallback to the toggle if not present
      title = toggle.querySelector('.paragraph-lg') || toggle;
    }
    // Content: .accordion-content .w-richtext (if exists), else all accordion-content
    let contentCell = null;
    const content = item.querySelector('.accordion-content');
    if (content) {
      // Use .w-richtext if present, else the entire content block
      const rich = content.querySelector('.w-richtext');
      contentCell = rich || content;
    }
    // Ensure we always add the correct number of cells per row
    rows.push([
      title,
      contentCell
    ]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
