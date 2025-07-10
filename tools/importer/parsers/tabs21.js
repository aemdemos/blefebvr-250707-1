/* global WebImporter */
export default function parse(element, { document }) {
  // Compose the table for Tabs (tabs21)
  const rows = [];
  // Get tab menu and tab content containers
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabContent = element.querySelector('.w-tab-content');

  // All tab links and their corresponding panes
  const tabLinks = tabMenu ? Array.from(tabMenu.querySelectorAll('a[role="tab"]')) : [];
  const tabPanes = tabContent ? Array.from(tabContent.querySelectorAll('.w-tab-pane')) : [];
  // Header row: set up as two columns, with a cell that will have colspan=2
  rows.push(['Tabs (tabs21)', '']);

  // For each tab, extract label and content
  tabLinks.forEach((tabLink, idx) => {
    // Get label: prefer inner div textContent if present
    let label = '';
    const labelDiv = tabLink.querySelector('div');
    label = labelDiv ? labelDiv.textContent.trim() : tabLink.textContent.trim();
    // Get pane content by index - might be undefined
    const pane = tabPanes[idx];
    let contentCell = '';
    if (pane) {
      // Try to get the immediate content container (grid) if any
      const grid = pane.querySelector('.w-layout-grid');
      contentCell = grid ? grid : pane;
    }
    rows.push([label, contentCell]);
  });

  // Generate table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Fix the header row to have colspan=2
  const th = block.querySelector('tr:first-child th');
  if (th) {
    th.setAttribute('colspan', '2');
  }
  // Remove the second (empty) th if present
  const thRow = block.querySelector('tr:first-child');
  if (thRow && thRow.children.length > 1) {
    thRow.removeChild(thRow.children[1]);
  }

  element.replaceWith(block);
}
