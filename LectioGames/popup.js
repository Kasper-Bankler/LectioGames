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
    console.log("changed to slope");
});

document.querySelector('#pac-man').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'changeIframeSrc', src: 'https://www.google.com/logos/2010/pacman10-i.html' });
    });
    console.log("changed to pac man");
});