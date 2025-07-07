/* global WebImporter */
export default function parse(element, { document }) {
  // Get all column divs (direct children)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Build content for each column
  const columns = columnDivs.map(div => {
    const imgs = div.querySelectorAll('img');
    if (imgs.length === 1 && div.childNodes.length === 1) {
      // Div contains only an image
      return imgs[0];
    }
    // If div might have other content, preserve all content
    return div;
  });

  // Create a single header cell spanning all columns
  const headerCell = document.createElement('th');
  headerCell.textContent = 'Columns (columns13)';
  headerCell.colSpan = columns.length;
  const headerRow = document.createElement('tr');
  headerRow.appendChild(headerCell);

  // Create data row with one cell per column
  const dataRow = document.createElement('tr');
  columns.forEach(col => {
    const td = document.createElement('td');
    td.append(col);
    dataRow.appendChild(td);
  });

  // Build the table
  const table = document.createElement('table');
  table.appendChild(headerRow);
  table.appendChild(dataRow);

  // Replace the original element with the new table
  element.replaceWith(table);
}
