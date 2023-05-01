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

opciones = ["opcion1", "opcion2", "opcion3", "opcion4", "opcion5", "opcion6", "opcion7", "opcion8", "opcion9", "opcion10", "opcion11", "opcion12"];

function reducirAOcho(opciones) {
    let res = []; // array resultado con 8 opciones ordenadas de forma aleatoria
    let i = 0; // contador bucle
    let pos; // posición seleccionada
    while (i < 8 && opciones.length > 0) {
        pos = Math.floor(Math.random() * opciones.length);
        res.push(opciones[pos]);
        opciones.splice(pos, 1);
        i++;
    }
    return res;
}
console.log(reducirAOcho(opciones));

let tipopc = "sobremesa";
let memoria;
let discoduro = "1 Tb";
let marcapc = "HP";
console.log((tipopc) ? "hola" : "adios");
console.log(((tipopc) ? "/" + tipopc : "") + ((discoduro) ? "/" + discoduro : "") + ((memoria) ? "/" + memoria : "") + ((marcapc) ? "/" + marcapc : ""));
let url = 'https://www.pccomponentes.com' + ((tipopc) ? "/" + tipopc : "") + ((discoduro) ? "/" + discoduro : "") + ((memoria) ? "/" + memoria : "") + ((marcapc) ? "/" + marcapc : "");
console.log(url);

const http = require('http');

const reqUrl = encodeURI('http://datosabiertos.malaga.eu/api/3/action/datastore_search_sql?sql=SELECT count (*) from "0dcf7abd-26b4-42c8-af19-4992f1ee60c6"');
function accionPromise(respuesta) {
    let textoEnviar;
    console.log("respuesta recibida:"+JSON.stringify(respuesta));
    if (respuesta) {
        textoEnviar=respuesta.result.records[0].count + " aparcamientos";
        console.log("En Málaga hay "+ textoEnviar);
        
    }
    
}

/**
 * Esta función recibe una dirección y crea una promesa que si es correcta devuelve 
 * la respuesta como parámetro y si no lo es genera un Error
 * 
 * @param {*} reqUrl url de la que se va a leer la información
 */
function leerURLpromise(reqUrl) {
    return new Promise((resolve, reject) => {
        let textoEnviar = "";
        http.get(reqUrl, (respuestaDeAPI) => {
            let respuestaCompleta = '';
            let respuestaJSON = '';

            respuestaDeAPI.on('data', (chunk) => {
                respuestaCompleta += chunk;
            });
            respuestaDeAPI.on('end', () => {
                try {
                    respuestaJSON = JSON.parse(respuestaCompleta);
                    resolve(respuestaJSON);
                } catch (error) {
                    // En este caso se devolverá la cadena vacía
                    console.log(("Error al cargar los datos del servidor externo" + error));
                    reject(new Error("Error al cargar datos externos"));


                }
            })
        }).on('error', (error) => {
            // Se ejecutará cuando una petición no es válida
            console.log("Error al cargar los datos del servidor externo", error);
            reject(new Error("Error al cargar datos externos"));

        })
        console.log("leerURL promise texto a Enviar" + JSON.stringify(textoEnviar));

    })

}

DBVDialogLib.leerURLpromise(reqUrl).then(accionPromise).catch((error) => {
    console.log("error capturadon en promise" + error);

})