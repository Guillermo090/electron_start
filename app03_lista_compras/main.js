
const {app, BrowserWindow, Menu, ipcMain} = require('electron');
const electronReload = require('electron-reload');

electronReload(__dirname);

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
    ventanaNuevoProducto = new BrowserWindow({
        parent: ventanaPrincipal,
        modal:true,
        width: 300,
        height: 200,
        title: 'Agregar producto',
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
        }
    });

    ventanaNuevoProducto.loadFile('agregar-producto.html');

    ventanaNuevoProducto.on('close', function() {
        ventanaNuevoProducto= null;
    });

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

    ipcMain.on('toggleDevTools', () => {
        ventanaPrincipal.webContents.toggleDevTools();
    });

    ipcMain.on('producto:agregar', function(evento, nombreProducto) {
        console.log(nombreProducto)
        ventanaPrincipal.webContents.send('producto:agregar', nombreProducto);
    });
}

app.whenReady().then(crearVentanaPrincipal);

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