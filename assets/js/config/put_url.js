// const urlParams = new URLSearchParams(window.location.search);
// const gameId = urlParams.get('gameId');

const gameId = localStorage.getItem("selectedGameId");

// export let urlPUT = "https://zenversegames-ba223a40f69e.herokuapp.com/update/" + gameId;

if (!gameId) {
    alert("No game selected! Redirecting...");
    window.location.href = "dashboard.html";
} else if (!/^[a-fA-F0-9]{24}$/.test(gameId)) {
    alert("Invalid game ID! Redirecting...");
    window.location.href = "dashboard.html";
} else {
    var urlPUT = "https://zenversegames-ba223a40f69e.herokuapp.com/update/" + gameId;
}

export { urlPUT };

export function getResponse(result) {
    console.log(result);  
}