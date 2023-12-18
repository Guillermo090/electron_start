const {ipcRenderer} = require('electron');

ipcRenderer.on('producto:agregar', function(evento,nombreProducto){
    localStorage.setItem(producto,nombreProducto);
    // let nuevoProductoHtml = `<div class='list-group-item"> ${producto} </div>`;

    // let listaCompras = document.getElementById('listaCompras');
    cargarListaProducto();
});

function cargarListaProducto(){
    let html = Object.keys(localStorage).map( item => `<div class='list-group-item"> ${localStorage.getItem(item)} </div>`).join('');
    document.getElementById('listaCompras').innerHTML = html;
}