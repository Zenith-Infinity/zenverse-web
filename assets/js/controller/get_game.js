import { addInner } from "https://bukulapak.github.io/element/process.js";
import { fillTable } from "../temp/overview-temp.js";
import { totalGames } from "../temp/total-temp.js";
import { notifDisplay } from "../temp/notif-temp.js";

const theadContent = `
    <thead>
        <tr>
            <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                Game Name
            </th>
            <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                Developer
            </th>
            <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                Rating
            </th>
            <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                Genre
            </th>
            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
        </tr>
    </thead>
`;

export function fillGameList(results) {
    clearTable();
    clearTotal();
    clearNotif();
    
    let gameListContent = '';

    results.forEach((value) => {
        let content =
            fillTable.replace(
                '<img class="w-10 h-10 rounded-full" id="gameLogo" src="../../assets/icon/blue-logo.png" alt="">',
                '<img class="w-10 h-10 rounded-full" id="gameLogo" src="' + value.game_logo + '" alt="">'
            )
            .replace(
                '<div id="gameTitle" class="text-transparent h-2 animate-pulse bg-slate-200 rounded col-span-2">#gameTitle#</div>',
                '<div id="gameTitle" class="text-sm font-medium leading-5 text-gray-900 font-semibold">' + value.name + '</div>'
            )
            .replace(
                '<div id="gameId" class="text-transparent h-2 animate-pulse bg-slate-200 rounded col-span-2" hidden>#gameID#</div>',
                '<div id="gameId" class="text-xs leading-5 text-gray-500"> ' + value._id + '</div>'
            )
            .replace(
                '<div id="gameDevs" class="text-transparent h-2 animate-pulse bg-slate-200 rounded col-span-2">#gameDevs#</div>',
                '<div id="gameDevs" class="text-sm font-medium leading-5 text-gray-900 font-semibold">' + value.dev_name.name + '</div>'
            )
            .replace(
                '<div id="gameRating" class="text-transparent h-2 animate-pulse bg-slate-200 rounded col-span-2">#gameRating#</div>',
                '<div id="gameRating" class="text-sm font-medium leading-5 text-gray-900 font-semibold"> ✦ ' + value.rating + '</div>'
            )
            .replace(
                '<div id="gameGenre" class="text-transparent h-2 animate-pulse bg-slate-200 rounded col-span-2">#gameGenre#</div>',
                '<div id="gameGenre" class="text-sm font-medium leading-5 text-gray-900 font-semibold"> ' + value.genre + ' </div>'
            )
            .replace('<a href="editform.html?gameId=#gameEdit#" nonce="zen711213" class="text-white mx-2 px-4 py-1 bg-sky-500 hover:bg-sky-900 rounded-lg">Edit</a>', '<a type="button" onclick="saveGameIdAndNavigate(\'' + value._id + '\')" nonce="zen711213" class="text-white mx-2 px-4 py-1 bg-sky-500 hover:bg-sky-900 rounded-lg">Edit</a>')
            .replace("#gameDelete#", value._id);

        gameListContent += content;
    });

    addInner("gameList", gameListContent);

    results.slice(-5).reverse().forEach(notifGame);
    fillTotal(results.length);
}

function fillTotal(total) {
    let totalcontent =
        totalGames.replace(
            '<h4 id="totalGame" class="text-2xl font-semibold text-gray-700">0</h4>',
            '<h4 id="totalGame" class="text-2xl font-semibold text-gray-700">' + total + '</h4>'
        );

    addInner("totalGameData", totalcontent);
}

function notifGame(value) {
    let notifcontent =
        notifDisplay.replace(
            '<img id="logoNotif" class="object-cover w-8 h-8 mx-1 rounded-full" src="https://avatarfiles.alphacoders.com/375/375160.jpeg" alt="game">',
            '<img class="object-cover w-8 h-8 mx-1 rounded-full" src="' + value.game_logo + '" alt="game">'
        )
        .replace(
            '<span class="font-bold" id="gameNotif" href="#"></span><span class="font-semibold">No data added yet</span>',
            '<span class="font-bold" id="gameNotif" href="#">' + value.name + '</span><span class="font-semibold"> has been added.</span>'
        )
        .replace(
            '<a href="#" id="gameId" class="flex items-center px-4 py-3 -mx-2 text-gray-700 hover:text-white hover:bg-blue-500">',
            '<a href="../detailed.html?gameId=' + value._id + '" id="gameId" target="_blank" class="flex items-center px-4 py-3 -mx-2 text-gray-700 hover:text-white hover:bg-blue-500">'
        );

    addInner("newNotif", notifcontent);
}

function clearTable() {
    document.getElementById("gameList").innerHTML = theadContent + '';
}

function clearTotal() {
    document.getElementById("totalGameData").innerHTML = '';
}

function clearNotif() {
    document.getElementById("newNotif").innerHTML = '';
}

document.getElementById('default-search').addEventListener('input', function (e) {
    e.preventDefault();
    const gameName = e.target.value.trim();

    const url = gameName === '' 
        ? 'https://zenversegames-ba223a40f69e.herokuapp.com/games'
        : `https://zenversegames-ba223a40f69e.herokuapp.com/games/search?name=${encodeURIComponent(gameName)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => fillGameList(data))
        .catch(error => console.error('Error fetching games:', error));
});

fetch('https://zenversegames-ba223a40f69e.herokuapp.com/games')
    .then(response => response.json())
    .then(data => fillGameList(data))
    .catch(error => console.error('Error fetching games:', error));
