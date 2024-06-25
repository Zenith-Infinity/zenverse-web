function handleToggle(event) {
    event.preventDefault();

    const formContainer = document.getElementById('formContainer');
    const form = document.getElementById('form');
    const toggleText = document.getElementById('whatForm');

    formContainer.classList.add('opacity-0');

    setTimeout(() => {
        if (isLoginForm) {
            form.innerHTML = `
                <div class="mb-4">
                    <label for="email" class="block text-sm font-medium text-white">Email</label>
                    <input type="email" id="email" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm focus:font-semibold" placeholder="abigailnad@zenverse.com">
                </div>
                <div class="mb-4">
                    <label for="username" class="block text-sm font-medium text-white">Username</label>
                    <input type="text" id="username" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm focus:font-semibold" placeholder="Zenith Interactive">
                </div>
                <div class="mb-6">
                    <label for="password" class="block text-sm font-medium text-white">Password</label>
                    <input type="password" id="password" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm focus:font-semibold" placeholder="********">
                </div>
                <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Sign up</button>
            `;
            toggleText.innerHTML = 'Already have an account? <a href="#" class="text-blue-500" id="toggleForm">Login</a>';
        } else {
            form.innerHTML = `
                <div class="mb-4">
                    <label for="username" class="block text-sm font-medium text-white">Email</label>
                    <input type="username" id="username" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm focus:font-semibold" placeholder="abigailnad">
                </div>
                <div class="mb-6">
                    <label for="password" class="block text-sm font-medium text-white">Password</label>
                    <input type="password" id="password" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm focus:font-semibold" placeholder="********">
                </div>
                <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Login</button>
            `;
            toggleText.innerHTML = "Don't have an account? " + '<a href="#" class="text-blue-500" id="toggleForm">Sign up</a>';
        }

        isLoginForm = !isLoginForm;

        setTimeout(() => {
            formContainer.classList.remove('opacity-0');
            formContainer.classList.add('opacity-100');

            // Re-bind the event listener to the new toggle link
            document.getElementById('toggleForm').addEventListener('click', handleToggle);
        }, 10);
    }, 500);
}

let isLoginForm = true;
document.getElementById('toggleForm').addEventListener('click', handleToggle);