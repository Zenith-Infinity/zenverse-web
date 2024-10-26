import { addInner } from "https://bukulapak.github.io/element/process.js";
import { fillGame } from "../temp/main-temp.js";

export function fillGameList(results) {
    results.forEach(fillTheList);
    console.log(results)
}

function fillTheList(value){

    if (value.rating === 1) return;
    
    let content = 
    fillGame.replace('<div class="hidden lg:block md:block sm:block ml-4 text-2xl text-white font-semibold">Loading...</div>', '<div class="ml-4 text-2xl text-white text-hov font-semibold truncate">' + value.name + '</div>')
            .replace('<div class="hidden lg:block md:block sm:block ml-4 text-md text-white font-semibold">No Rating</div>','<div class="hidden lg:block md:block sm:block ml-4 text-md text-white font-semibold"><span class="text-yellow-500">★</span> ' + value.rating + '</div>')
            .replace('<img src="../assets/icon/ui/Image_not_available.png" alt="" width="60" class="rounded-md">', '<img src="' + value.game_logo + '" alt="" width="60" class="rounded-md">')
            .replace('<div class="hidden md:block h-40 bg-cover bg-center rounded-lg" style="background-image: url(https://ghpn.org/wp-content/uploads/No-Image-Placeholder-1024x576.jpg);">', '<div class="hidden md:block h-40 bg-cover bg-center rounded-lg" style="background-image: url(' + value.game_banner + ');">')
            .replace('<a type="button" href="detailed.html?gameId=#guid" class="animate-pulse pointer-events-none block backdrop-blur-xl transform hover:scale-105 hover:backdrop-blur-none transition duration-300 rounded-lg">', '<a type="button" href="detailed.html?gameId=' + value._id + '" class="block backdrop-blur-xl transform hover:scale-105 hover:backdrop-blur-none transition duration-300 rounded-lg">')
        addInner("games", content);
}