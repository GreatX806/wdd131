// Get URL parameters
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        productName: params.get('productName'),
        installDate: params.get('installDate'),
        rating: params.get('rating'),
        features: params.getAll('features'),
        writtenReview: params.get('writtenReview'),
        userName: params.get('userName')
    };
}

// Display review details
function displayReviewDetails() {
    const reviewData = getQueryParams();
    const reviewDetailsDiv = document.getElementById('reviewDetails');

    if (!reviewData.productName) {
        reviewDetailsDiv.innerHTML = '<p>No review data found. Please submit a review first.</p>';
        return;
    }

    // Create star rating display
    const starCount = parseInt(reviewData.rating) || 0;
    const stars = '★'.repeat(starCount) + '☆'.repeat(5 - starCount);

    // Format date
    let formattedDate = reviewData.installDate;
    if (formattedDate) {
        const dateObj = new Date(formattedDate);
        formattedDate = dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Build HTML
    let html = '<h3>Review Summary</h3>';

    html += '<div class="review-item">';
    html += '<span class="review-label">Product:</span> ';
    html += `<span class="review-value">${reviewData.productName}</span>`;
    html += '</div>';

    if (formattedDate) {
        html += '<div class="review-item">';
        html += '<span class="review-label">Installation Date:</span> ';
        html += `<span class="review-value">${formattedDate}</span>`;
        html += '</div>';
    }

    html += '<div class="review-item">';
    html += '<span class="review-label">Rating:</span> ';
    html += `<span class="review-stars">${stars}</span> `;
    html += `<span class="review-value">(${reviewData.rating} out of 5)</span>`;
    html += '</div>';

    if (reviewData.features && reviewData.features.length > 0) {
        html += '<div class="review-item">';
        html += '<span class="review-label">Useful Features:</span> ';
        html += `<span class="review-value">${reviewData.features.join(', ')}</span>`;
        html += '</div>';
    }

    if (reviewData.writtenReview) {
        html += '<div class="review-item">';
        html += '<span class="review-label">Written Review:</span> ';
        html += `<span class="review-value">${reviewData.writtenReview}</span>`;
        html += '</div>';
    }

    if (reviewData.userName) {
        html += '<div class="review-item">';
        html += '<span class="review-label">Submitted by:</span> ';
        html += `<span class="review-value">${reviewData.userName}</span>`;
        html += '</div>';
    }

    reviewDetailsDiv.innerHTML = html;
}

// Update and display review counter using localStorage
function updateReviewCounter() {
    // Get current count from localStorage
    let reviewCount = localStorage.getItem('reviewCount');

    // If no count exists, initialize to 0
    if (reviewCount === null) {
        reviewCount = 0;
    } else {
        reviewCount = parseInt(reviewCount);
    }

    // Increment the count
    reviewCount++;

    // Save back to localStorage
    localStorage.setItem('reviewCount', reviewCount);

    // Display the count
    const counterDisplay = document.getElementById('reviewCounter');
    if (counterDisplay) {
        counterDisplay.textContent = reviewCount;
    }
}

// Update Footer with Current Year and Last Modified Date
function updateFooter() {
    const currentYearSpan = document.getElementById('currentYear');
    const lastModifiedSpan = document.getElementById('lastModified');

    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    displayReviewDetails();
    updateReviewCounter();
    updateFooter();
});