import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js";
import { addCSS } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.9/element.js";

addCSS("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css");

// Fungsi login dengan username dan password
async function login(username, password) {
    try {
        const response = await fetch('https://zenversegames-ba223a40f69e.herokuapp.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ User_name: username, Password: password })
        });

        const data = await response.json();

        if (response.status === 200) {
            localStorage.setItem('token', data.token); // Simpan token
            Swal.fire({
                icon: "success",
                title: "Login Successful",
                text: "Redirecting to dashboard...",
                timer: 2000,
                showConfirmButton: false
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
        console.error('Error:', error);
        Swal.fire({
            icon: "warning",
            title: "Login Failed",
            text: "An error occurred during login.",
        });
    }
}

// Event listener untuk form login
document.getElementById('form').addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    login(username, password);
});
