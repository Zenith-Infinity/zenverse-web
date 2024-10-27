import { putData } from "https://bukulapak.github.io/api/process.js";
import { onClick, getValue } from "https://bukulapak.github.io/element/process.js";
import { urlPUT, getResponse} from "../config/put_url.js";

import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js";
import {addCSS} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.9/element.js";

addCSS("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css");

async function update() {
    Swal.fire({
        title: "Confirm Update?",
        text: "Make sure you update the right one so it won't take alot times to update again",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `Nevermind`,
      }).then((result) => {
        if (result.isConfirmed) {
            pushData()
        } else if (result.isDenied) {
        //   Nothing happen
        }
      });
}

document.getElementById('button').addEventListener('click', () => {
    update();
});

function pushData(){

    var requiredFields = ['gamename', 'devname', 'genre', 'rating', 'logo', 'banner', 'preview', 'gamelinks', 'aboutgame', 'aboutdevs'];
    var valid = true;

    requiredFields.forEach(function(field) {
        var input = document.getElementById(field);
        if (!input.value) {
            valid = false;
            input.classList.add('border-red-500');
            input.classList.remove('border-gray-300');
        } else {
            input.classList.remove('border-red-500');
            input.classList.add('border-gray-300');
        }
    });

    if (!valid) {
        Swal.fire({
            icon: "warning",
            title: "Cannot Update Data!",
            text: "Fill all the form first before updating.",
            timer: 2000,
            backdrop: true,
            customClass: {
                container: 'backdrop-blur-md',
            },
            showConfirmButton: false
        });
    }

    if (valid) {
        var genre = getValue("genre");

        let data = {
            name : getValue("gamename"),
            rating : parseFloat(getValue("rating")),
            desc : getValue("aboutgame"),
            genre : genre.split(","),
            dev_name : {
                name : getValue("devname"),
                bio : getValue("aboutdevs"),
            },
            game_banner : getValue("banner"),
            preview : getValue("preview"),
            link_games : getValue("gamelinks"),
            game_logo : getValue('logo')
        }
        putData(urlPUT, data, function(response) {
            getResponse(response);
            localStorage.setItem('updateToast', 'true');
            window.location.href = 'dashboard.html';
        });
    }
}