import { postUrl } from "../config/post_url.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("gameForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const captchaResp = grecaptcha.getResponse();

        if (!captchaResp) {
            alert("Please verify the captcha first!");
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
            Preview: document.getElementById("preview").value,
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
                alert(result.message);
                form.reset();
                window.location.href = "main.html";
            }else if (!captchaResp.length > 0) {
                alert("Verified captcha first!");
            }
            else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    });
});
