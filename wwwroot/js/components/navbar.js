
class CustomNavbar extends HTMLElement {
    connectedCallback() {
        const activePage = this.getAttribute('active') || 'home';
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                * {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                    font-family: 'Inter', sans-serif;
                }
                
                nav {
                    background: white;
                    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
                    height: 64px;
                    display: flex;
                    align-items: center;
                    width: 100%;
                }
                
                .container {
                    width: 100%;
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 0 1rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .logo {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #4f46e5;
                    font-weight: 700;
                    font-size: 1.25rem;
                    text-decoration: none;
                }
                
                .logo i {
                    width: 24px;
                    height: 24px;
                }
                
                .nav-links {
                    display: flex;
                    gap: 1.5rem;
                    margin-left: 2rem;
                }
                
                .nav-link {
                    color: #6b7280;
                    text-decoration: none;
                    font-weight: 500;
                    font-size: 0.875rem;
                    transition: all 0.2s ease;
                    position: relative;
                    display: flex;
                    align-items: center;
                    padding: 0.5rem 0;
                }
                
                .nav-link:hover {
                    color: #4f46e5;
                }
                
                .nav-link.active {
                    color: #4f46e5;
                }
                
                .nav-link.active::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background-color: #4f46e5;
                    border-radius: 2px;
                }
                
                .user-section {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                
                .user-avatar {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background-color: #eef2ff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #4f46e5;
                }
                
                .auth-button {
                    background-color: #4f46e5;
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 0.375rem;
                    font-weight: 500;
                    font-size: 0.875rem;
                    transition: all 0.2s ease;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .auth-button:hover {
                    background-color: #4338ca;
                }
                
                .mobile-menu-button {
                    display: none;
                    background: none;
                    border: none;
                    color: #6b7280;
                    cursor: pointer;
                }
                
                @media (max-width: 768px) {
                    .nav-links, .user-section {
                        display: none;
                    }
                    
                    .mobile-menu-button {
                        display: block;
                    }
                }
            </style>
            
            <nav>
                <div class="container">
                    <a href="/index.html" class="logo">
                        <i data-feather="book"></i>
                        <span>NotesApp</span>
                    </a>
                    <div class="nav-links">
                        <a href="/index.html" class="nav-link ${activePage === 'home' ? 'active' : ''}">
                            <i data-feather="home" class="mr-1"></i>
                            Home
                        </a>
                        <a href="/create.html" class="nav-link ${activePage === 'create' ? 'active' : ''}">
                            <i data-feather="plus" class="mr-1"></i>
                            Create
                        </a>
</div>
<div class="user-section">
                        ${isAuthenticated ? `
                            <div class="user-avatar">
                                <i data-feather="user"></i>
                            </div>
                            <a href="javascript:void(0)" onclick="logout()" class="text-sm text-gray-600 hover:text-gray-900">
                                Çıkış Yap
                            </a>
` : `
                            <a href="/login.html" class="auth-button">
                                <i data-feather="log-in"></i>
                                Sign In
                            </a>
                        `}
                    </div>
                    
                    <button class="mobile-menu-button">
                        <i data-feather="menu"></i>
                    </button>
                </div>
            </nav>
        `;
    }
}
customElements.define('custom-navbar', CustomNavbar);

// Add mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('custom-navbar');
    if (navbar) {
        navbar.shadowRoot.querySelector('.mobile-menu-button').addEventListener('click', () => {
            const navLinks = navbar.shadowRoot.querySelector('.nav-links');
            const userSection = navbar.shadowRoot.querySelector('.user-section');
            
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
                userSection.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                userSection.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '64px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = 'white';
                navLinks.style.padding = '1rem';
                navLinks.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                
                userSection.style.flexDirection = 'column';
                userSection.style.position = 'absolute';
                userSection.style.top = navLinks.clientHeight + 64 + 'px';
                userSection.style.left = '0';
                userSection.style.width = '100%';
                userSection.style.backgroundColor = 'white';
                userSection.style.padding = '1rem';
                userSection.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            }
        });
    }
});