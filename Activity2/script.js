// RUBY ALBUM SONG DATA
var songs = [
    {
        title: "Intro : JANE",
        artist: "JENNIE, FKJ",
        image: "assets/images/intro-jane.png"
    },
    {
        title: "like JENNIE",
        artist: "JENNIE",
        image: "assets/images/like-jennie.png"
    },
    {
        title: "start a war",
        artist: "JENNIE",
        image: "assets/images/start-a-war.png"
    },
    {
        title: "Handlebars",
        artist: "JENNIE, Dua Lipa",
        image: "assets/images/handebars.png"
    },
    {
        title: "with the IE (way up)",
        artist: "JENNIE",
        image: "assets/images/with-the-ie.png"
    },
    {
        title: "ExtraL",
        artist: "JENNIE, Doechii",
        image: "assets/images/extral.png"
    },
    {
        title: "Mantra",
        artist: "JENNIE",
        image: "assets/images/mantra.png"
    },
    {
        title: "Love Hangover",
        artist: "JENNIE, Dominic Fike",
        image: "assets/images/love-hangover.png"
    },
    {
        title: "ZEN",
        artist: "JENNIE",
        image: "assets/images/zen.png"
    },
    {
        title: "Damn Right",
        artist: "JENNIE, Childish Gambino, Kali Uchis",
        image: "assets/images/damn-right.png"
    },
    {
        title: "F.T.S.",
        artist: "JENNIE",
        image: "assets/images/fts.png"
    },
    {
        title: "Filter",
        artist: "JENNIE",
        image: "assets/images/filter.png"
    },
    {
        title: "Seoul City",
        artist: "JENNIE",
        image: "assets/images/seoul-city.png"
    },
    {
        title: "Starlight",
        artist: "JENNIE",
        image: "assets/images/starlight.png"
    },
    {
        title: "twin",
        artist: "JENNIE",
        image: "assets/images/twin.png"
    }
];

// GET THE HTML CONTAINER
var parent = document.getElementById("song-list");

// GENERATE THE SONG CARDS
for (var i = 0; i < songs.length; i++) {

    parent.innerHTML += `
        <div class="col-6 col-md-4 col-lg-3">

            <div class="song-card">

                <div class="song-art">
                    <img
                        src="${songs[i].image}"
                        alt="${songs[i].title} song artwork"
                        loading="lazy"
                    >
                </div>

                <div class="song-info">

                    <p class="song-number">
                        TRACK ${String(i + 1).padStart(2, "0")}
                    </p>

                    <h3 class="song-title">
                        ${songs[i].title}
                    </h3>

                    <p class="song-artist">
                        ${songs[i].artist}
                    </p>

                    <a
                        href="https://jennie.lnk.to/Ruby"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="song-button"
                    >
                        LISTEN ↗
                    </a>

                </div>

            </div>

        </div>
    `;
}