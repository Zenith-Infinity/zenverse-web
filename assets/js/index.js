import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js";
import {addCSS} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.9/element.js";

addCSS("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css");

async function about() {
    Swal.fire({
        title: "<p class='popup-title bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-violet-400'>About Zenverse</p>",
        imageUrl: "assets/icon/blue-logo.png",
        imageWidth: "60px",
        background: "#222831",
        customClass: {
            container: 'backdrop-blur-sm',
            popup: 'ring-offset-4 ring ring-sky-500 ring-offset-slate-900'
        },
        html: "<p class='popup-text text-gray-400'>Zenverse is a digital distribution platform dedicated to provide immersive worlds and unforgettable experiences.</p>",
        footer: "<p class='popup-text text-gray-400'>This website developed by <span class='bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-violet-400 font-semibold'>Haris</span> and <span class='bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-violet-400 font-semibold'>Rayfan</span></p",
        showConfirmButton: false
      })
}

document.getElementById('aboutButton').addEventListener('click', () => {
    about();
});

window.onload = function() {
    document.getElementById('load-screen').classList.add('hidden');
    document.getElementById('main').classList.add('block');
};