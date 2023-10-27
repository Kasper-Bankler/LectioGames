var frameClassName = "iframe"

chrome.storage.sync.get(["position"]).then((result) => {
    if (result.position == "left") {
        frameClassName = "iframe-left"
    }

    var body = document.getElementsByClassName("masterbody")[0];

    const iframe = Object.assign(document.createElement("iframe"), {
        src: "https://slopegame.online/",
        title: "Game",
        scrolling: "no",
        id: "iframe"
    });
    iframe.className = frameClassName

    body.appendChild(iframe);
});

chrome.storage.sync.get(["darkMode"]).then((result) => {
    console.log("darkMode currently is " + result.darkMode);
});


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'changeIframeSrc') {
        iframe.hidden = false
        document.getElementById('iframe').src = request.src;
    }
});