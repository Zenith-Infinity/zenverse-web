import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js";
import {addCSS} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.9/element.js";

addCSS("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css");

async function logout() {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('You are not logged in');
        window.location.href = '../signmenu.html';
        return;
    }

    try {
        const response = await fetch('https://zenversegames-ba223a40f69e.herokuapp.com/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        if (response.status === 200) {
            localStorage.removeItem('token');
            localStorage.removeItem('alertShown');
            Swal.fire({
                icon: "success",
                title: "Logout Successful",
                text: "You will be directed to login page",
                timer: 2000,
                backdrop: true,
                customClass: {
                    container: 'backdrop-blur-md',
                },
                showConfirmButton: false
              });
              setTimeout(() => {
                window.location.href = '../signmenu.html';
              }, 2000);
        } else {
            Swal.fire({
                icon: "error",
                title: "Logout Failed",
            });
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Logout Failed",
            customClass: {
                container: 'backdrop-blur-md',
            },
            text: console.error(error)
        });
    }
}

// Event listener for logout button
document.getElementById('logoutButton').addEventListener('click', () => {
    logout();
});
