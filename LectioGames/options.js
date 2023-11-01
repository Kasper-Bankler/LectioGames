chrome.storage.sync.get(["darkMode"]).then((result) => {
    if (result.darkMode == true) {
        document.getElementsByTagName("html")[0].setAttribute("data-bs-theme", "dark");
    }
});

// Saves options to chrome.storage
const saveOptions = () => {
    window.location.reload(true);
    const position = document.getElementById('position').value;
    const darkMode = document.getElementById('darkMode').checked;
    const defaultGame = document.getElementById('default-game').value
    const size = document.getElementById('size').value

    chrome.storage.sync.set(
        { position: position, defaultGame: defaultGame, size: size, darkMode: darkMode },
        () => {
            // Update status to let user know options were saved.
            const status = document.getElementById('status');
            status.textContent = 'Options saved.';
            setTimeout(() => {
                status.textContent = '';
            }, 750);
        }
    );
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
    chrome.storage.sync.get(
        { position: 'right', defaultGame: 'slope', size: 'medium', darkMode: false },
        (items) => {
            document.getElementById('position').value = items.position;
            document.getElementById('darkMode').checked = items.darkMode;
            document.getElementById('default-game').value = items.defaultGame;
            document.getElementById('size').value = items.size;
        }
    );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);