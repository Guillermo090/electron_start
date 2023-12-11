const baseDatos = require('./js/base-datos')

class GestorPersonas {
    constructor() {
        this.formNuevoRegistro = document.getElementById('form_nuevo_registro');
        this.registros = document.getElementById('registros')
        this.nombres = document.getElementById('nombres');
        this.apellidos = document.getElementById('apellidos');
        this.email = document.getElementById('email');
        this.btnCrearRegistro = document.getElementById('btn_crear_registro');

        this.cargarRegistroPersona();
        this.agregarEventListeners();
    }

    agregarEventListeners() {
        this.formNuevoRegistro.addEventListener('submit', this.crearRegistroPersona.bind(this) );
        this.nombres.addEventListener('keyup', this.habilitarBotonCrearRegistro.bind(this) );
        this.apellidos.addEventListener('keyup', this.habilitarBotonCrearRegistro.bind(this) );
        this.email.addEventListener('keyup', this.habilitarBotonCrearRegistro.bind(this) );

    }

    habilitarBotonCrearRegistro() {
        if (this.nombres.value && this.apellidos.value && this.email.validity.valid){
            this.btnCrearRegistro.disabled = false;
        }
    }


    crearRegistroPersona (evento) {
        evento.preventDefault();
        baseDatos.agregarPersona(this.nombres.value, this.apellidos.value, this.email.value);

        this.nombres.value = '';
        this.apellidos.value = '';
        this.email.value = '';

        this.cargarRegistroPersona();
    }

    generarHtmlRegistroPersona(persona){
        return `
        <tr>
            <td>${persona.nombres}</td>
            <td>${persona.apellidos}</td>
            <td>${persona.correo}</td>
            <td>
                <input type="button" class="btn btn-danger" value="Eliminar"
                onclick="${ () => gestorPersonas.eliminarRegistroPersona(persona._id)}">
            </td>
        </tr>
        `;
    }

    cargarRegistroPersona () {
        baseDatos.obtenerPersonas(function(personas){
            let html = personas.map(gestorPersonas.generarHtmlRegistroPersona).join('');
            gestorPersonas.registros.innerHTML = html;
        });
    }

    eliminarRegistroPersona (id) {
        baseDatos.eliminarPersona(id);

        this.cargarRegistroPersona();
    }
}


let gestorPersonas = new GestorPersonas();