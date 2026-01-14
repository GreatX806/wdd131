'use strict';

document.addEventListener('DOMContentLoaded', () => {
  try {
    const currentYearSpan = document.getElementById('currentyear');
    const currentYear = new Date().getFullYear();
    currentYearSpan.textContent = currentYear;
  } catch (e) {
    console.error('Error setting current year:', e);
  }

  try {
    const lastModifiedParagraph = document.getElementById('lastModified');
    const lastModifiedDate = document.lastModified;
    lastModifiedParagraph.textContent = `Last Modification: ${lastModifiedDate}`;
  } catch (e) {
    console.error('Error setting last modified date:', e);
  }
});
