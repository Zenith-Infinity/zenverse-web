const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get("gameId");

export let urlFetch = "https://zenversegames-ba223a40f69e.herokuapp.com/games/" + gameId;