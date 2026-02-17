// Elevate Digital - Main JavaScript File

// ==========================================
// JavaScript Objects
// ==========================================

const siteConfig = {
    companyName: 'Elevate Digital',
    contactEmail: 'hello@elevatedigital.com',
    currentYear: 2024,
    maxFormSubmissions: 3,
    services: {
        seo: 'Search Engine Optimization',
        ppc: 'PPC Advertising',
        social: 'Social Media Marketing',
        web: 'Web Development',
        content: 'Content Marketing',
        analytics: 'Analytics & Reporting',
        full: 'Full Service Package',
        other: 'Other'
    }
};

const formData = {
    submissions: [],
    lastSubmission: null,
    submissionCount: 0
};

// ==========================================
// Arrays and Array Methods
// ==========================================

const testimonials = [
    {
        name: 'Sarah Johnson',
        company: 'TechStart Inc.',
        rating: 5,
        text: 'Elevate Digital transformed our online presence completely. Our traffic increased by 300% in just 6 months!'
    },
    {
        name: 'Michael Chen',
        company: 'Global Retail Co.',
        rating: 5,
        text: 'The team\'s expertise in PPC advertising helped us reduce our cost per acquisition by 40%. Highly recommend!'
    },
    {
        name: 'Emily Rodriguez',
        company: 'Wellness Studio',
        rating: 5,
        text: 'Professional, responsive, and results-oriented. They truly care about our success and it shows.'
    }
];

const navigationItems = ['Home', 'About', 'Services', 'Contact'];

// ==========================================
// Utility Functions
// ==========================================

/**
 * Format current date for display
 * @returns {string} Formatted date string
 */
function getCurrentDate() {
    const now = new Date();
    return now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Validate email address format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid, false otherwise
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid, false otherwise
 */
function validatePhone(phone) {
    if (!phone) return true; // Phone is optional
    const phoneRegex = /^[\d\s\-()]+$/;
    return phoneRegex.test(phone);
}

/**
 * Show error message for form field
 * @param {string} fieldId - ID of the form field
 * @param {string} errorMessage - Error message to display
 */
function showError(fieldId, errorMessage) {
    const errorElement = document.getElementById(`${fieldId}Error`);
    const inputElement = document.getElementById(fieldId);
    
    if (errorElement && inputElement) {
        errorElement.textContent = errorMessage;
        errorElement.style.display = 'block';
        inputElement.style.borderColor = '#dc2626';
    }
}

/**
 * Hide error message for form field
 * @param {string} fieldId - ID of the form field
 */
function hideError(fieldId) {
    const errorElement = document.getElementById(`${fieldId}Error`);
    const inputElement = document.getElementById(fieldId);
    
    if (errorElement && inputElement) {
        errorElement.style.display = 'none';
        inputElement.style.borderColor = '#e5e7eb';
    }
}

/**
 * Clear all form errors
 */
function clearAllErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    const inputs = document.querySelectorAll('input, textarea, select');
    
    errorMessages.forEach(error => error.style.display = 'none');
    inputs.forEach(input => input.style.borderColor = '#e5e7eb');
}

// ==========================================
// localStorage Functions
// ==========================================

/**
 * Save form submission to localStorage
 * @param {Object} submissionData - Form submission data
 */
function saveSubmission(submissionData) {
    try {
        const submissions = getSubmissions();
        submissions.push(submissionData);
        localStorage.setItem('formSubmissions', JSON.stringify(submissions));
        
        // Update last submission and count
        formData.lastSubmission = submissionData;
        formData.submissionCount = submissions.length;
        formData.submissions = submissions;
    } catch (error) {
        console.error('Error saving submission:', error);
    }
}

/**
 * Get all form submissions from localStorage
 * @returns {Array} Array of submission objects
 */
function getSubmissions() {
    try {
        const submissions = localStorage.getItem('formSubmissions');
        return submissions ? JSON.parse(submissions) : [];
    } catch (error) {
        console.error('Error getting submissions:', error);
        return [];
    }
}

/**
 * Check if user has exceeded submission limit
 * @returns {boolean} True if limit exceeded, false otherwise
 */
function checkSubmissionLimit() {
    const submissions = getSubmissions();
    return submissions.length >= siteConfig.maxFormSubmissions;
}

/**
 * Clear all form submissions from localStorage
 */
function clearSubmissions() {
    try {
        localStorage.removeItem('formSubmissions');
        formData.submissions = [];
        formData.submissionCount = 0;
        formData.lastSubmission = null;
    } catch (error) {
        console.error('Error clearing submissions:', error);
    }
}

/**
 * Display submission statistics
 * @returns {string} Formatted statistics string using template literals
 */
function getSubmissionStats() {
    const submissions = getSubmissions();
    const lastSubmission = formData.lastSubmission;
    
    let stats = `Total submissions: ${submissions.length}`;
    
    if (submissions.length > 0) {
        const serviceCounts = {};
        submissions.forEach(sub => {
            const serviceName = siteConfig.services[sub.service] || sub.service;
            serviceCounts[serviceName] = (serviceCounts[serviceName] || 0) + 1;
        });
        
        stats += `\n\nSubmissions by service:`;
        Object.entries(serviceCounts).forEach(([service, count]) => {
            stats += `\n- ${service}: ${count}`;
        });
        
        if (lastSubmission) {
            stats += `\n\nLast submission: ${lastSubmission.date} from ${lastSubmission.fullName}`;
        }
    }
    
    return stats;
}

// ==========================================
// Form Validation and Processing
// ==========================================

/**
 * Validate the contact form
 * @param {Event} event - Form submit event
 * @returns {boolean} True if valid, false otherwise
 */
function validateForm(event) {
    event.preventDefault();
    clearAllErrors();
    
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();
    
    let isValid = true;
    
    // Validate full name (required)
    if (fullName.length < 2) {
        showError('fullName', 'Please enter your full name (at least 2 characters)');
        isValid = false;
    }
    
    // Validate email (required)
    if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate phone (optional but must be valid if provided)
    if (phone && !validatePhone(phone)) {
        showError('phone', 'Please enter a valid phone number');
        isValid = false;
    }
    
    // Validate service (required)
    if (!service) {
        showError('service', 'Please select a service');
        isValid = false;
    }
    
    // Validate message (required)
    if (message.length < 10) {
        showError('message', 'Please enter a message (at least 10 characters)');
        isValid = false;
    }
    
    // Conditional branching - check submission limit
    if (isValid) {
        if (checkSubmissionLimit()) {
            alert(`You have reached the maximum number of submissions (${siteConfig.maxFormSubmissions}). Please contact us directly at ${siteConfig.contactEmail}`);
            return false;
        }
        
        // Process the form
        processForm(fullName, email, phone, service, message);
    }
    
    return isValid;
}

/**
 * Process valid form submission
 * @param {string} fullName - User's full name
 * @param {string} email - User's email
 * @param {string} phone - User's phone
 * @param {string} service - Selected service
 * @param {string} message - User's message
 */
function processForm(fullName, email, phone, service, message) {
    const company = document.getElementById('company').value.trim();
    const budget = document.getElementById('budget').value;
    
    // Create submission object using template literals
    const submission = {
        id: Date.now(),
        fullName: fullName,
        email: email,
        phone: phone || 'Not provided',
        company: company || 'Not provided',
        service: service,
        budget: budget || 'Not specified',
        message: message,
        date: getCurrentDate(),
        timestamp: new Date().toISOString()
    };
    
    // Save to localStorage
    saveSubmission(submission);
    
    // Hide form and show success message
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (form && successMessage) {
        form.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Log to console using template literals
        console.log(`New form submission received:
- Name: ${fullName}
- Email: ${email}
- Company: ${company || 'Not provided'}
- Service: ${siteConfig.services[service] || service}
- Budget: ${budget || 'Not specified'}
- Message: ${message.substring(0, 50)}...
- Date: ${submission.date}`);
    }
}

/**
 * Reset the contact form
 */
function resetForm() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (form && successMessage) {
        form.reset();
        clearAllErrors();
        form.style.display = 'block';
        successMessage.style.display = 'none';
    }
}

// ==========================================
// DOM Manipulation Functions
// ==========================================

/**
 * Update page title dynamically
 * @param {string} newTitle - New page title
 */
function updatePageTitle(newTitle) {
    document.title = `${newTitle} - ${siteConfig.companyName}`;
}

/**
 * Add smooth scrolling to all anchor links
 */
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Add active class to current page in navigation
 */
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        
        if (linkPage === currentPage) {
            link.style.backgroundColor = 'var(--bg-light)';
            link.style.color = 'var(--primary-color)';
        }
    });
}

/**
 * Display welcome message for returning visitors
 */
function displayWelcomeMessage() {
    const lastVisit = localStorage.getItem('lastVisit');
    const visits = localStorage.getItem('visitCount') || 0;
    
    if (lastVisit) {
        const visitCount = parseInt(visits) + 1;
        localStorage.setItem('visitCount', visitCount);
        
        // Create welcome message element
        const welcomeDiv = document.createElement('div');
        welcomeDiv.style.cssText = `
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            padding: 1rem;
            text-align: center;
            margin: 1rem auto;
            max-width: 1200px;
            border-radius: 0.5rem;
            animation: fadeIn 0.5s;
        `;
        
        welcomeDiv.innerHTML = `
            <p><strong>Welcome back to ${siteConfig.companyName}!</strong></p>
            <p>You've visited us ${visitCount} times. Last visit: ${lastVisit}</p>
            <p style="margin-top: 0.5rem;">
                <button onclick="this.parentElement.remove()" style="background: white; color: var(--primary-color); border: none; padding: 0.5rem 1rem; border-radius: 0.25rem; cursor: pointer;">Dismiss</button>
            </p>
        `;
        
        // Insert after hero section
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.insertAdjacentElement('afterend', welcomeDiv);
        }
    } else {
        localStorage.setItem('visitCount', 1);
    }
    
    // Update last visit
    localStorage.setItem('lastVisit', getCurrentDate());
}

/**
 * Initialize navigation mobile menu toggle
 */
function initMobileMenu() {
    const nav = document.querySelector('nav');
    
    if (nav) {
        const mobileMenuButton = document.createElement('button');
        mobileMenuButton.innerHTML = '☰';
        mobileMenuButton.style.cssText = `
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--text-dark);
        `;
        
        const navLinks = document.querySelector('.nav-links');
        
        mobileMenuButton.addEventListener('click', () => {
            if (navLinks) {
                navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            }
        });
        
        nav.insertBefore(mobileMenuButton, navLinks);
        
        // Show mobile menu button on small screens
        if (window.innerWidth <= 768) {
            mobileMenuButton.style.display = 'block';
            if (navLinks) {
                navLinks.style.display = 'none';
            }
        }
        
        // Handle resize
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                mobileMenuButton.style.display = 'block';
                if (navLinks) {
                    navLinks.style.display = 'none';
                }
            } else {
                mobileMenuButton.style.display = 'none';
                if (navLinks) {
                    navLinks.style.display = 'flex';
                }
            }
        });
    }
}

/**
 * Add animation to service cards on scroll
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const cards = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card');
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// ==========================================
// Array Methods Demonstration
// ==========================================

/**
 * Display all testimonials
 */
function displayAllTestimonials() {
    console.log('All Testimonials:');
    console.log('==================');
    
    // Using forEach array method
    testimonials.forEach((testimonial, index) => {
        const stars = '★'.repeat(testimonial.rating);
        console.log(`\n${index + 1}. ${testimonial.name} - ${testimonial.company}`);
        console.log(`   ${stars}`);
        console.log(`   "${testimonial.text}"`);
    });
}

/**
 * Filter testimonials by rating
 * @param {number} minRating - Minimum rating
 * @returns {Array} Filtered testimonials
 */
function getTopTestimonials(minRating = 5) {
    // Using filter array method
    return testimonials.filter(testimonial => testimonial.rating >= minRating);
}

/**
 * Get testimonial names array
 * @returns {Array} Array of testimonial names
 */
function getTestimonialNames() {
    // Using map array method
    return testimonials.map(testimonial => testimonial.name);
}

/**
 * Check if any testimonial mentions specific company
 * @param {string} company - Company name to search for
 * @returns {boolean} True if found
 */
function hasCompanyTestimonial(company) {
    // Using some array method
    return testimonials.some(testimonial => 
        testimonial.company.toLowerCase().includes(company.toLowerCase())
    );
}

// ==========================================
// Event Listeners and Initialization
// ==========================================

/**
 * Initialize all event listeners
 */
function initEventListeners() {
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', validateForm);
    }
    
    // Input field validation on blur
    const requiredFields = ['fullName', 'email', 'service', 'message'];
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('blur', function() {
                const value = this.value.trim();
                
                if (fieldId === 'fullName' && value.length < 2) {
                    showError(fieldId, 'Please enter your full name');
                } else if (fieldId === 'email' && !validateEmail(value)) {
                    showError(fieldId, 'Please enter a valid email');
                } else if (fieldId === 'service' && !value) {
                    showError(fieldId, 'Please select a service');
                } else if (fieldId === 'message' && value.length < 10) {
                    showError(fieldId, 'Please enter a longer message');
                } else {
                    hideError(fieldId);
                }
            });
        }
    });
    
    // Real-time validation
    document.querySelectorAll('input, textarea, select').forEach(field => {
        field.addEventListener('input', function() {
            const errorElement = document.getElementById(`${this.id}Error`);
            if (errorElement && errorElement.style.display === 'block') {
                hideError(this.id);
            }
        });
    });
}

/**
 * Initialize the application
 */
function initApp() {
    // DOM manipulation - highlight current page
    highlightCurrentPage();
    
    // Initialize event listeners
    initEventListeners();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Display welcome message for returning visitors
    displayWelcomeMessage();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Update copyright year in footer
    const footerYear = document.querySelector('footer p:last-of-type');
    if (footerYear) {
        footerYear.textContent = `© ${siteConfig.currentYear} ${siteConfig.companyName}. All rights reserved.`;
    }
    
    // Log initialization
    console.log(`${siteConfig.companyName} website initialized successfully!`);
    console.log(`Current page: ${window.location.pathname}`);
    console.log(getSubmissionStats());
}

// ==========================================
// Run Initialization When DOM is Ready
// ==========================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// ==========================================
// Additional Helper Functions
// ==========================================

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function to limit function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit = 300) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}