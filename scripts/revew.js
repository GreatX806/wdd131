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