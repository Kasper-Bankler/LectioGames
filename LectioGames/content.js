var frameClassName = "iframe"

chrome.storage.sync.get(["defaultGame"]).then((result) => {
    let displayGame = result.defaultGame;
    let displayGameURL = gameURLs[displayGame] || "";
});

let gameURLs = {
    "slope": "https://slopegame.online/",
    "pac-man": "https://freepacman.org/",
    "tetris": "https://www.lumpty.com/amusements/Games/Tetris/tetris.html",
    "snake": "https://snak.ee/",
    "square": "https://2048game.com/",
    "chess": "https://papergames.io/en/chess",
    "tic-tac-toe": "https://papergames.io/en/tic-tac-toe/",
    "minesweeper": "https://freeminesweeper.org/",
    "flappy-bird": "https://flappy-bird.io/",
    "little-alchemy": "https://littlealchemy2.com/"
};

chrome.storage.sync.get(["defaultGame", "position", "size"], (result) => {
    let displayGame = result.defaultGame;
    let displayGameURL = gameURLs[displayGame] || "https://slopegame.online/";

    if (result.position == "left") {
        frameClassName = "iframe-left";
    }

    var body = document.getElementsByClassName("masterbody")[0];

    const iframe = Object.assign(document.createElement("iframe"), {
        src: displayGameURL,
        title: "Game",
        scrolling: "no",
        id: "iframe",
        hidden: true
    });
    iframe.className = frameClassName;

    if (result.size == "small") {
        iframe.width = "300px"
    }
    else if (result.size == "large") {
        iframe.width = "500px"
    }
    else {
        iframe.width = "400px"
    }
    body.appendChild(iframe);
});

var showIframe;

chrome.storage.sync.get(["showGame"]).then((result) => {
    if (result.showGame == true || result.showGame == undefined) {
        showIframe = true;
    }
    else {
        showIframe = false;
    }
    if (showIframe == true) {
        document.getElementById("iframe").hidden = false;
    }
});


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'changeIframeSrc') {
        iframe.hidden = false;
        document.getElementById('iframe').src = request.src;
    }
});





document.addEventListener('click', function (event) {
    if (document.getElementById("iframe").hidden == false) {
        chrome.storage.sync.get(["panicButton"]).then((result) => {
            if (result.panicButton == "left-click" && event.button === 0) {
                document.getElementById("iframe").hidden = true;
                chrome.storage.sync.set({ showGame: false });
            }
        });

    }
});

document.addEventListener('keydown', function (event) {
    if (document.getElementById("iframe").hidden == false) {
        chrome.storage.sync.get(["panicButton"]).then((result) => {
            if (result.panicButton == "escape" && event.keyCode === 27) {
                document.getElementById("iframe").hidden = true;
                chrome.storage.sync.set({ showGame: false });
            }
            else if (result.panicButton == "space" && event.keyCode === 32) {
                document.getElementById("iframe").hidden = true;
                chrome.storage.sync.set({ showGame: false });
            }
        });

    }
});