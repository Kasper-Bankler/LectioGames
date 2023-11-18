setButton()
var showGame;

async function setButton() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var currentTab = tabs[0];

        if (currentTab && currentTab.id) {
            chrome.scripting.executeScript({
                target: { tabId: currentTab.id },
                function: function () {
                    var iframe = document.getElementById('iframe');
                    var message = iframe && iframe.hidden == true ? "Show Game" : "Hide Game";

                    chrome.runtime.sendMessage({ action: 'updateButton', message: message });
                },
            });
        }
    });
}

async function updateIframeSrc(src) {
    document.getElementById("hide").innerHTML = "Hide Game"
    setMuteState(false);
    chrome.storage.sync.set({ showGame: true });
    var currentTab = await getCurrentTab();
    if (!/^https:\/\/www\.lectio\.dk\//.test(currentTab.url)) {
        if (window.confirm('Log in to Lectio.dk to play your favorite games! Click OK to visit Lectio.dk.')) {
            window.open('https://www.lectio.dk', '_blank');
        }
    }
    else if (/^https:\/\/www\.lectio\.dk\//.test(currentTab.url) && currentTab.url.length < 25) {
        alert("Please log in first")
    }
    else {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'changeIframeSrc', src: src });
        });
    }
}

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

async function setMuteState(isMuted) {
    const tab = await getCurrentTab();
    await chrome.tabs.update(tab.id, { muted: isMuted });
    console.log(`Tab ${tab.id} is ${isMuted ? "muted" : "unmuted"}`);
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'updateButton') {
        document.getElementById("hide").innerHTML = request.message;
    }
});

chrome.storage.sync.get(["darkMode"]).then((result) => {
    if (result.darkMode == true) {
        document.getElementsByTagName("html")[0].setAttribute("data-bs-theme", "dark");
    }
});

document.querySelector('#go-to-options').addEventListener('click', function () {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
});

document.querySelector('#github').addEventListener('click', function () {
    chrome.tabs.create({ url: "https://github.com/Kasper-Bankler/LectioGames" });
});

document.querySelector('#hide').addEventListener('click', async function () {
    chrome.storage.sync.get(["showGame"]).then((result) => {

        if (result.showGame == false || result.showGame == undefined) {
            showGame = true
            chrome.storage.sync.set({ showGame: showGame });
            setMuteState(false);
        }
        else {
            showGame = false
            chrome.storage.sync.set({ showGame: showGame });
            setMuteState(true);
        }
    });

    var currentTab = await getCurrentTab();
    chrome.scripting.executeScript({
        target: { tabId: currentTab.id },
        function: function () {

            var iframe = document.getElementById("iframe");
            if (iframe.hidden == false) {
                iframe.hidden = true;

            }
            else {
                iframe.hidden = false;


            }
        }
    });

    if (!/^https:\/\/www\.lectio\.dk\//.test(currentTab.url)) {
        if (window.confirm('Go to Lectio.dk to hide/show your game! Click OK to visit Lectio.dk.')) {
            window.open('https://www.lectio.dk', '_blank');
        }
    }
    else if (/^https:\/\/www\.lectio\.dk\//.test(currentTab.url) && currentTab.url.length < 25) {
        alert("Please log in first")
    }
    else {
        var button = document.getElementById("hide")
        if (button.innerHTML == "Hide Game") {
            button.innerHTML = "Show Game"
        }
        else {
            button.innerHTML = "Hide Game"
        }
    }
});

document.querySelector('#slope').addEventListener('click', async function () {
    updateIframeSrc("https://slopeio2.com/")
});

document.querySelector('#pac-man').addEventListener('click', async function () {
    updateIframeSrc("https://pacmanabc.com/play-pacman-mspacman-cookieman/")
});

document.querySelector('#tetris').addEventListener('click', async function () {
    updateIframeSrc("https://www.lumpty.com/amusements/Games/Tetris/tetris.html")
});

document.querySelector('#snake').addEventListener('click', async function () {
    updateIframeSrc("https://snak.ee/")
});

document.querySelector('#square').addEventListener('click', async function () {
    updateIframeSrc("https://2048game.com/")
});

document.querySelector('#chess').addEventListener('click', async function () {
    updateIframeSrc("https://papergames.io/en/chess")
});

document.querySelector('#subway-surfers').addEventListener('click', async function () {
    updateIframeSrc("https://subway-surfers.org/berlin/")
});

document.querySelector('#minesweeper').addEventListener('click', async function () {
    updateIframeSrc("https://freeminesweeper.org/")
});

document.querySelector('#flappy-bird').addEventListener('click', async function () {
    updateIframeSrc("https://flappy-bird.io/")
});

document.querySelector('#little-alchemy').addEventListener('click', async function () {
    updateIframeSrc("https://littlealchemy2.com/")
});