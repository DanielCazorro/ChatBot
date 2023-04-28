'use strict'

const DBVDialogLib = require('./DBVDialogLib');
DBVDialogLib.hola('Juan');
DBVDialogLib.hola('Pepe');

let respuesta = DBVDialogLib.respuestaBasica("Bienvenido a Dialogflow");
console.log(respuesta);
console.log(JSON.stringify(respuesta));
let opciones = ["opcion1", "opcion2", "opcion3"];
DBVDialogLib.addSugerencias(respuesta, opciones);
console.log(respuesta);
console.log(JSON.stringify(respuesta));