const {ipcRenderer} = require('electron');

function agregarProducto (evento) {
    evento.preventDefault();
    let nombreProducto = document.querySelector.apply('nombreProducto').value;

    if(nombreProducto){
        ipcRenderer.send('producto:agregar',)
    }
}

document.querySelector('#frmAgregarProducto').addEventListener('submit', agregarProducto)