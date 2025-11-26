function incrementReviewCounter() {
    // 1. Get the current count, defaulting to 0 if not found
    let reviewCount = localStorage.getItem('numReviews') || 0;
    
    // 2. Convert to number and increment
    reviewCount = Number(reviewCount) + 1;
    
    // 3. Store the new count back into localStorage
    localStorage.setItem('numReviews', reviewCount);
    
    // 4. Display the new count on the page
    const countElement = document.getElementById('review-count');
    if (countElement) {
        countElement.textContent = reviewCount;
    }
}

// Execute the counter logic when the page loads
incrementReviewCounter();
 const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
       // B. Display Last Modified Date
    const lastModified = document.lastModified;
    const modifiedElement = document.getElementById('lastModified');
    if (modifiedElement) {
        modifiedElement.textContent = `Last Updated: ${lastModified}`;
    }
function setDateInfo() {
    // Set Current Year
    const yearSpan = document.getElementById('currentyear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Set Last Modified Date
    const modifiedSpan = document.getElementById('lastModified');
    if (modifiedSpan) {
        // document.lastModified returns the date/time the document was last modified
        modifiedSpan.textContent = document.lastModified;
    }
}

// Call the function to set the dates when the page loads
setDateInfo();
    // Example definition (adjust parameters and body as needed)
    function populateProductOptions(productId) {
        // Your logic to populate product options goes here
        console.log("Populating options for product:", productId);
    }
    