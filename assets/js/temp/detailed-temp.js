export let fillDetailed =
`
    <section id="gameDetails">
        <div id="gameBanner" class="bg-local bg-center bg-no-repeat bg-cover flex flex-col justify-end" style="background-image: url(https://i.pinimg.com/originals/a1/d1/1b/a1d11b66e8ac37f1b7a1aee4c0226502.jpg); height: 100vh;">
            <div class="shadow-mask py-20 md:pl-20 pl-5 flex-1 flex items-end">
        
                <!-- Game Info -->
                <div class="container-lg">
                    <div class="flex items-center">
                        <span>
                            <img id="gameIcon" src="../assets/icon/ui/Image_not_available.png" class="rounded-lg md:w-24 w-20" alt="Game Logo">
                        </span>
                        <div class="flex flex-col">
                            <div class="md:p-2 sm:p-2 p-1">
                                <h1 id="gameTitle" class="text-white md:text-5xl sm:text-4xl text-2xl font-bold md:ml-4 sm:ml-4">Name Unavailable</h1>
                                <p id="gameDevs" class="text-sky-500 font-medium text-md py-1 px-1 md:ml-4 sm:ml-4">Devs N/A</p>
                            </div>
                        </div>
                    </div>
                    <div class="py-3">
                        <h1 class="text-white md:text-2xl sm:text-xl text-lg font-bold md:ml-4 sm:ml-4"><span class="md:text-3xl sm:text-2xl text-xl">★</span> <span id="gameRate">No Rating</span> | <span id="gameGenre" class="px-2 md:font-regular font-thin rounded-md bg-gradient-to-r from-pink-500/50 to-violet-500/50">Genre Unavailable</span></h1>
                    </div>
                    <div class="py-2 flex gap-4">
                        <a id="gameLink" href="#gameDetails">
                            <button class="py-2 px-3 text-white bg-blue-500 hover:bg-gray-900 rounded truncate shadow-transparent hover:shadow-lg hover:shadow-blue-500/50">Download Game</button>
                        </a>
                        <a href="#infoDetails">
                            <button class="py-2 px-3 text-white bg-transparent backdrop-blur-lg ring-2 ring-blue-700 hover:ring-0 hover:bg-white hover:text-gray-900 hover:font-semibold rounded truncate">Detail Info</button>
                        </a>
                    </div>
                </div>
            </div>
        </div> 
    </section>

    <section id="infoDetails">
        <div class="container-lg md:pl-20 px-20 py-20 bg-zinc-900" style="height: 110vh;">
            <p class="md:pl-5 text-center flex text-md md:justify-start justify-center items-center md:text-4xl text-2xl font-semibold border-4 border-transparent md:border-l-white md:border-r-transparent border-x-white bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">About Game</p>
            <div class="container max-w-screen py-5 md:px-5 sm:px-5">
                <p id="gameDesc" class="overflow-y-auto max-h-60 md:pr-20 text-white text-left text-pretty">Description not available...</p>
            </div>

            <div class="grid md:grid-cols-2 grid-cols-1 gap-4 place-items-stretch pt-10">
                <div class="container w-full">
                    <p class="md:pl-5 text-center flex text-md md:justify-start justify-center items-center md:text-4xl text-2xl font-semibold md:border-4 border-2 border-transparent md:border-l-white md:border-r-transparent md:border-b-transparent border-b-white bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">Preview</p>
                    <div class="w-full pt-6 flex justify-center items-center">
                        <iframe id="previewURL" class="md:w-[90%] aspect-video" src="https://www.youtube.com/embed/qqnEjmnitgc?rel=0&modestbranding=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>
                <div class="container md:pt-0 pt-10">
                    <p class="md:pl-5 text-center flex text-md md:justify-start justify-center items-center md:text-4xl text-2xl font-semibold border-4 border-transparent md:border-l-white md:border-r-transparent border-x-white bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">Developer</p>
                    <div class="w-full pt-6">
                        <p class="md:pl-5 overflow-y-auto max-h-32 md:pr-20 text-white text-left text-pretty">
                            This game is made by <span id="devDesc" class="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Anon Devs</span> with rating ★<span id="rateDesc">N/A</span> from IGN, genre of this game are about <span id="genreDesc">.....</span>. <span id="bioDesc">Developer bio should be here</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>`;