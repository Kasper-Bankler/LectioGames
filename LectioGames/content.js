var body = document.getElementsByClassName("masterbody")[0];

const iframe = Object.assign(document.createElement("iframe"), {
    src: "https://slopegame.online/",
    title: "Game",
    className: "iframe",
    scrolling: "no",
    id: "iframe"
});

body.appendChild(iframe);

document.addEventListener('keydown', function (event) {
    if (event.keyCode == 27) {
        console.log("esc pressed")
        iframe.hidden = true
    }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'changeIframeSrc') {
        iframe.hidden = false
        document.getElementById('iframe').src = request.src;
    }
});