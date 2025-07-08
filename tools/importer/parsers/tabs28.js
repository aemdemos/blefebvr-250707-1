/* global WebImporter */
export default function parse(element, { document }) {
  // The Tabs block expects: header row with one cell ("Tabs"),
  // followed by rows with two cells (label, content)

  // 1. Extract tab menu links (labels)
  const tabLinks = Array.from(element.querySelectorAll(':scope > a'));

  // 2. For each tab link, extract the label element (typically a div inside <a>),
  // and leave the content cell empty as content isn't present in the provided HTML
  const tabRows = tabLinks.map((link) => {
    let labelElement = link.firstElementChild || link;
    return [labelElement, ''];
  });

  // 3. Compose table: first row is ["Tabs"], following table structure (1 column);
  // all data rows are 2 columns (label, content)
  // This is correct and matches the example: header row is single cell, data rows are two cells
  const cells = [
    ['Tabs'],
    ...tabRows
  ];

  // 4. Generate and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
