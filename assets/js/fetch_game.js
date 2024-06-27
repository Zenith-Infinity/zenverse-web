import { get } from "https://bukulapak.github.io/api/process.js";
import { fillGameList } from "./controller/get_game.js";
import { urlAPI } from "./config/url.js";
get(urlAPI, fillGameList);