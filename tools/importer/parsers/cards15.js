/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row exactly as required
  const headerRow = ['Cards (cards15)'];

  // Get all direct card links
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  const rows = cards.map(card => {
    // First cell: image (if present)
    let imageCell = null;
    const imgWrap = card.querySelector('.utility-aspect-2x3');
    if (imgWrap) {
      const img = imgWrap.querySelector('img');
      if (img) imageCell = img;
    }
    // Second cell: meta and heading
    const textCell = document.createElement('div');
    // Collect meta info (e.g., tag and date)
    const meta = card.querySelector('.flex-horizontal');
    if (meta) {
      textCell.appendChild(meta);
    }
    // Collect heading (if present)
    const heading = card.querySelector('h1,h2,h3,h4,h5,h6');
    if (heading) {
      textCell.appendChild(heading);
    }
    // If both meta and heading are missing, guarantee at least something in textCell
    if (!meta && !heading) {
      // Use card textContent as fallback
      textCell.textContent = card.textContent.trim();
    }
    return [imageCell, textCell];
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
