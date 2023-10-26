chrome.storage.sync.get(["darkMode"]).then((result) => {
    if (result.darkMode == true) {
        console.log("dark mode set to true")
        document.getElementsByTagName("html")[0].setAttribute("data-bs-theme", "dark");
    }
});

// Saves options to chrome.storage
const saveOptions = () => {
    window.location.reload(true);
    const position = document.getElementById('position').value;
    const darkMode = document.getElementById('darkMode').checked;

    chrome.storage.sync.set(
        { position: position, darkMode: darkMode },
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
        { position: 'right', darkMode: false },
        (items) => {
            document.getElementById('position').value = items.position;
            document.getElementById('darkMode').checked = items.darkMode;
        }
    );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);