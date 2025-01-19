import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js";
import { addCSS } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.9/element.js";

// Menambahkan stylesheet SweetAlert2
addCSS("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css");


function validateLoginInput(username, password) {
    const usernamePattern = /^[a-zA-Z0-9_]+$/;  
    if (!usernamePattern.test(username)) {
        return "Username is invalid. Only alphanumeric characters and underscores are allowed.";
    }

    if (password.length < 8) {
        return "Password must be at least 8 characters long.";
    }

    return null; 
}


async function login(username, password) {
    
    const validationError = validateLoginInput(username, password);
    if (validationError) {
        Swal.fire({
            icon: "warning",
            title: "Input Error",
            text: validationError,
        });
        return;
    }

    try {
        
        const response = await fetch('https://zenversegames-ba223a40f69e.herokuapp.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ User_name: username, Password: password }),
        });

        const data = await response.json();

        if (response.status === 200) {

            localStorage.setItem('token', data.token);
            localStorage.setItem('csrf_token', data.csrf_token);

            // Tampilkan pesan sukses
            Swal.fire({
                icon: "success",
                title: "Login Successful",
                text: "Redirecting to dashboard...",
                timer: 2000,
                showConfirmButton: false,
            });

            setTimeout(() => {
                window.location.href = 'admin/dashboard.html';
            }, 2000);
        } else {
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: data.message || "Username or password incorrect!",
            });
        }
    } catch (error) {
        console.error('Error during login:', error);
        Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: "An error occurred during login. Please try again later.",
        });
    }
}

document.getElementById('form').addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    login(username, password);
});
