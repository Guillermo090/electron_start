
const {app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const electronReload = require('electron-reload');

// electronReload(__dirname);

let ventanaPrincipal;

let menuAplicacionPlantilla = [
    {
        label: 'Aplicación',
        submenu: [
            {
                label: 'Acerca de',
                click: () => {
                    abrirVentanaAcercaDe();
                }
            }
        ]
    }
];

function crearVentanaPrincipal() {
    let ventanaPrincipal = new BrowserWindow({
        width:800,
        height:800,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
        }
    });

    ventanaPrincipal.loadFile('index.html');

    let menu = Menu.buildFromTemplate(menuAplicacionPlantilla);
    ventanaPrincipal.setMenu(menu);

    ventanaPrincipal.on('closed', () => {
        ventanaPrincipal = null ;
    });

    ipcMain.on('toggleDevTools', () => {
        ventanaPrincipal.webContents.toggleDevTools();
    });


} 

function abrirVentanaAcercaDe() {

    let VentanaAcercaDe = new BrowserWindow({
        parent: ventanaPrincipal,
        modal:true,
        show:false,
        width:400,
        height:250
    })

    VentanaAcercaDe.loadFile('acerca-de.html');
    VentanaAcercaDe.setMenu(null);
    VentanaAcercaDe.once('ready-to-show', () => {
        VentanaAcercaDe.show();
    });
}

app.whenReady().then(crearVentanaPrincipal)

app.on('window-all-closed', function (){
    if (process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('activate', function (){
    if(BrowserWindow.getAllWindows().length === 0){
        crearVentanaPrincipal();
    }
});