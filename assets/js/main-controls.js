import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js";
import {addCSS} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.9/element.js";

addCSS("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css");

tailwind.config = {
    theme: {
      extend: {
        brightness: {
          25: '0.25',
          35: '0.35',
        },
      },
    },
  };

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

function updateImageBrightness() {
    const indicators = document.querySelectorAll('.carousel-indicators span');
    indicators.forEach((span) => {
      const button = span.querySelector('button');
      const img = span.querySelector('img');
      if (button.getAttribute('aria-current') === "true") {
        img.classList.remove('brightness-50');
      } else {
        img.classList.add('brightness-50');
      }
    });
  }

  // Initialize brightness on page load
  updateImageBrightness();

  // Listen for changes in the carousel
  const carousel = document.querySelector('#carouselExampleSlidesOnly');
  carousel.addEventListener('slid.bs.carousel', updateImageBrightness);
