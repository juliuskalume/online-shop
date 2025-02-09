class Auth {
    constructor() {
        this.isAuthenticated = false;
        this.currentUser = null;
        this.users = JSON.parse(localStorage.getItem('users')) || [];
        this.checkAuthState();
    }

    checkAuthState() {
        const sessionUser = localStorage.getItem('currentUser');
        if (sessionUser) {
            this.currentUser = JSON.parse(sessionUser);
            this.isAuthenticated = true;
            this.updateUIForAuth();
        }
    }

    register(email, password, name) {
        // Check if user already exists
        if (this.users.find(user => user.email === email)) {
            throw new Error('User already exists');
        }

        const newUser = {
            id: Date.now(),
            email,
            password: this.hashPassword(password), // In production, use proper hashing
            name,
            createdAt: new Date().toISOString()
        };

        this.users.push(newUser);
        localStorage.setItem('users', JSON.stringify(this.users));
        this.login(email, password);
    }

    login(email, password) {
        const user = this.users.find(u => u.email === email);
        if (!user || user.password !== this.hashPassword(password)) {
            throw new Error('Invalid credentials');
        }

        this.currentUser = {
            id: user.id,
            email: user.email,
            name: user.name
        };
        this.isAuthenticated = true;
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        this.updateUIForAuth();
    }

    logout() {
        this.currentUser = null;
        this.isAuthenticated = false;
        localStorage.removeItem('currentUser');
        this.updateUIForAuth();
        window.location.href = '/';
    }

    hashPassword(password) {
        // In production, use a proper hashing algorithm
        return btoa(password);
    }

    updateUIForAuth() {
        const authSection = document.getElementById('auth-section');
        const userSection = document.getElementById('user-section');
        
        if (this.isAuthenticated && this.currentUser) {
            authSection?.classList.add('hidden');
            userSection?.classList.remove('hidden');
            document.getElementById('user-name')?.textContent = this.currentUser.name;
        } else {
            authSection?.classList.remove('hidden');
            userSection?.classList.add('hidden');
        }
    }
}

// Initialize auth
const auth = new Auth();

// Event Listeners for Auth Forms
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const logoutBtn = document.getElementById('logout-btn');

    loginForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        try {
            auth.login(email, password);
            document.getElementById('login-modal').style.display = 'none';
        } catch (error) {
            alert(error.message);
        }
    });

    registerForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;
        try {
            auth.register(email, password, name);
            document.getElementById('register-modal').style.display = 'none';
        } catch (error) {
            alert(error.message);
        }
    });

    logoutBtn?.addEventListener('click', () => {
        auth.logout();
    });
});