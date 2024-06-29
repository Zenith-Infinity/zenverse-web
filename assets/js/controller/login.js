import { urlLogin } from '../config/login_url.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch(urlLogin, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ User_name: username, Password: password }),
            });

            const result = await response.json();
            if (response.ok) {
                alert('Login successful');
                localStorage.setItem('jwt_token', result.token);
                window.location.href = 'admin/dashboard.html';
            } else {
                alert(`Login failed: ${result.message}`);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again.');
        }
    });
});