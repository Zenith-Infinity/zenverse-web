import { postUrl } from "../config/post_url.js";

import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js";
import {addCSS} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.9/element.js";

addCSS("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css");

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("gameForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const captchaResp = grecaptcha.getResponse();

        if (!captchaResp) {
            Swal.fire({
                icon: "warning",
                title: "Captcha Required",
                text: "Please verify the captcha first!",
            });
            return;
        }

        const formData = {
            Name: document.getElementById("gamename").value,
            Dev_name: {
                Name: document.getElementById("devname").value,
                Bio: document.getElementById("aboutdevs").value,
            },
            Genre: document.getElementById("genre").value.split(",").map(genre => genre.trim()),
            Rating: 0,
            Game_logo: document.getElementById("logo").value,
            Game_banner: document.getElementById("banner").value,
            Preview: document.getElementById("preview").value + "?rel=0&modestbranding=1",
            Link_games: document.getElementById("gamelinks").value,
            Desc: document.getElementById("aboutgame").value,
        };

        try {
            const response = await fetch(postUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok && captchaResp) {
                const result = await response.json();
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: result.message,
                }).then(() => {
                    form.reset();
                    window.location.href = "main.html";
                });
            } else if (!captchaResp.length > 0) {
                Swal.fire({
                    icon: "warning",
                    title: "Verification Needed",
                    text: "Please verify the captcha first!",
                });
            } else {
                const errorData = await response.json();
                Swal.fire({
                    icon: "error",
                    title: "Submission Failed",
                    text: `Error: ${errorData.message}`,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Network Error",
                text: `Error: ${error.message}`,
            });
        }
    });
});