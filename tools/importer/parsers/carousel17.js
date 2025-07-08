/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid that contains all slides
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all the direct children (slide wrappers)
  const slideWrappers = Array.from(grid.children);

  // Prepare the header row as in the example
  const cells = [
    ['Carousel (carousel17)']
  ];

  // For each slide wrapper, extract the img (first cell) and any associated text content (second cell)
  slideWrappers.forEach(wrapper => {
    // Look for the img inside the wrapper
    const img = wrapper.querySelector('img');
    // Try to find possible text content: headings, paragraphs, links, etc.
    // Get all elements that are NOT the image or its container
    let textContent = '';
    const possibleTextEls = Array.from(wrapper.querySelectorAll('*')).filter(
      el => el !== img && !el.contains(img) && (el.textContent && el.textContent.trim())
    );
    if (possibleTextEls.length > 0) {
      // If there is more than one, append all as a fragment
      const frag = document.createDocumentFragment();
      possibleTextEls.forEach(el => frag.appendChild(el));
      textContent = frag;
    }
    cells.push([img, textContent]);
  });

  // Create the block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
