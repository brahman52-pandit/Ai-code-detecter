// Toggle between sign up and sign in
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

// Password toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    const togglePassword = (toggleId, inputId) => {
        const toggle = document.getElementById(toggleId);
        const input = document.getElementById(inputId);
        
        toggle.addEventListener('click', function() {
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.classList.toggle('fa-eye-slash');
        });
    };

    togglePassword('toggleSignupPassword', 'signupPassword');
    togglePassword('toggleLoginPassword', 'loginPassword');

    // Form validation
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
    const signupError = document.getElementById('signupError');
    const loginError = document.getElementById('loginError');

    // Initialize users array in localStorage if not exists
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }

    // Signup form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        
        // Clear previous errors
        signupError.style.display = 'none';
        
        // Validate password strength
        if (password.length < 8) {
            signupError.textContent = 'Password must be at least 8 characters';
            signupError.style.display = 'block';
            return;
        }
        
        // Get existing users
        const users = JSON.parse(localStorage.getItem('users'));
        
        // Check if email already exists
        const userExists = users.some(user => user.email === email);
        if (userExists) {
            signupError.textContent = 'Email already registered';
            signupError.style.display = 'block';
            return;
        }
        
        // Create new user (Note: In real app, hash the password!)
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password, // Warning: In production, never store plain passwords!
            createdAt: new Date().toISOString()
        };
        
        // Save user
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        alert('Account created successfully!');
        // Auto login after signup
        document.getElementById('loginEmail').value = email;
        document.getElementById('loginPassword').value = password;
        container.classList.remove("right-panel-active");
    });

    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Clear previous errors
        loginError.style.display = 'none';
        
        // Get users
        const users = JSON.parse(localStorage.getItem('users'));
        const user = users.find(u => u.email === email);
        
        if (!user) {
            loginError.textContent = 'User not found';
            loginError.style.display = 'block';
            return;
        }
        
        // Check password (Warning: In production, use hashed passwords!)
        if (user.password !== password) {
            loginError.textContent = 'Invalid password';
            loginError.style.display = 'block';
            return;
        }
        
        // Login successful
        alert('Login successful!');
        // Store current user in session
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        // Redirect to main page
        window.location.href = 'main.html';
    });

    // Mobile menu toggle
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    menuBtn.addEventListener('click', function() {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
});
console.log("All stored users:", JSON.parse(localStorage.getItem('users')));