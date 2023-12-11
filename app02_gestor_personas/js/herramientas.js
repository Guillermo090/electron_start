const { ipcRenderer } = require('electron');

document.addEventListener('keydown', (e) => {

    if (e.key === 'F12'){
        ipcRenderer.send('toggleDevTools');
    }
})
