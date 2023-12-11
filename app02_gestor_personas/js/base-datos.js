var Datastore = require('nedb');

let db = new Datastore({filename: 'db/personas.db', autoload: true})

exports.agregarPersona = function(nombres, apellidos, correo){
    var persona = {
        nombres: nombres,
        apellidos: apellidos,
        correo: correo
    };

    db.insert(persona, function (err,nuevoObjeto) {

    });
};

exports.obtenerPersonas = function(operacion) {
    db.find({}, function(err,personas){
        if(personas){
            operacion(personas);
        }
    });
};

exports.eliminarPersona = function(id) {
    db.remove({ _id : id }, {} , function(err,numeroRegistrosEliminados){
         
    });
};