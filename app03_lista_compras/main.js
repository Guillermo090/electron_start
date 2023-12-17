
const {app, BrowserWindow, Menu, ipcMain} = require('electron');

let ventanaPrincipal;
let ventanaNuevoProducto;

let menuPrincipalPlantilla = [
    {
        label: 'Archivo',
        submenu: [
            {
                label: 'Agregar producto',
                click: () => {
                    crearVentanaAgregarProducto();
                }
            },
            {
                label: 'Eliminar producto',
                click: () => {
                    ventanaPrincipal.webPreferences.send('productos:eliminar');
                }
            },
            {
                label: 'Salir',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click: () => {
                    app.quit();
                }
            }
        ]
    }
];

function crearVentanaAgregarProducto() {

};


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

    let menuPrincipal = Menu.buildFromTemplate(menuPrincipalPlantilla);
    ventanaPrincipal.setMenu(menuPrincipal);

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