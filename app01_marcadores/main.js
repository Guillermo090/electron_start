const {app, BrowserWindow} = require('electron');

function crearVentanaPrincipal() {
    let ventanaPrincipal = new BrowserWindow({
        width:800,
        height:600
    });

    ventanaPrincipal.loadFile('index.html');

}

app.whenReady().then(crearVentanaPrincipal)