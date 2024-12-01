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

// Fungsi login dengan Google OAuth
async function googleLogin() {
    try {
        google.accounts.id.initialize({
            client_id: '161294722609-k3mgi3nbmb9ulrpd8hdd3da3rj05l3jg.apps.googleusercontent.com',
            callback: handleCredentialResponse
        });

        google.accounts.id.prompt(); // Menampilkan pop-up untuk login
    } catch (error) {
        console.error("Google login error:", error);
        Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: "An error occurred during Google login.",
        });
    }
}

// Callback untuk menangani token dari Google
function handleCredentialResponse(response) {
    const token = response.credential;

    // Kirim token ke backend untuk login
    fetch('https://zenversegames-ba223a40f69e.herokuapp.com/auth/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: token })
    })
    .then(response => response.json())
    .then(data => {
        if (response.status === 200) {
            localStorage.setItem('token', data.token); // Simpan token JWT

            // Validasi URL redirect
            if (!["https://hrisz.github.io/zenverse_FE/pages/admin/dashboard.html"].includes(data.redirect)) {
                Swal.fire({
                    icon: "warning",
                    title: "Invalid Redirect",
                    text: "Unauthorized redirect URL detected.",
                });
                return;
            }

            Swal.fire({
                icon: "success",
                title: "Login Successful",
                text: "Redirecting to dashboard...",
                timer: 2000,
                showConfirmButton: false
            });
            setTimeout(() => {
                window.location.href = data.redirect; // Redirect ke dashboard
            }, 2000);
        } else {
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: data.message || "Google login failed!",
            });
        }
    })
    .catch(error => {
        console.error("Error:", error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred. Please try again.",
        });
    });
}

// Fungsi menangani callback Google OAuth
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
            const response = await fetch(`https://zenversegames-ba223a40f69e.herokuapp.com/auth/google/callback?code=${code}`);
            const data = await response.json();

            if (response.status === 200) {
                localStorage.setItem('token', data.token);

                // Validasi URL redirect
                if (!["https://hrisz.github.io/zenverse_FE/pages/admin/dashboard.html"].includes(data.redirect)) {
                    Swal.fire({
                        icon: "warning",
                        title: "Invalid Redirect",
                        text: "Unauthorized redirect URL detected.",
                    });
                    return;
                }

                Swal.fire({
                    icon: "success",
                    title: "Login Successful",
                    text: "Redirecting to dashboard...",
                    timer: 2000,
                    showConfirmButton: false
                });
                setTimeout(() => {
                    window.location.href = data.redirect;
                }, 2000);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: data.message || "Google callback failed!",
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
    // Menampilkan Google login prompt secara otomatis saat halaman login dimuat
    googleLogin();

    // Tangani callback dari Google OAuth
    if (window.location.search.includes("code")) {
        handleGoogleCallback();
    }
};
