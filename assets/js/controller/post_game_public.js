import { postUrl } from "../config/post_url.js";

import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js";
import {addCSS} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.9/element.js";

addCSS("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css");

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("gameForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const gameName = document.getElementById("gamename").value.trim();
        const devName = document.getElementById("devname").value.trim();
        const aboutDevs = document.getElementById("aboutdevs").value.trim();
        const genre = document.getElementById("genre").value.trim();
        const aboutGame = document.getElementById("aboutgame").value.trim();
        const logoUrl = document.getElementById("logo").value;
        const bannerUrl = document.getElementById("banner").value;
        const previewUrl = document.getElementById("preview").value;
        const gameLinkUrl = document.getElementById("gamelinks").value;
        const youtubeEmbedRegex = /^https:\/\/www\.youtube\.com\/embed\/[\w-]+$/;
        const captchaResp = grecaptcha.getResponse();
        const imageRegex = /\.(jpg|jpeg|png|webp)$/i;
        const urlRegex = /^https:\/\/[\w.-]+(?:\.[\w\.-]+)+[^\s]*$/;

        if (
            !gameName ||
            !devName ||
            !aboutDevs ||
            !genre ||
            !logoUrl ||
            !bannerUrl ||
            !previewUrl ||
            !gameLinkUrl ||
            !aboutGame
        ) {
            Swal.fire({
                icon: "error",
                title: "Failed to Submit",
                text: "Fill all the fields before submit.",
            });
            return;
        }

        if (!imageRegex.test(logoUrl)) {
            Swal.fire({
                icon: "error",
                title: "Invalid Logo URL",
                text: "The Game Logo URL must end with a valid image extension (.jpg, .jpeg, .png, .webp).",
            });
            return;
        }

        if (!imageRegex.test(bannerUrl)) {
            Swal.fire({
                icon: "error",
                title: "Invalid Banner URL",
                text: "The Game Banner URL must end with a valid image extension (.jpg, .jpeg, .png, .gif, .webp).",
            });
            return;
        }

        if (!youtubeEmbedRegex.test(previewUrl)) {
            Swal.fire({
                icon: "error",
                title: "Invalid Preview URL",
                text: "The Preview field must contain a valid YouTube embed URL, starting with 'https://www.youtube.com/embed/' followed by the video ID.",
            });
            return;
        }

        if (!urlRegex.test(gameLinkUrl)) {
            Swal.fire({
                icon: "error",
                title: "Invalid Game Link URL",
                text: "The Game Link field must contain a valid URL that starts with 'https://'.",
            });
            return;
        }

        if (!captchaResp) {
            Swal.fire({
                icon: "warning",
                title: "Captcha Required",
                text: "Please verify the captcha first!",
            });
            return;
        }

        const csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");


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
                    "X-CSRF-Token": csrfToken,
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