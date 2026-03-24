// ===== DREAM TRAVEL PLANNER - MAIN JAVASCRIPT =====

// Contact Form
function submitContact(event) {
    if (event) event.preventDefault();
    
    const name = document.getElementById('contactName')?.value;
    const email = document.getElementById('contactEmail')?.value;
    const message = document.getElementById('contactMessage')?.value;
    
    if (!name || !name.trim()) {
        alert('Please enter your name');
        return false;
    }
    
    if (!email || !email.trim()) {
        alert('Please enter your email');
        return false;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    if (!message || !message.trim()) {
        alert('Please enter your message');
        return false;
    }
    
    alert(`Thank you ${name}! Your message has been sent.`);
    if (event.target) event.target.reset();
    return false;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Add Review
function submitReview(event) {
    if (event) event.preventDefault();
    
    const name = document.getElementById('reviewerName')?.value;
    const rating = document.getElementById('rating')?.value;
    const review = document.getElementById('reviewText')?.value;
    
    if (!name || !name.trim()) {
        alert('Please enter your name');
        return false;
    }
    
    if (!rating) {
        alert('Please select a rating');
        return false;
    }
    
    if (!review || !review.trim()) {
        alert('Please write your review');
        return false;
    }
    
    const reviewsContainer = document.getElementById('reviewsContainer');
    if (reviewsContainer) {
        const stars = '★'.repeat(parseInt(rating)) + '☆'.repeat(5-parseInt(rating));
        const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        
        const newReview = document.createElement('div');
        newReview.className = 'review-card';
        newReview.innerHTML = `
            <div class="text-warning fs-5">${stars}</div>
            <p class="mt-2">"${review.trim()}"</p>
            <strong>- ${name.trim()}</strong>
            <small class="text-muted d-block mt-2">${date}</small>
        `;
        reviewsContainer.insertBefore(newReview, reviewsContainer.firstChild);
        
        // Save to localStorage
        const reviews = JSON.parse(localStorage.getItem('dreamTravelReviews') || '[]');
        reviews.unshift({
            name: name.trim(),
            rating: parseInt(rating),
            review: review.trim(),
            date: date
        });
        localStorage.setItem('dreamTravelReviews', JSON.stringify(reviews));
    }
    
    if (event.target) event.target.reset();
    return false;
}

// Load reviews from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    // Set active nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Load reviews if on reviews page
    if (currentPage === 'reviews.html') {
        const reviewsContainer = document.getElementById('reviewsContainer');
        if (reviewsContainer) {
            const savedReviews = JSON.parse(localStorage.getItem('dreamTravelReviews') || '[]');
            if (savedReviews.length > 0) {
                reviewsContainer.innerHTML = '';
                savedReviews.forEach(review => {
                    const stars = '★'.repeat(review.rating) + '☆'.repeat(5-review.rating);
                    const reviewElement = document.createElement('div');
                    reviewElement.className = 'review-card';
                    reviewElement.innerHTML = `
                        <div class="text-warning fs-5">${stars}</div>
                        <p class="mt-2">"${review.review}"</p>
                        <strong>- ${review.name}</strong>
                        <small class="text-muted d-block mt-2">${review.date}</small>
                    `;
                    reviewsContainer.appendChild(reviewElement);
                });
            }
        }
    }
});

// Make functions global
window.submitContact = submitContact;
window.submitReview = submitReview;