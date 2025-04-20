import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js";
import {addCSS} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.9/element.js";

addCSS("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css");

document.getElementById('changePass').addEventListener('click', async () => {
  const { value: formValues } = await Swal.fire({
      title: "Change Password",
      html:
          '<input id="currPassword" type="password" class="swal2-input" placeholder="Current Password">' +
          '<input id="newPassword" type="password" class="swal2-input" placeholder="New Password">',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Change",
      cancelButtonText: "Cancel",
      preConfirm: () => {
          return {
              old_password: document.getElementById("currPassword").value,
              new_password: document.getElementById("newPassword").value
          };
      }
  });

  if (!formValues) {
      return;
  }

  const token = localStorage.getItem('token');
  const csrfToken = localStorage.getItem('csrf_token') || document.cookie.replace(/(?:(?:^|.*;\s*)csrf_token\s*=\s*([^;]*).*$)|^.*$/, "$1");

  try {
      const response = await fetch('https://zenversegames-ba223a40f69e.herokuapp.com/update-password', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token,
              'X-CSRF-Token': csrfToken
          },
          body: JSON.stringify(formValues)
      });

      const data = await response.json();

      if (response.ok) {
          Swal.fire({
              icon: "success",
              title: "Password Updated",
              text: "Your password has been successfully updated!",
              timer: 2000,
              showConfirmButton: false
          });
      } else {
          Swal.fire({
              icon: "error",
              title: "Error",
              text: data.message,
              timer: 2000,
              showConfirmButton: false
          });
      }
  } catch (error) {
      Swal.fire({
          icon: "error",
          title: "Request Failed",
          text: "An error occurred while updating the password.",
          timer: 2000,
          showConfirmButton: false
      });
  }
});