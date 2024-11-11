function onSignIn(googleUser) {
    window.location.href = "https://zenversegames-ba223a40f69e.herokuapp.com/auth/google";
  }

  // Mendapatkan token dari URL atau melakukan request jika dibutuhkan
fetch("https://zenversegames-ba223a40f69e.herokuapp.com/auth/google/callback")
.then(response => response.json())
.then(data => {
  if (data.token) {
    // Simpan token di localStorage
    localStorage.setItem("jwtToken", data.token);
    alert("Login berhasil!");
    // Arahkan ke halaman dashboard atau halaman admin
    window.location.href = "admin/dashboard.html";
  } else {
    alert("Login gagal. Silakan coba lagi.");
  }
})
.catch(error => {
  console.error("Error:", error);
  alert("Terjadi kesalahan. Silakan coba lagi.");
});
