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