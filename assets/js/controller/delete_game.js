function confirmDelete(gameDelete) {
    if (confirm("Delete data with ID " + gameDelete + "?")) {
        deleteData(gameDelete);
    }
}

function deleteData(gameDelete) {
    var gameId = gameDelete;
    var target_url = "https://zenversegames-ba223a40f69e.herokuapp.com/delete/" + gameId;

    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };

    fetch(target_url, requestOptions)
        .then(response => response.json())
        .then(result => {
            alert(result.message);
            location.reload();
        })
        .catch(error => console.log('Error:', error));
}