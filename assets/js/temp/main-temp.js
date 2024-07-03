export let fillGame = `
    <a type="button" href="detailed.html?gameId=#guid" class="animate-pulse pointer-events-none block backdrop-blur-xl transform hover:scale-105 hover:backdrop-blur-none transition duration-300 rounded-lg">
        <div class="border-3 p-3 rounded-lg hover:border-purple-500 shadow-lg">
            <div class="hidden md:block h-40 bg-cover bg-center rounded-lg" style="background-image: url(https://ghpn.org/wp-content/uploads/No-Image-Placeholder-1024x576.jpg);"></div>
            <div class="flex items-center md:mt-3">
                <img src="../assets/icon/ui/Image_not_available.png" alt="" width="60" class="rounded-md">
                <div class="flex flex-wrap truncate">
                    <div class="w-auto">
                        <div class="hidden lg:block md:block sm:block ml-4 text-2xl text-white font-semibold">Loading...</div>
                        <div class="hidden lg:block md:block sm:block ml-4 text-md text-white font-semibold">No Rating</div>
                    </div>
                </div>
            </div>
        </div>
    </a>`;
