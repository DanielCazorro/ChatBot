'use strict'

const functions = require('firebase-functions');
const express = require('express');
// https://www.npmjs.com/package/body-parser
const bodyParser = require('body-parser'); // necesario para leer HTTP Post y almacenar en req.body (middelware module)
const path = require('path');

const DBVDialogLib = require('./DBVDialogLib');

// Variables Globales
global.listaPersonajes = require("./personajes.json");
global.imagenes = "https://us-central1-curso1-88e63.cloudfunctions.net/curso/imagenes/"
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
  let respuestaEnviada = false;
  let textoEnviar = 'recibida petición post incorrecta';
  let opciones = DBVDialogLib.reducirAOcho(["Chiste", "Consejo", "Noticias", "Mi Equipo", "Personaje"]);
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
    /*********** input.welcome  ***********/
    textoEnviar = "Hola, soy el primer webhook";
    resultado = DBVDialogLib.respuestaBasica(textoEnviar);
  } else if (contexto === "personaje") {
    /*********** personaje  ***********/
    let personaje;
    try {
      personaje = req.body.queryResult.parameters.personaje;
    } catch (error) {
      console.log("error personaje no leido:" + error);
    }
    if (personaje) {
      let arListaPersonajes = Object.keys(global.listaPersonajes).slice();
      // Vamos a personalizar las opciones para que aparezcan como sugerencias otros personajes y el menú
      opciones = arListaPersonajes.slice();
      opciones.unshift("Menú");
      // si ha llegado parametro personaje y está en la lista
      if (global.listaPersonajes[personaje]) {
        textoEnviar = global.listaPersonajes[personaje];
        let imagen = encodeURI(global.imagenes + personaje + ".jpg");
        let url = "https://www.google.com/search?q=" + personaje;
        resultado = DBVDialogLib.respuestaBasica(`Me encanta ${personaje}`);
        DBVDialogLib.addCard(resultado, personaje, textoEnviar, imagen, url);
      } else {
        // Si el presonaje recibido no está en la base de datos listaPersonajes
        resultado = DBVDialogLib.respuestaBasica(`Lo siento, todavía no he aprendido nada de ${personaje}. Seguiré estudiando.`);
      }
    } else {
      // Personaje vacio
      resultado = DBVDialogLib.respuestaBasica("No conozco a ese personaje");
    }

  } else if (contexto === "lista_personajes") {
    /********** lista_personajes  **********/
    let arListaPersonajes = Object.keys(global.listaPersonajes).slice();
    // Vamos a personalizar las opciones para que aparezcan como sugerencias otros personajes y el menú
    opciones = arListaPersonajes.slice();
    opciones.unshift("Menú");
    resultado = DBVDialogLib.respuestaBasica("Te muestro algunos personajes que conozco...");
  } else if (contexto === "menu") {
    /************** menu  ************/
    resultado = DBVDialogLib.respuestaBasica("Te muestro algunas cosas que se hacer:");
  } else if (contexto === "recomendar_ordenador") {
    let tipopc;
    let memoria;
    let discoduro;
    let marcapc;
    try {
      tipopc = req.body.queryResult.parameters.tipopc;
      memoria = req.body.queryResult.parameters.memoria;
      marcapc = req.body.queryResult.parameters.marcapc;
      discoduro = req.body.queryResult.parameters.discoduro;
    } catch (error) {
      console.log("cargando variables:" + error);
    }
    if (!tipopc) {
      textoEnviar = 'Que tipo de dispositivo te gustaría elegir:';
      opciones = ["sobremesa", "portatiles"];
      resultado = DBVDialogLib.respuestaBasica(textoEnviar);
    } else if (!memoria) {
      textoEnviar = 'Es necesario elegir el tamaño de la memoria:';
      opciones = ["4 Gb", "8 Gb", "16 Gb", "32 Gb"];
      resultado = DBVDialogLib.respuestaBasica(textoEnviar);
    } else if (!discoduro) {
      textoEnviar = 'Ahora veremos el almacenamiento en disco:';
      opciones = ["1 Tb", "2 Tb", "4 Tb"];
      resultado = DBVDialogLib.respuestaBasica(textoEnviar);
    } else if (!marcapc) {
      textoEnviar = "Vamos a ver que marca te gustaría consultar:";
      opciones = ["hp", "lenovo", "msi", "acer", "dell"];
      resultado = DBVDialogLib.respuestaBasica(textoEnviar);
    } else {
      // Se tienen los 4 parametros y se puede realizar la búsqueda del PC
      resultado = DBVDialogLib.respuestaBasica("Te ayudaré a encontrar un ordenador con esas características");
      let url = 'https://www.pccomponentes.com' + ((tipopc) ? "/" + tipopc : "") + ((discoduro) ? "/" + discoduro : "") + ((memoria) ? "/" + memoria : "") + ((marcapc) ? "/" + marcapc : "");
      DBVDialogLib.addEnlace(resultado, `Ver recomendación`, url);
      opciones = ["Menú"];
    }
  } else if (contexto === "aparcamientos_contar") {
    respuestaEnviada = true;
    const reqUrl = 'http://datosabiertos.malaga.eu/api/3/action/datastore_search_sql?sql=SELECT count (*) from "0dcf7abd-26b4-42c8-af19-4992f1ee60c6"';
    DBVDialogLib.leerURLpromise(reqUrl).then((respuesta) => {
      let resultado;
      textoEnviar = respuesta.result.records[0].count + " aparcamientos";
      console.log(("En Málaga hay " + textoEnviar));
      resultado = DBVDialogLib.respuestaBasica(textoEnviar);
      DBVDialogLib.addSugerencias(resultado, opciones);
      res.json(resultado);
      return true;

    }).catch((error) => {
      console.log("error capturado en promise:" + error);
      res.json(DBVDialogLib.respuestaBasica("Lo siento. No puedo contactar con servidor externo"));

    });
  } else if (contexto === "aparcamientos_ocupacion") {
    const aparcBuscado = req.body.queryResult.parameters.nombre;
    console.log("aparcBuscado=" + aparcBuscado);

    const reqUrl = encodeURI(`http://datosabiertos.malaga.eu/api/3/action/datastore_search_sql?sql=SELECT * from "0dcf7abd-26b4-42c8-af19-4992f1ee60c6" WHERE upper(nombre) LIKE upper('%${aparcBuscado}%')`);
    console.log(reqUrl);
    
    respuestaEnviada = true;
    DBVDialogLib.leerURLpromise(reqUrl).then((respuesta) => {
      let resultado;
      textoEnviar;
      console.log("leerURLpromise:" + JSON.stringify(respuesta));
      const aparcamiento = respuesta.result.records[0];
      console.log("leerURLpromise-aparcamiento:" + aparcamiento);
      if (aparcamiento.libres > 0) {
        textoEnviar += `${aparcamiento.nombre} situado en ${aparcamiento.direccion} dispone de ${aparcamiento.capacidad} plazas y ahora tiene ${aparcamiento.libres} libres. Corre y no pierdas tu sitio`;
      } else {
        textoEnviar += `${aparcamiento.nombre} situado en ${aparcamiento.direccion} dispone de ${aparcamiento.capacidad} plazas y ahora está lleno. Espera un poquito o prueba con otro aparcamiento`;
      }
      console.log("Resultado aparcamientos: " + textoEnviar);
      resultado=DBVDialogLib.respuestaBasica(textoEnviar);
      DBVDialogLib.addSugerencias(resultado,opciones);
      res.json(resultado);
      return true;
  }).catch((error)=> {
    console.log("error capturado en promise:"+error);
    res.json(DBVDialogLib.respuestaBasica("Lo siento. No encuentro ese aparcamiento"));
    
  });

  } else {
  // Se recibe un action desconocido (contexto)
  resultado = DBVDialogLib.respuestaBasica(`Todavía no he aprendido a gestionar:${contexto}`);

}
if (!respuestaEnviada) {
  DBVDialogLib.addSugerencias(resultado, opciones);
  res.json(resultado);
}
});


const local = true;
if (local) {
  server.listen((process.env.PORT || 8000), () => {
    console.log("Servidor funcionando...");

  })
} else {
  exports.curso = functions.https.onRequest(server);
}
