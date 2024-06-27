import { addInner } from "https://bukulapak.github.io/element/process.js";
import { fillTable } from "../temp/overview-temp.js";
import { totalGames } from "../temp/total-temp.js";
import { notifDisplay } from "../temp/notif-temp.js";

export function fillGameList(results) {
    clearTable()
    clearTotal()
    clearNotif()
    results.forEach(fillTheList);
    results.slice().reverse().forEach(notifGame);
    fillTotal(results.length);
    console.log(results)
}

function fillTheList(value){
    let content = 
    fillTable.replace('<img class="w-10 h-10 rounded-full" id="gameLogo" src="../../assets/icon/blue-logo.png" alt="">', '<img class="w-10 h-10 rounded-full" id="gameLogo" src="' + value.game_logo + '" alt="">')
             .replace('<div id="gameTitle" class="text-transparent h-2 animate-pulse bg-slate-200 rounded col-span-2">#gameTitle#</div>', '<div id="gameTitle" class="text-sm font-medium leading-5 text-gray-900 font-semibold">' + value.name +'</div>')
             .replace('<div id="gameId" class="text-transparent h-2 animate-pulse bg-slate-200 rounded col-span-2" hidden>#gameID#</div>', '<div id="gameId" class="text-xs leading-5 text-gray-500"> ' + value._id + '</div>')
             .replace('<div id="gameDevs" class="text-transparent h-2 animate-pulse bg-slate-200 rounded col-span-2">#gameDevs#</div>', '<div id="gameDevs" class="text-sm font-medium leading-5 text-gray-900 font-semibold">' + value.dev_name.name +'</div>')
             .replace('<div id="gameRating" class="text-transparent h-2 animate-pulse bg-slate-200 rounded col-span-2">#gameRating#</div>', '<div id="gameRating" class="text-sm font-medium leading-5 text-gray-900 font-semibold"> ✦ ' + value.rating + '</div>')
             .replace('<div id="gameGenre" class="text-transparent h-2 animate-pulse bg-slate-200 rounded col-span-2">#gameGenre#</div>', '<div id="gameGenre" class="text-sm font-medium leading-5 text-gray-900 font-semibold"> ' + value.genre + ' </div>')
             .replace("#gameEdit#", value._id)
             .replace("#gameDelete#", value._id)
        addInner("gameList", content);
}

function fillTotal(total) {
    let totalcontent = 
    totalGames.replace('<h4 id="totalGame" class="text-2xl font-semibold text-gray-700">0</h4>', '<h4 id="totalGame" class="text-2xl font-semibold text-gray-700">' + total + '</h4>');
        addInner("totalGameData", totalcontent);
}

function notifGame(value){
    let notifcontent =
    notifDisplay.replace('<img id="logoNotif" class="object-cover w-8 h-8 mx-1 rounded-full" src="https://avatarfiles.alphacoders.com/375/375160.jpeg" alt="game">', '<img class="object-cover w-8 h-8 mx-1 rounded-full" src="' + value.game_logo + '" alt="game">')
                .replace('<span class="font-bold" id="gameNotif" href="#"></span><span class="font-semibold">No data added yet</span>', '<span class="font-bold" id="gameNotif" href="#">' + value.name + '</span><span class="font-semibold"> has been added.</span>')
        addInner("newNotif", notifcontent)
}

function clearTable() {
    const tableBody = document.querySelector('#gameList tbody');
    if (tableBody) {
        tableBody.innerHTML = '';
    }
}

function clearTotal() {
    const totalBody = document.querySelector('#totalGameData div');
    if (totalBody) {
        totalBody.innerHTML = '';
    }
}

function clearNotif() {
    const notifBody = document.querySelector('#newNotif');
    if (notifBody) {
        notifBody.innerHTML = '';
    }
}