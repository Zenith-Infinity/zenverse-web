const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('gameId');

export let urlPUT = "https://zenversegames-ba223a40f69e.herokuapp.com/update/" + gameId;

export function getResponse(result) {
    console.log(result); 
    alert(result.message); 
    window.location.href = "dashboard.html";
}