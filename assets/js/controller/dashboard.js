import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js";
import {addCSS} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.9/element.js";

addCSS("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css");

document.addEventListener('DOMContentLoaded', async () => {
    // Cek token di localStorage atau query string
    let token = localStorage.getItem('token');
    if (!token) {
        // Ambil token dari query string setelah login Google OAuth
        const urlParams = new URLSearchParams(window.location.search);
        token = urlParams.get('token');
        if (token) {
            // Simpan token dari Google OAuth di localStorage
            localStorage.setItem('token', token);
            // Bersihkan token dari URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }

    if (!token) {
        Swal.fire({
            icon: "warning",
            title: "Can't Access Dashboard",
            text: "You need to login before accessing dashboard!",
            timer: 2000,
            customClass: {
                container: 'backdrop-blur-md',
            },
            showConfirmButton: false
        });
        setTimeout(() => {
            window.location.href = '../signmenu.html';
        }, 2000);
        return;
    }

    try {
      const csrfToken = localStorage.getItem('csrf_token') || document.cookie.replace(/(?:(?:^|.*;\s*)csrf_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        // Kirim permintaan ke backend menggunakan token
        const response = await fetch('https://zenversegames-ba223a40f69e.herokuapp.com/dashboard', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'X-CSRF-Token': csrfToken
            }
        });
        const data = await response.json();

        if (response.status === 200) {
          document.getElementById("nameAdmin").textContent = "Admin " + data.name;
            if (!localStorage.getItem('alertShown')) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    backdrop: false,
                    customClass: {
                        container: 'no-blur-container',
                    },
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "Anda telah masuk",
                    text: "Selamat datang, Admin " + data.name,
                });
                localStorage.setItem('alertShown', 'true');
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Access Restricted",
                text: data.message,
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
        }
    } catch (error) {
        console.error("Error:", error);
        Swal.fire({
            icon: "error",
            title: "Access Restricted",
            text: "Unable to access the dashboard due to an error.",
            timer: 2000,
            backdrop: true,
            customClass: {
                container: 'backdrop-blur-md',
            },
            showConfirmButton: false
        });
        // setTimeout(() => {
        //     window.location.href = '../signmenu.html';
        // }, 2000);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('cancelToast') === 'true') {

      localStorage.removeItem('cancelToast');
  
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
  
      Toast.fire({
        icon: "info",
        title: "You canceled the action."
      });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('updateToast') === 'true') {

      localStorage.removeItem('updateToast');
  
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
  
      Toast.fire({
        icon: "info",
        title: "Successfuly update the data."
      });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('submitToast') === 'true') {

      localStorage.removeItem('submitToast');
  
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
  
      Toast.fire({
        icon: "info",
        title: "Successfuly submit the data."
      });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('deleteToast') === 'true') {

      localStorage.removeItem('deleteToast');
  
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
  
      Toast.fire({
        icon: "info",
        title: "Successfuly delete the data."
      });
    }
});