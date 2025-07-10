/* global WebImporter */
export default function parse(element, { document }) {
  // Number of columns per row, inferred from grid class (desktop-4-column)
  const columnsPerRow = 4;

  // Get all direct child divs (the grid columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Build the rows: group items into rows of N columns
  const contentRows = [];
  for (let i = 0; i < columns.length; i += columnsPerRow) {
    // For each cell, collect all direct children (preserve icons and text)
    const rowCells = columns.slice(i, i + columnsPerRow).map(col => {
      // Gather all content in a column
      const colContent = Array.from(col.childNodes).filter(node => {
        if (node.nodeType === 1) return true;
        if (node.nodeType === 3) return node.textContent.trim().length > 0;
        return false;
      });
      return colContent.length === 1 ? colContent[0] : colContent;
    });
    contentRows.push(rowCells);
  }
  // Header row: block name in a single column
  const headerRow = ['Columns (columns18)'];
  // Assemble the table: header row + content rows
  const tableData = [headerRow, ...contentRows];
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}
