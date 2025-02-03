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
    // If valid, construct the API URL
    var urlPUT = "https://zenversegames-ba223a40f69e.herokuapp.com/update/" + gameId;

    // Example: Fetch data using the valid urlPUT
    fetch(urlPUT)
        .then((response) => response.json())
        .then((data) => {
            console.log("Game Data:", data);
            // Perform further operations with the fetched data
        })
        .catch((error) => {
            console.error("Error fetching game data:", error);
            alert("Failed to fetch game details. Redirecting...");
            window.location.href = "dashboard.html"; // Redirect on fetch failure
        });
}

export { urlPUT };

export function getResponse(result) {
    console.log(result);  
}