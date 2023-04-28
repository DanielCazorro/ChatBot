'use strict'

const functions = require('firebase-functions');
const express = require('express');
// https://www.npmjs.com/package/body-parser
const bodyParser = require('body-parser'); // necesario para leer HTTP Post y almacenar en req.body (middelware module)
const path = require('path');

const DBVDialogLib = require('./DBVDialogLib');

// Variables Globales
global.listaPersonajes = require("./personajes.json");
global.imagenes = "https://us-central1-curso1-88e63.cloudfunctions.net/curso/imagenes/";

// Guia de uso de Express https://expressjs.com/es/guide/routing.html
const server = express();
server.use(bodyParser.urlencoded({
  extended: true
}));
server.use(bodyParser.json()); // para analizar json
//server.use("/imagenes",express.static(__dirname+'/imagenes')); // para poder cargar las imágenes de la carpeta
server.use("/imagenes", express.static(path.join(__dirname, '/imagenes')));

server.get('/', (req, res) => {
  return res.json("Hola, soy un bot, pero esta no es la forma de interactuar conmigo");
})

server.post("/curso", (req, res) => {
  let contexto = "nada";
  let resultado;
  let textoEnviar = 'recibida petición post incorrecta';
  let opciones = ["Chiste", "Consejo", "Noticias", "Mi Equipo"];
  try {
    contexto = req.body.queryResult.action;
    textoEnviar = `recibida petición de ${contexto}`;
  } catch (error) {
    console.log("Error contexto vacio:" + error);
  }

  if (req.body.queryResult.parameters) {
    console.log("parámetros:" + req.body.queryResult.parameters);
  } else {
    console.log("Sin parámetros");

  }
  
  if (contexto === "input.welcome") {  
    /**********  input.welcome  *********/
    textoEnviar = "Hola, soy el primer webhook";
    resultado = DBVDialogLib.respuestaBasica(textoEnviar);
  } else if (contexto === "personaje") {
    /**********  personaje  *********/
    let personaje;
    try {
      personaje = req.body.queryResult.parameters.personaje;
    } catch (error) {
      console.log("error personaje no leido:" + error);
    }
    if (typeof(personaje)!=='undefined') {
      console.log("personaje:"+personaje);
      let arListaPersonajes = Object.keys(global.listaPersonajes).slice();
      opciones = arListaPersonajes.slice(); // ponemos como sugerencia a los personajes
      opciones.unshift("Menú"); // añade menú al inicio.
      if (global.listaPersonajes[personaje]) {
        textoEnviar = global.listaPersonajes[personaje];
        let imagen = encodeURI(global.imagenes + personaje + ".jpg");
        let url = "https://www.google.com/search?q=" + personaje;
        resultado = DBVDialogLib.respuestaBasica(`Me encanta ${personaje}`);
        DBVDialogLib.addCard(resultado, personaje, textoEnviar, imagen, url);

      } else { // si el elemento no está en la lista global
        resultado = DBVDialogLib.respuestaBasica(`Lo siento todavía no he aprendido nada de ${personaje}. Seguiré estudiando.`);
      }
    }else { // Personaje vacio
      resultado = DBVDialogLib.respuestaBasica(`No se ha recibido personaje 2`);
    }
  } else if (contexto==="lista_personajes")  {
    /**********  lista_personaje  *********/
    let arListaPersonajes = Object.keys(global.listaPersonajes).slice();
      opciones = arListaPersonajes.slice(); // ponemos como sugerencia a los personajes
      opciones.unshift("Menú"); // añade menú al inicio.
      resultado=DBVDialogLib.respuestaBasica("Te muestro algunos personajes que conozco...");
  } else { // Se recibe un action no reconocido
    resultado = DBVDialogLib.respuestaBasica(`Todavía no he aprendido a gestionar: ${contexto}`);
  }
  console.log("resultado antes de addsugerencias" + JSON.stringify(resultado));
  DBVDialogLib.addSugerencias(resultado, opciones);
  res.json(resultado);
});


const local = false;
if (local) {
  server.listen((process.env.PORT || 8000), () => {
    console.log("Servidor funcionando...");

  })
} else {
  exports.curso = functions.https.onRequest(server);
}
