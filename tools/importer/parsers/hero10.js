/* global WebImporter */
export default function parse(element, { document }) {
  // Get the .grid-layout (it's inside the .container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Find the column with the heading and subheading
  let contentCol = null;
  let ctaCol = null;
  // Heuristically: first div has h2, second has buttons
  gridChildren.forEach(child => {
    if (!contentCol && child.querySelector('h2')) {
      contentCol = child;
    }
    if (!ctaCol && child.querySelector('a.button')) {
      ctaCol = child;
    }
  });

  // Gather content: heading, subheading, CTAs
  const contentArr = [];
  if (contentCol) {
    const heading = contentCol.querySelector('h2');
    if (heading) contentArr.push(heading);
    const subheading = contentCol.querySelector('p');
    if (subheading) contentArr.push(subheading);
  }
  if (ctaCol) {
    // Add all CTAs (usually a elements)
    const ctas = Array.from(ctaCol.querySelectorAll('a.button'));
    if (ctas.length === 1) {
      contentArr.push(ctas[0]);
    } else if (ctas.length > 1) {
      // Stack them vertically in a div for proper layout
      const ctaDiv = document.createElement('div');
      ctas.forEach((cta, idx) => {
        ctaDiv.appendChild(cta);
        if (idx < ctas.length - 1) {
          ctaDiv.appendChild(document.createElement('br'));
        }
      });
      contentArr.push(ctaDiv);
    }
  }

  // Build the table rows
  const rows = [
    ['Hero (hero10)'],
    [''], // Second row is for background image, which is missing in this HTML
    [contentArr]
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
