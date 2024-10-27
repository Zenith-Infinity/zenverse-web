import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js";
import {addCSS} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.9/element.js";

addCSS("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css");

let splash = document.querySelector('.splash');
let logo = document.querySelector('.splash-header');
let logoSpan = document.querySelectorAll('.splash-logo');

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: true,
    confirmButtonText: "Refresh",
    timer: 10000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

let loadTimeout = setTimeout(() => {
    Toast.fire({
        icon: "warning",
        title: "Page load is slow. Click 'Refresh' to try again."
    }).then((result) => {
        if (result.isConfirmed) {
            location.reload();
        }
    });
}, 5000);

window.onload = () => {

    clearTimeout(loadTimeout);

    setTimeout(() => {
        logoSpan.forEach((span, idx) => {
            setTimeout(() => {
                span.classList.add('active');
            }, (idx + 1) * 400);
        });

        setTimeout(() => {
            logoSpan.forEach((span, idx) => {
                setTimeout(() => {
                    span.classList.remove('active');
                    span.classList.add('fade');
                }, (idx + 1) * 50);
            });
        }, 2000);

        setTimeout(() => {
            splash.style.top = '-100vh';
            splash.style.borderRadius = '0 0 30px 30px';
        }, 2250);
    }, 0);
};
