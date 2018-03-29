const songs = [{
    title: "Ecstasy",
    author: "ATB",
    src: "ATB-Ecstasy.mp3",
    img: "https://i.ytimg.com/vi/Ww9UY82KOgg/maxresdefault.jpg"
}, {
    title: "Orbion",
    author: "Armin van Buuren",
    src: "Armin van Buuren-Orbion.mp3",
    img: "https://i.ytimg.com/vi/Two5tRde_3Q/maxresdefault.jpg"
}, {
    title: "Another Love",
    author: "Tom Odell",
    src: "Tom Odell-Another Love.mp3",
    img: "https://i.ytimg.com/vi/02HIyrhn-4Q/maxresdefault.jpg"
}, {
    title: "Enjoy The Silence",
    author: "Depeche Mode",
    src: "Depeche Mode-Enjoy The Silence.mp3",
    img: "https://i.pinimg.com/originals/4e/2a/0d/4e2a0dcf051650b49dd7a3ff3af2aafb.jpg"
}, {
    title: "Time",
    author: "Hans Zimmer",
    src: "Hans Zimmer-Time.mp3",
    img: "https://i1.sndcdn.com/artworks-000023438886-kwk6oz-t500x500.jpg?671e660"
}];
let playing = true;
let song = document.getElementById("myAudio");
let pauseButton = document.getElementById("pauseButton");
let currentSong = 0;
let goToSong = (current) => {
    currentSong = (current + songs.length) % songs.length;
    document.getElementById("audio-player").src = songs[currentSong].src;
    document.getElementById("title").innerHTML = songs[currentSong].title;
    document.getElementById("poster").src = songs[currentSong].img;
    document.getElementById("author").innerHTML = songs[currentSong].author;
    song.load();
    playSong();
};

let previousSong = () => {
    document.querySelectorAll('[data-pos="' + currentSong + '"]')[0].classList.remove("active");
    goToSong(currentSong - 1);
    document.querySelectorAll('[data-pos="' + currentSong + '"]')[0].classList.add("active");
};

let nextSong = () => {
    document.querySelectorAll('[data-pos="' + currentSong + '"]')[0].classList.remove("active");
    goToSong(currentSong + 1);
    document.querySelectorAll('[data-pos="' + currentSong + '"]')[0].classList.add("active");
};

let pause = () => {
    playing ? pauseSong() : playSong();
};

let pauseSong = () => {
    pauseButton.innerHTML = "&#61;";
    playing = false;
    song.pause();
};

let playSong = () => {
    pauseButton.innerHTML = '&rtrif;';
    playing = true;
    song.play();
};

let changeVolume = () => {
    song.volume = document.getElementById("volume").value / 100;
};

let changeCurrentTime = () => {
    song.currentTime = document.getElementById("currentTime").value * song.duration / 100;
};


let duration = (seconds) => {
    let minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    return minutes + ':' + seconds;
};

let showPlaylist = () => {
    let text = '<h1>My songs:</h1>';
    let playlist = document.getElementById("playlist");
    songs.forEach(function(item, pos) {
        text += `<div class="song" data-pos=${pos}><h2>${item.title}-${item.author}</h2></div>`;

    });
    playlist.innerHTML = text;
};

let updateTime = () => {
    document.getElementById("Time").innerHTML = duration(song.currentTime);
    document.getElementById("currentTime").value = song.currentTime / song.duration * 100;
};

showPlaylist();
document.querySelectorAll('[data-pos="' + currentSong + '"]')[0].classList.add("active");
setInterval(updateTime, 1000);