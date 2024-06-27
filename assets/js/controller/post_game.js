import { postData } from "https://bukulapak.github.io/api/process.js";
import { onClick, getValue } from "https://bukulapak.github.io/element/process.js";
import { urlPOST, getResponse} from "../config/post_url.js";


function pushData(){

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
    postData(urlPOST, data, getResponse);

}

onClick("button", pushData);