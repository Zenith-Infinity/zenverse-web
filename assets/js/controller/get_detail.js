import { setInner } from "https://bukulapak.github.io/element/process.js";
import { fillDetailed, pageTitle } from "../temp/detailed-temp.js";

export function fillDetailGame(result) {

    if (Array.isArray(result)) {
        result.forEach(fillPageTitle);
        result.forEach(fillAllDetail);
    } else {
        fillPageTitle(result);
        fillAllDetail(result);
    }
}

function fillAllDetail(value) {
    let content = 
    fillDetailed.replace('<img id="gameIcon" src="../assets/icon/ui/Image_not_available.png" class="rounded-lg md:w-24 w-20" alt="Game Logo">', '<img id="gameIcon" src="' + value.game_logo +'" class="rounded-lg md:w-24 w-20" alt="Game Logo">')
              .replace('<div id="gameBanner" class="bg-local bg-center bg-no-repeat bg-cover flex flex-col justify-end" style="background-image: url(https://i.pinimg.com/originals/a1/d1/1b/a1d11b66e8ac37f1b7a1aee4c0226502.jpg); height: 100vh;">', '<div id="gameBanner" class="bg-local bg-center bg-no-repeat bg-cover flex flex-col justify-end" style="background-image: url(' + value.game_banner + '); height: 100vh;">')
              .replace('<h1 id="gameTitle" class="text-white md:text-5xl sm:text-4xl text-2xl font-bold md:ml-4 sm:ml-4">Name Unavailable</h1>', '<h1 id="gameTitle" class="text-white md:text-5xl sm:text-4xl text-2xl font-bold md:ml-4 sm:ml-4">' + value.name + '</h1>')
              .replace('<p id="gameDevs" class="text-sky-500 font-medium text-md py-1 px-1 md:ml-4 sm:ml-4">Devs N/A</p>', '<p id="gameDevs" class="text-sky-500 font-medium text-md py-1 px-1 md:ml-4 sm:ml-4">' + value.dev_name.name + '</p>')
              .replace('<span id="gameRate">No Rating</span>', '<span id="gameRate">' + value.rating + '</span>')
              .replace('<span id="gameGenre" class="px-2 md:font-regular font-thin rounded-md bg-gradient-to-r from-pink-500/50 to-violet-500/50">Genre Unavailable</span>', '<span id="gameGenre" class="px-2 md:font-regular font-thin rounded-md bg-gradient-to-r from-pink-500/50 to-violet-500/50">' + value.genre.join(", ") + '</span>')
              .replace('<a id="gameLink" href="#gameDetails">', '<a id="gameLink" href="' + value.link_games + '">')
              .replace('<p id="gameDesc" class="overflow-y-auto max-h-60 md:pr-20 text-white text-left text-pretty">Description not available...</p>', '<p id="gameDesc" class="overflow-y-auto max-h-60 md:pr-20 text-white text-left text-pretty">' + value.desc + '</p>')
              .replace('<iframe id="previewURL" class="md:w-[90%] aspect-video" src="https://www.youtube.com/embed/qqnEjmnitgc?rel=0&modestbranding=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', '<iframe id="previewURL" class="md:w-[90%] aspect-video" src="' + value.preview + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>')
              .replace('<span id="devDesc" class="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Anon Devs</span>', '<span id="devDesc" class="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">' + value.dev_name.name + '</span>')
              .replace('<span id="rateDesc">N/A</span>', '<span id="rateDesc">' + value.rating + '</span>')
              .replace('<span id="genreDesc">.....</span>', '<span id="genreDesc">' + value.genre.join(", ") + '</span>')
              .replace('<span id="bioDesc">Developer bio should be here</span>', '<span id="bioDesc">' + value.dev_name.bio + '</span>');

    setInner("detailGame", content);
}

function fillPageTitle(value) {
    let titlecon =
    pageTitle.replace('<title id="detailTitle">Game Detail | Zenverse</title>', (value.name ? value.name : 'Game Not Found')  + ' | Zenverse')
    setInner("detailTitle", titlecon)
}

export function get(target_url, responseFunction) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(target_url, requestOptions)
        .then(response => response.json()) 
        .then(result => responseFunction(result))
        .catch(error => console.log('error', error));
}