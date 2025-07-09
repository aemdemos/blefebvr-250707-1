/* global WebImporter */
export default function parse(element, { document }) {
  // Find the top-level grid div
  const grid = element.querySelector(':scope > div.container > div.w-layout-grid');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 3) return;

  // Get reference to the three columns (order: text block, contacts list, image)
  const textCol = gridChildren[0];
  const contactsCol = gridChildren[1];
  const imageCol = gridChildren[2];

  // --- COLUMN 1: Heading cell ---
  // Compose a fragment with the 3 blocks: eyebrow, h2, subheading (preserving structure)
  const col1Frag = document.createElement('div');
  // Eyebrow
  const eyebrow = textCol.querySelector('h2.eyebrow');
  if (eyebrow) col1Frag.appendChild(eyebrow);
  // h2-heading
  const h2 = textCol.querySelector('h3.h2-heading');
  if (h2) col1Frag.appendChild(h2);
  // subheading
  const subheading = textCol.querySelector('p.subheading');
  if (subheading) col1Frag.appendChild(subheading);

  // --- COLUMN 2: Contacts cell ---
  // Use the actual <ul> element (preserving icon SVG, headers, links, etc.)
  const ul = contactsCol.querySelector('ul');
  let col2Frag;
  if (ul) {
    col2Frag = ul;
  } else {
    // Fallback to the column itself, if <ul> not found
    col2Frag = contactsCol;
  }

  // --- COLUMN 3: Image cell ---
  // Use the image element as is
  const img = imageCol.querySelector('img');
  let col3Frag;
  if (img) {
    col3Frag = img;
  } else {
    // fallback: use the column
    col3Frag = imageCol;
  }

  // Build the columns table
  const tableRows = [
    ['Columns (columns16)'],
    [col1Frag, col2Frag, col3Frag],
  ];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
