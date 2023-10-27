chrome.storage.sync.get(["darkMode"]).then((result) => {
    if (result.darkMode == true) {
        console.log("dark mode set to true")
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
    chrome.tabs.create({ url: "https://github.com/Kasper-Bankler" });
});


async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}


document.querySelector('#hide').addEventListener('click', async function () {
    var button = document.getElementById("hide")
    if (button.innerHTML == "Hide Game") {
        button.innerHTML = "Show Game"
    }
    else {
        button.innerHTML = "Hide Game"
    }



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
        },
    });
});

document.querySelector('#slope').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'changeIframeSrc', src: 'https://slopegame.online/' });
    });
});

document.querySelector('#pac-man').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'changeIframeSrc', src: 'https://freepacman.org/' });
    });
});

document.querySelector('#tetris').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'changeIframeSrc', src: 'https://www.lumpty.com/amusements/Games/Tetris/tetris.html' });
    });
});

document.querySelector('#snake').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'changeIframeSrc', src: 'https://snak.ee/' });
    });
});

document.querySelector('#square').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'changeIframeSrc', src: 'https://2048game.com/' });
    });
});