const { shell } = require('electron');
// const {bootstrap} = require('bootstrap');

class Marcadores{
    constructor() {
        this.mensajeError = document.querySelector('#mensaje-error');
        this.formularioCreacionMarcadores = document.querySelector('.creacion-marcador-formulario');
        this.marcadorUrl = document.querySelector('.creacion-marcador-url');
        this.marcadorBoton = document.querySelector('.creacion-marcador-boton');
        this.marcadores = document.querySelector('.marcadores');
        this.eliminarMarcadores = document.querySelector('.remover-marcadores');
        
        this.parser = new DOMParser();

        this.agregarEventListeners();
    }

    agregarEventListeners() {
        this.marcadorUrl.addEventListener('keyup', () => {
            this.marcadorBoton.disabled = !this.marcadorUrl.validity.valid;
        });
        this.formularioCreacionMarcadores.addEventListener('submit', this.crearMarcador.bind(this))

        this.eliminarMarcadores.addEventListener('click', this.eliminarMarcadoresCreados.bind(this))

        this.marcadores.addEventListener('click', this.abrirEnlaceMarcador.bind(this))
    }

    crearMarcador(evento){
        evento.preventDefault();

        const url = this.marcadorUrl.value;
        fetch(url)
        .then(respuesta => respuesta.text())
        .then(this.extraerContenido.bind(this))
        .then(this.encontrarTituloPagina)
        .then(titulo => this.almacenarMarcador(url,titulo))
        .then(this.limpiarFormulario.bind(this))
        .then(this.visualizarMarcadores.bind(this))
        .catch(error => this.reportarError(error,url))
    }

    extraerContenido(contenido){
        return this.parser.parseFromString(contenido, 'text/html');
    }

    encontrarTituloPagina(html){
        return html.querySelector('title').innerText;
    }

    almacenarMarcador(url, titulo){
        localStorage.setItem(url, JSON.stringify({titulo:titulo,url:url}))
    }

    limpiarFormulario(){
        this.marcadorUrl.value = null
    }

    obtenerMarcadores(){
        return Object.keys(localStorage).map(k => JSON.parse(localStorage.getItem(k)));
    }

    generarHtmlMarcador(marcador){
        return `<li class="list-group-item">${marcador.titulo} - <a href="${marcador.url}">${marcador.url}</a></li>`;
    }

    visualizarMarcadores(){
        let marcadores = this.obtenerMarcadores();
        let html = marcadores.map(this.generarHtmlMarcador).join('');

        this.marcadores.innerHTML = `<ul class="list-group">${html}</ul>`;
    }


    reportarError(error, url){
        this.mensajeError.classList.remove('invisible')
        this.mensajeError.innerHTML = `Ocurrio un error al intentar acceder a ${url}: ${error}`
        console.log(error)
        setTimeout(()=> {
            this.mensajeError.innerText = null;
            this.mensajeError.classList.add('invisible')

        },5000);

    }

    eliminarMarcadoresCreados() {
        localStorage.clear();
        this.marcadores.innerHTML = '';
    }

    abrirEnlaceMarcador(evento){
        if(evento.target.href){
            evento.preventDefault();
            shell.openExternal(evento.target.href)
        }
    }

}

let marcadores = new Marcadores();
marcadores.visualizarMarcadores();
