'use strict'

const DBVDialogLib = require('./DBVDialogLib');
DBVDialogLib.hola('Juan');
DBVDialogLib.hola('Pepe');

let respuesta = DBVDialogLib.respuestaBasica("Bienvenido a Dialogflow");
console.log(respuesta);
console.log(JSON.stringify(respuesta));
let opciones = ["opcion1", "opcion2", "opcion3"];
DBVDialogLib.addSugerencias(respuesta, opciones);
DBVDialogLib.addCard(respuesta, "Antonio Banderas", "Es un actor", "Antonio Banderas.jpg", "https://www.google.com/search?q=Antonio Banderas")
console.log(respuesta);
console.log(JSON.stringify(respuesta));

// probar si una variable no existe
try {
    personaje = req.body.queryResult.parameters.personaje;
    console.log("hola" + personaje);

} catch (error) {

    console.log("error personaje:" + error);
}
if (typeof (personaje) !== 'undefined') {
    console.log("existe");

} else {
    console.log("no existe");

}

global.listaPersonajes = require("./personajes.json");
// Si no existe un elemento del array es undefined
console.log(global.listaPersonajes["Antonio Banders"]);
if (global.listaPersonajes["Antonio Banders"]) {
    console.log("Personaje Existe");
} else {
    console.log("Personaje NO Existe en array");
}





