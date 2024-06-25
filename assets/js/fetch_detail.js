import { get } from "https://bukulapak.github.io/api/process.js";
import { fillDetailGame } from "./controller/get_detail.js";
import { urlFetch } from "./config/detailed_url.js";
get(urlFetch, fillDetailGame);