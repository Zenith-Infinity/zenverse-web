// const urlParams = new URLSearchParams(window.location.search);
// const gameId = urlParams.get("gameId");

const gameId = localStorage.getItem("selectedGameId");

let urlFetch = ""

if (!gameId) {
    Swal.fire({
      icon: "warning",
      title: "Game unavailable!",
      text: "The game you're looking for has been deleted or not available.",
      timer: 2000,
    });
    setTimeout(() => {
        window.location.href = "main.html";
    }, 2000);
// } else if (!/^[a-fA-F0-9]{24}$/.test(gameId)) {
//     Swal.fire({
//         icon: "warning",
//         title: "Game unavailable!",
//         text: "The game is not available, ",
//         timer: 2000,
//       });
//       setTimeout(() => {
//           window.location.href = "main.html";
//       }, 2000);
} else {
  var decryptUrl = "https://zenversegames-ba223a40f69e.herokuapp.com/decrypt?encrypted_id=" + gameId;

  fetch(decryptUrl, { method: "GET" })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Failed to decrypt game ID");
      }
    })
    .then((data) => {
      const decryptedId = data.decrypted_id;
      localStorage.setItem("decid", decryptedId);

      urlFetch = "https://zenversegames-ba223a40f69e.herokuapp.com/games/" + decryptedId;

      return fetch("https://zenversegames-ba223a40f69e.herokuapp.com/encrypt?id=" + decryptedId, { method: "GET" });
    })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Failed to encrypt game ID");
      }
    })
    .then((data) => {
      localStorage.setItem("selectedGameId", data.encrypted_id);
      localStorage.removeItem("encid");
      localStorage.removeItem("decid");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export { urlFetch };