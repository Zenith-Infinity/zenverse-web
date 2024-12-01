import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js";
import { addCSS } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.9/element.js";

addCSS("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css");

const GOOGLE_CLIENT_ID = "161294722609-k3mgi3nbmb9ulrpd8hdd3da3rj05l3jg.apps.googleusercontent.com";
const REDIRECT_URI = "https://zenversegames-ba223a40f69e.herokuapp.com/auth/google/callback";

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
            localStorage.setItem('token', data.token);
            Swal.fire({
                icon: "success",
                title: "Login Successful",
                text: "You will be directed to dashboard",
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
                text: "Username atau password salah!",
            });
        }
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            icon: "warning",
            title: "Login Failed",
            text: "Terjadi kesalahan saat login.",
        });
    }
}

// Fungsi untuk login dengan Google OAuth
function googleLogin() {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=openid%20profile%20email`;
    window.location.href = googleAuthUrl;
}

// Fungsi untuk menangani token Google yang diterima
async function handleCredentialResponse(response) {
    const token = response.credential;
    try {
        const res = await fetch('https://zenversegames-ba223a40f69e.herokuapp.com/auth/google/callback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: token }),
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem('token', data.token);
            Swal.fire({
                icon: "success",
                title: "Login Successful",
                text: "You will be directed to the dashboard.",
                timer: 2000,
                showConfirmButton: false
            });
            setTimeout(() => {
                // Redirect ke URL yang dikembalikan dari back-end
                window.location.href = data.redirect || 'admin/dashboard.html';
            }, 2000);
        } else {
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: data.message || "Google login failed!",
            });
        }
    } catch (error) {
        console.error("Error during Google login:", error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred. Please try again.",
        });
    }
}

// Fungsi untuk menangani callback dari Google OAuth
async function handleGoogleCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');

    if (error) {
        Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: "Error: " + error,
        });
        return;
    }

    if (code) {
        try {
            const response = await fetch('https://zenversegames-ba223a40f69e.herokuapp.com/auth/google/callback?code=' + code);
            const data = await response.json();

            if (response.status === 200) {
                localStorage.setItem('token', data.token);
                Swal.fire({
                    icon: "success",
                    title: "Login Successful",
                    text: "You will be directed to the dashboard.",
                    timer: 2000,
                    showConfirmButton: false
                });
                setTimeout(() => {
                    window.location.href = data.redirect || 'admin/dashboard.html';
                }, 2000);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: data.message || "Google login failed!",
                });
            }
        } catch (error) {
            console.error("Error during Google callback:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "An error occurred during the callback. Please try again.",
            });
        }
    }
}

// Event listener untuk form login
document.getElementById('form').addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    login(username, password);
});

// Inisialisasi Google login
window.onload = () => {
    // Tangani callback dari Google OAuth
    if (window.location.search.includes("code")) {
        handleGoogleCallback();
    } else {
        // Inisialisasi Google Sign-In
        google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse,
        });

        google.accounts.id.prompt(); // Optional: Show the prompt if needed
    }
};
