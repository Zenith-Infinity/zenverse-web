export let fillTable =
`
<tr class="divide-y">
    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div class="flex items-center">
            <div class="flex-shrink-0 w-10 h-10">
                <img class="w-10 h-10 rounded-full" id="gameLogo" src="../../assets/icon/blue-logo.png" alt="">
            </div>

            <div class="ml-4">
                <div id="gameTitle" class="text-transparent h-2 animate-pulse bg-slate-200 rounded col-span-2">#gameTitle#</div>
                <div id="gameId" class="text-transparent h-2 animate-pulse bg-slate-200 rounded col-span-2" hidden>#gameID#</div>
            </div>
        </div>
    </td>

    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div id="gameDevs" class="text-transparent h-2 animate-pulse bg-slate-200 rounded col-span-2">#gameDevs#</div>
    </td>

    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div id="gameRating" class="text-transparent h-2 animate-pulse bg-slate-200 rounded col-span-2">#gameRating#</div>
    </td>

    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div id="gameGenre" class="text-transparent h-2 animate-pulse bg-slate-200 rounded col-span-2">#gameGenre#</div>
    </td>
    <td class="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
        <div class="flex justify-center items-center">
            <a href="editform.html?gameId=#gameEdit#" class="text-white mx-2 px-4 py-1 bg-sky-500 hover:bg-sky-900 rounded-lg">Edit</a>
            <button type="button" id="deleteButton" onclick="confirmDelete('#gameDelete#')" class="text-white px-3 py-1 bg-rose-600 hover:bg-rose-900 rounded-lg">Delete</button>
        </div>
    </td>
</tr>`;