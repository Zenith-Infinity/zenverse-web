import { get } from "https://bukulapak.github.io/api/process.js";
import { fillGame } from "./controller/edit_game.js";
import { urlFetch } from "./config/getall_url.js";
get(urlFetch, fillGame);