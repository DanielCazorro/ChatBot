'use strict'

// Importar librerias
const functions = require("firebase-functions");
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Variables Globales
const server = express();
server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(bodyParser.json()); //para analizar json
// para cargar imágenes
server.use("/imagenes", express.static(path.join(__dirname + '/imagenes')));

//  si alguien intenta acceder desde un navegador
server.get('/', (req, res) => {
    return res.json("Hola, soy un bot, pero esta no es la forma correcta de interactura conmigo")
})
// Acceso correcto
server.post("/curso", (req, res) => {
    let resultado = `recibida petición post correcta`;
    res.json(resultado);
});

const local = true; // para ejecutar servidor en local
if (local) {
    server.listen((process.env.PORT || 8000), () => {
        console.log("Servidor funcionando");
    });
} else {
    // Para firebase
    exports.curso1 = functions.https.onRequest(server);
}

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("!Hola Pilotos!");
});
