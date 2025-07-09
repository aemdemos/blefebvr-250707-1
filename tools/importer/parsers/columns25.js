/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive checks
  if (!element || !document) return;

  // Get the direct .container child
  const container = element.querySelector(':scope > .container');
  if (!container) return;

  // Get the main grid holding heading, quote, columns grid
  const mainGrid = container.querySelector(':scope > .w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // The structure is:
  // [0] h2-heading
  // [1] paragraph-lg
  // [2] grid-layout (testimonial grid)
  const mainChildren = Array.from(mainGrid.children);
  if (mainChildren.length < 3) return;

  const heading = mainChildren[0];
  const quote = mainChildren[1];
  const testimonialGrid = mainChildren[2];

  // Defensive: ensure testimonialGrid is a grid
  if (!testimonialGrid || !testimonialGrid.classList.contains('w-layout-grid')) return;

  // Testimonial grid children:
  // [0] divider
  // [1] flex-horizontal (avatar, name, role)
  // [2] utility-display-inline-block (svg badge) or similar
  const testimonialChildren = Array.from(testimonialGrid.children);
  if (testimonialChildren.length < 3) return;

  // Divider is visual; skip
  // Avatar flex (name, role)
  const avatarFlex = testimonialChildren[1];
  // Badge or logo (svg)
  const badgeHolder = testimonialChildren[2];

  // Compose left column: heading, quote, avatarFlex (in that order, with space)
  const leftCol = document.createElement('div');
  if (heading) leftCol.appendChild(heading);
  if (quote) leftCol.appendChild(quote);
  if (avatarFlex) leftCol.appendChild(avatarFlex);

  // Compose right column: badge (brand mark)
  let rightCol;
  if (badgeHolder) {
    // If the badgeHolder contains an SVG (not just a wrapping div)
    let badgeSvg = badgeHolder.querySelector('svg');
    if (!badgeSvg && badgeHolder.tagName === 'SVG') badgeSvg = badgeHolder;
    if (badgeSvg) {
      const svgWrapper = document.createElement('div');
      svgWrapper.appendChild(badgeSvg);
      rightCol = svgWrapper;
    } else {
      rightCol = badgeHolder;
    }
  }

  // Block header row *must* be exactly this:
  const headerRow = ['Columns (columns25)'];
  const contentRow = [leftCol, rightCol];

  const rows = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  element.replaceWith(table);
}
