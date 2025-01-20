// const urlParams = new URLSearchParams(window.location.search);
// const gameId = urlParams.get("gameId");

const gameId = localStorage.getItem("selectedGameId");


if (!gameId) {
    alert("No game selected! Redirecting...");
    window.location.href = "index.html";
} else if (!/^[a-fA-F0-9]{24}$/.test(gameId)) {
    alert("Invalid game ID! Redirecting...");
    window.location.href = "index.html";
} else {
    // If valid, construct the API URL
    var urlFetch = "https://zenversegames-ba223a40f69e.herokuapp.com/games/" + gameId;

}

export { urlFetch };