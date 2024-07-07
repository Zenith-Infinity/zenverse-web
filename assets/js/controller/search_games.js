$(document).ready(function () {
    $('#default-search').on('input', function (e) {
        e.preventDefault();

        var gameName = $('#default-search').val().trim();

        $.ajax({
            url: 'https://zenversegames-ba223a40f69e.herokuapp.com/games/search',
            type: 'GET',
            data: { name: gameName },
            success: function (data) {
                var tbody = $('#gameList tbody');
                tbody.empty();

                if (data.length > 0) {
                    data.forEach(function (game) {
                        var tr = $('<tr>');
                        tr.append('<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">' +
                            '<div class="flex items-center">' +
                            '<div class="flex-shrink-0 w-10 h-10">' +
                            '<img class="w-10 h-10 rounded-full" src="' + game.game_logo + '" alt="">' +
                            '</div>' +
                            '<div class="ml-4">' +
                            '<div class="text-sm font-medium leading-5 text-gray-900">' + game.name + '</div>' +
                            '<div class="text-sm leading-5 text-gray-500" hidden>' + game._id + '</div>' +
                            '</div>' +
                            '</div>' +
                            '</td>');

                        tr.append('<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">' +
                            '<div class="text-sm leading-5 text-gray-900">' + (game.dev_name ? game.dev_name.name : '') + '</div>' +
                            '</td>');

                        tr.append('<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">' +
                            '<div class="text-sm leading-5 text-gray-900">' + game.rating + '</div>' +
                            '</td>');

                        tr.append('<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">' +
                            '<div class="text-sm leading-5 text-gray-900">' + game.genre.join(', ') + '</div>' +
                            '</td>');

                        tr.append('<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">' +
                            '<div class="flex justify-center items-center">' +
                            '<a href="editform.html?gameId=' + game._id + '" class="text-white mx-2 px-4 py-1 bg-sky-500 hover:bg-sky-900 rounded-lg">Edit</a>' +
                            '<button type="button" class="text-white px-3 py-1 bg-rose-600 hover:bg-rose-900 rounded-lg" onclick="confirmDelete(\'' + game._id + '\')">Delete</button>' +
                            '</div>' +
                            '</td>');

                        tbody.append(tr);
                    });
                } else {
                    tbody.append('<tr><td colspan="5" class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center">No games found</td></tr>');
                }
            },
            error: function (xhr, status, error) {
                console.error('Error fetching games:', error);
            }
        });
    });
});
