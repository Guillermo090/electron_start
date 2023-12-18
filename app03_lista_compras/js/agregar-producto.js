const {ipcRenderer} = require('electron');

function agregarProducto (evento) {
    evento.preventDefault();
    
}

document.querySelector('#frmAgregarProducto').addEventListener('submit', agregarProducto)