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

var showIframe = true;

chrome.storage.sync.get(["showGame"]).then((result) => {
    console.log(result.showGame)
    if (result.showGame == true || result.showGame == undefined) {
        showIframe = true;
    }
    else {
        showIframe = false;
    }
});

if (showIframe) {
    chrome.storage.sync.get(["defaultGame", "position"], (result) => {
        let displayGame = result.defaultGame;
        let displayGameURL = gameURLs[displayGame] || "";

        if (result.position == "left") {
            frameClassName = "iframe-left";
        }

        var body = document.getElementsByClassName("masterbody")[0];

        const iframe = Object.assign(document.createElement("iframe"), {
            src: displayGameURL,
            title: "Game",
            scrolling: "no",
            id: "iframe"
        });
        iframe.className = frameClassName;

        body.appendChild(iframe);
    });
}


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'changeIframeSrc') {
        iframe.hidden = false;
        document.getElementById('iframe').src = request.src;
    }
});