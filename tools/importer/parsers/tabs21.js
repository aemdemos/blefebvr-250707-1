/* global WebImporter */
export default function parse(element, { document }) {
  // Find the tab menu and content sections
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabContent = element.querySelector('.w-tab-content');
  if (!tabMenu || !tabContent) return;

  // Get all tab label anchors (in order)
  const tabLinks = Array.from(tabMenu.querySelectorAll('[role="tab"]'));
  // Get all tab panes (in order)
  const tabPanes = Array.from(tabContent.querySelectorAll('.w-tab-pane'));

  // Table rows: header first
  const rows = [];
  rows.push(['Tabs']); // Header row: block name ONLY (one column)

  // For each tab, combine the label and content into a single cell
  for (let i = 0; i < tabLinks.length; i++) {
    let label = '';
    const labelDiv = tabLinks[i].querySelector('div');
    label = (labelDiv ? labelDiv.textContent : tabLinks[i].textContent).trim();

    let tabPane = tabPanes[i];
    let tabContentFragment = document.createDocumentFragment();
    if (tabPane) {
      // Find the main grid area inside each tab pane (for robustness)
      const grid = tabPane.querySelector('.w-layout-grid') || tabPane;
      Array.from(grid.childNodes).forEach((child) => {
        tabContentFragment.appendChild(child.cloneNode(true));
      });
    }

    // Compose a single cell with both the label (as heading) and content
    const cellFragment = document.createDocumentFragment();
    const heading = document.createElement('strong');
    heading.textContent = label;
    cellFragment.appendChild(heading);
    cellFragment.appendChild(document.createElement('br'));
    cellFragment.appendChild(tabContentFragment);

    rows.push([cellFragment]); // Each row is SINGLE CELL (array with one element)
  }

  // Build the table (single column: header and all rows)
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
