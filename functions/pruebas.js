'use strict'

const DBVDialogLib = require('./DBVDialogLib');
DBVDialogLib.hola('Juan');
DBVDialogLib.hola('Pepe');

let respuesta = DBVDialogLib.respuestaBasica("Bienvenido a Dialogflow");
console.log(respuesta);
console.log(JSON.stringify(respuesta));
let opciones = ["opcion1", "opcion2", "opcion3"];
DBVDialogLib.addSugerencias(respuesta, opciones);
DBVDialogLib.addCard(respuesta, "Antonio Banderas", "Es un actor", "Antonio Banderas.jpg", "https://www.google.com/search?q=Antonio Banderas");
console.log(respuesta);
console.log(JSON.stringify(respuesta));

let personaje;
try {
    personaje = req.body.queryResult.parameters.personaje;
} catch (error) {
    console.log("error personaje no leido:" + error);
}
console.log("personaje=" + personaje);

if (typeof (personaje) !== 'undefined') {
    console.log("existe");
} else {
    console.log("no existe");

}

global.listaPersonajes = require("./personajes.json");
// si no existe un elemento de un array es undefined
console.log(global.listaPersonajes["Antonio Banderas"]);
if (global.listaPersonajes["Antonio Banders"]) {
    console.log("Personaje Existe");
} else {
    console.log("Personaje no existe");

}

opciones = ["opcion1", "opcion2", "opcion3","opcion4", "opcion5", "opcion6","opcion7", "opcion8", "opcion9","opcion10", "opcion11", "opcion12"];

function reducirAOcho(opciones) {
    let res = []; // array resultado con 8 opciones ordenadas de forma aleatoria
    let i=0; // contador bucle
    let pos; // posición seleccionada
    while (i<8&&opciones.length>0) {
        pos=Math.floor(Math.random()*opciones.length); 
        res.push(opciones[pos]);
        opciones.splice(pos,1);
        i++;
    }
    return res;
}
console.log(reducirAOcho(opciones));
