
class CustomAuthForm extends HTMLElement {
    connectedCallback() {
        const type = this.getAttribute('type') || 'login';
        const isLogin = type === 'login';
        
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .form-container {
                    max-width: 28rem;
                    margin: 0 auto;
                    padding: 2rem;
                    background: white;
                    border-radius: 0.5rem;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                }
                .form-input {
                    transition: all 0.2s ease;
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid #e2e8f0;
                    border-radius: 0.375rem;
                    font-size: 0.9375rem;
                }
                .form-input:focus {
                    outline: none;
                    border-color: #6366f1;
                    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
                }
                .btn-primary {
                    transition: all 0.2s ease;
                    width: 100%;
                    padding: 0.75rem;
                    background-color: #6366f1;
                    color: white;
                    border: none;
                    border-radius: 0.375rem;
                    font-weight: 500;
                    cursor: pointer;
                    font-size: 0.9375rem;
                }
                .btn-primary:hover {
                    background-color: #4f46e5;
                }
                .error-message {
                    display: none;
                    color: #ef4444;
                    font-size: 0.875rem;
                    margin-top: 0.25rem;
                }
                .input-error {
                    border-color: #ef4444;
                }
                .form-title {
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin-bottom: 1.5rem;
                    text-align: center;
                    color: #1e293b;
                }
                .form-footer {
                    margin-top: 1rem;
                    text-align: center;
                    font-size: 0.875rem;
                    color: #64748b;
                }
                .form-footer a {
                    color: #6366f1;
                    text-decoration: none;
                    font-weight: 500;
                }
                .form-footer a:hover {
                    text-decoration: underline;
                }
                .form-group {
                    margin-bottom: 1.25rem;
                }
                .form-label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: #334155;
                }
            </style>
            <div class="form-container">
                <h2 class="form-title">${isLogin ? 'Giriş Yap' : 'Hesap Oluştur'}</h2>
                <form class="space-y-4" id="authForm">
                    ${isLogin ? '' : `
                    <div class="form-group">
                        <label for="name" class="form-label">Adınız</label>
                        <input type="text" id="name" name="name" required 
                            class="form-input">
                    </div>
                    `}

                    <div class="form-group">
                        <label for="email" class="form-label">E-posta</label>
                        <input type="email" id="email" name="email" required 
                            class="form-input" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$">
                        <p class="error-message" id="email-error">Lütfen geçerli bir e-posta adresi giriniz</p>
                    </div>

                    <div class="form-group">
                        <label for="password" class="form-label">Şifre</label>
                        <input type="password" id="password" name="password" required minlength="8"
                            class="form-input">
                        <p class="error-message" id="password-error">Şifre en az 8 karakter olmalıdır</p>
                    </div>

                    ${isLogin ? '' : `
                    <div class="form-group">
                        <label for="passwordConfirm" class="form-label">Şifre Tekrar</label>
                        <input type="password" id="passwordConfirm" name="passwordConfirm" required minlength="8"
                            class="form-input">
                        <p class="error-message" id="passwordConfirm-error">Şifreler eşleşmiyor</p>
                    </div>
                    `}

                    <button type="submit" class="btn-primary">
                        ${isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
                    </button>
                </form>

                <div class="form-footer">
                    ${isLogin ? 
                        'Hesabınız yok mu? <a href="/register.html">Kayıt olun</a>' : 
                        'Zaten hesabınız var mı? <a href="/login.html">Giriş yapın</a>'}
                </div>
            </div>
        `;
        // Add form validation
        const form = this.shadowRoot.getElementById('authForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                if (this.validateForm()) {
                    // Mock successful authentication
                    localStorage.setItem('isAuthenticated', 'true');
                    window.location.href = '/index.html';
                }
            });

            // Add real-time validation
            const emailInput = this.shadowRoot.getElementById('email');
            const emailError = this.shadowRoot.getElementById('email-error');
            const passwordInput = this.shadowRoot.getElementById('password');
            const passwordError = this.shadowRoot.getElementById('password-error');

            emailInput.addEventListener('input', () => {
                if (!emailInput.validity.valid) {
                    emailInput.classList.add('input-error');
                    emailError.style.display = 'block';
                } else {
                    emailInput.classList.remove('input-error');
                    emailError.style.display = 'none';
                }
            });

            passwordInput.addEventListener('input', () => {
                if (passwordInput.value.length < 8) {
                    passwordInput.classList.add('input-error');
                    passwordError.style.display = 'block';
                } else {
                    passwordInput.classList.remove('input-error');
                    passwordError.style.display = 'none';
                }
            });

            // For registration form only
            if (!isLogin) {
                const passwordConfirmInput = this.shadowRoot.getElementById('passwordConfirm');
                const passwordConfirmError = this.shadowRoot.getElementById('passwordConfirm-error');

                passwordConfirmInput.addEventListener('input', () => {
                    if (passwordInput.value !== passwordConfirmInput.value) {
                        passwordConfirmInput.classList.add('input-error');
                        passwordConfirmError.style.display = 'block';
                    } else {
                        passwordConfirmInput.classList.remove('input-error');
                        passwordConfirmError.style.display = 'none';
                    }
                });
            }
        }
    }

    validateForm() {
        let isValid = true;
        const emailInput = this.shadowRoot.getElementById('email');
        const emailError = this.shadowRoot.getElementById('email-error');
        const passwordInput = this.shadowRoot.getElementById('password');
        const passwordError = this.shadowRoot.getElementById('password-error');

        // Email validation
        if (!emailInput.validity.valid) {
            emailInput.classList.add('input-error');
            emailError.style.display = 'block';
            isValid = false;
        } else {
            emailInput.classList.remove('input-error');
            emailError.style.display = 'none';
        }

        // Password validation
        if (passwordInput.value.length < 8) {
            passwordInput.classList.add('input-error');
            passwordError.style.display = 'block';
            isValid = false;
        } else {
            passwordInput.classList.remove('input-error');
            passwordError.style.display = 'none';
        }

        // For registration form
        if (this.getAttribute('type') === 'register') {
            const passwordConfirmInput = this.shadowRoot.getElementById('passwordConfirm');
            const passwordConfirmError = this.shadowRoot.getElementById('passwordConfirm-error');

            // Password confirmation
            if (passwordInput.value !== passwordConfirmInput.value) {
                passwordConfirmInput.classList.add('input-error');
                passwordConfirmError.style.display = 'block';
                isValid = false;
            } else {
                passwordConfirmInput.classList.remove('input-error');
                passwordConfirmError.style.display = 'none';
            }

            // Name validation
            const nameInput = this.shadowRoot.getElementById('name');
            if (!nameInput.value) {
                isValid = false;
            }
        }

        return isValid;
    }
}

customElements.define('custom-auth-form', CustomAuthForm);