
const {app, BrowserWindow, Menu} = require('electron');
const path = require('path');
const electronReload = require('electron-reload');

electronReload(__dirname);

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
        height:600,
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

} 

function abrirVentanaAcercaDe() {

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