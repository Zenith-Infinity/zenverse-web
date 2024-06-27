import { urlLogin } from '../config/login_url.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            fetch(`${urlLogin}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    User_name: username,
                    Password: password
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    alert('Login successful');
                    window.location.href = '/pages/admin/dashboard.html'; 
                } else {
                    alert('Login failed: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while logging in.');
            });
        });
    }
});
