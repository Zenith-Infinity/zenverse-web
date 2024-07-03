async function logout() {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('You are not logged in');
        window.location.href = '../signmenu.html';
        return;
    }

    try {
        const response = await fetch('https://zenversegames-ba223a40f69e.herokuapp.com/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        if (response.status === 200) {
            localStorage.removeItem('token');
            alert('Logout successful');
            window.location.href = '../signmenu.html';
        } else {
            alert('Logout failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Logout failed');
    }
}

// Event listener for logout button
document.getElementById('logoutButton').addEventListener('click', () => {
    logout();
});
