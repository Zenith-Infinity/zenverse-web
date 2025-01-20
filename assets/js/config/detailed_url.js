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

    // Example: Fetch data using the valid urlFetch
    fetch(urlFetch)
        .then((response) => response.json())
        .then((data) => {
            console.log("Game Data:", data);
            // Perform further operations with the fetched data
        })
        .catch((error) => {
            console.error("Error fetching game data:", error);
            alert("Failed to fetch game details. Redirecting...");
            window.location.href = "index.html"; // Redirect on fetch failure
        });
}

export { urlFetch };