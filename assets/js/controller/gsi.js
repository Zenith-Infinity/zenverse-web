// Fungsi untuk mengarahkan pengguna ke halaman Google OAuth
function redirectToGoogleAuth() {
  window.location.href = "https://zenversegames-ba223a40f69e.herokuapp.com/auth/google";
}

// Fungsi untuk menangani respons dari Google Identity Services (One Tap)
function handleCredentialResponse(response) {
  console.log("Encoded JWT ID token: " + response.credential);

  // Kirim token ke backend untuk verifikasi dan mendapatkan token JWT
  fetch("https://zenversegames-ba223a40f69e.herokuapp.com/auth/google/callback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: response.credential })
  })
  .then(response => response.json())
  .then(data => {
      if (data.token) {
          // Simpan token di localStorage
          localStorage.setItem("jwtToken", data.token);
          alert("Login berhasil!");

          // Arahkan ke halaman dashboard
          window.location.href = "admin/dashboard.html";
      } else {
          alert("Login gagal. Silakan coba lagi.");
      }
  })
  .catch(error => {
      console.error("Error:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
  });
}

// Inisialisasi Google One Tap Sign-In
window.onload = function() {
  google.accounts.id.initialize({
      client_id: "161294722609-k3mgi3nbmb9ulrpd8hdd3da3rj05l3jg.apps.googleusercontent.com",
      callback: handleCredentialResponse
  });

  google.accounts.id.renderButton(
      document.getElementById("signGoogle"),
      {
          theme: "outline",
          size: "large",
          text: "sign_in_with"
      }
  );

  // Menampilkan Google One Tap jika dibutuhkan
  google.accounts.id.prompt();
};
