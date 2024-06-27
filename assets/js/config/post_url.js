export let urlPOST = "https://zenversegames-ba223a40f69e.herokuapp.com/insert";

export function getResponse(result) {
    console.log(result); 
    alert(result.message); 
    window.location.href = "dashboard.html";
}