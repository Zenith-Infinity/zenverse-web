// Fungsi untuk mengarahkan pengguna ke halaman Google OAuth
function redirectToGoogleAuth() {
    window.location.href = "https://zenversegames-ba223a40f69e.herokuapp.com/auth/google";
}

// Fungsi untuk memeriksa token di URL dan menyimpannya di localStorage
function saveTokenFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
        // Simpan token di localStorage
        localStorage.setItem("jwtToken", token);

        // Hapus token dari URL (untuk keamanan)
        window.history.replaceState({}, document.title, window.location.pathname);

        alert("Login berhasil!");
        // Arahkan pengguna ke dashboard
        window.location.href = "/admin/dashboard.html";
    }
}

// Panggil fungsi saat halaman dimuat untuk memeriksa apakah ada token di URL
window.onload = function() {
    saveTokenFromUrl();

    // Inisialisasi tombol Google Sign-In jika di halaman login
    if (document.getElementById("signGoogle")) {
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
    }
};
