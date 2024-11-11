import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js";
import {addCSS} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.9/element.js";

addCSS("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css");

function confirmDelete(gameDelete) {
    Swal.fire({
        title: 'Are you sure?',
        text: "Delete data with ID " + gameDelete + "?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.setItem('deleteToast', 'true');
            deleteData(gameDelete);
        }
    });
}

window.confirmDelete = confirmDelete;

function deleteData(gameDelete) {
    var gameId = gameDelete;
    var target_url = "https://asia-southeast2-backend-438507.cloudfunctions.net/parkirgratisbackend/data/tempat/" + gameId;

    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };

    fetch(target_url, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            location.reload();
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong! Please try again.',
            });
            console.log('Error:', error);
        });
}
