
// Shared functions for all pages
document.addEventListener('DOMContentLoaded', function() {
    // Initialize feather icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }

    // Check if user is logged in (mock function)
    checkAuthStatus();

    // Update navbar based on auth status
    updateNavbarAuthState();
});

// Update navbar based on authentication state
function updateNavbarAuthState() {
    const navbar = document.querySelector('custom-navbar');
    if (!navbar) return;

    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const navLinks = navbar.shadowRoot.querySelector('.nav-links');
    const userSection = navbar.shadowRoot.querySelector('.user-section');

    if (isAuthenticated) {
        if (navLinks) navLinks.style.display = 'flex';
        if (userSection) userSection.style.display = 'flex';
    } else {
        if (userSection) {
            const signInBtn = userSection.querySelector('.auth-button');
            if (signInBtn) signInBtn.style.display = 'inline-flex';
        }
    }
}

// Mock function to check authentication status
function checkAuthStatus() {
    const protectedRoutes = ['/create.html', '/edit.html', '/details.html'];
const authRoutes = ['/login.html', '/register.html'];
    const currentPath = window.location.pathname;
    
    // In a real app, this would check cookies/localStorage/tokens
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    if (!isAuthenticated && protectedRoutes.includes(currentPath)) {
        window.location.href = '/login.html';
    } else if (isAuthenticated && authRoutes.includes(currentPath)) {
        window.location.href = '/index.html';
    }
}

// Format date for display
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Logout function
function logout() {
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/login.html';
}