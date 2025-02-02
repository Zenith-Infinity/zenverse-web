import { fillDetailGame } from "./controller/get_detail.js";
import { urlFetch } from "./config/detailed_url.js";

function safeGet(target_url, responseFunction) {
    fetch(target_url, { method: "GET" })
      .then(response => {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return response.json();
        } else {
          throw new Error("Response is not valid JSON");
        }
      })
      .then(data => responseFunction(data))
      .catch(error => console.error("Error:", error));
  }
  
  // Use safeGet instead of get
  setTimeout(() => {
    if (urlFetch) {
      safeGet(urlFetch, fillDetailGame);
    } else {
      console.error("urlFetch is not set yet");
    }
  }, 500);