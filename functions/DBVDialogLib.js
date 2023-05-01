const http = require('http');
/**
 * Crea una respuesta básica a partir de un texto
 * @param {*} textoEnviar 
 * @returns la cadena JSON de respuesta
 */
function respuestaBasica(textoEnviar) {
    let respuesta = {
        "fulfillmentText": textoEnviar,
        "fulfillmentMessages": [
            {
                "platform": "ACTIONS_ON_GOOGLE",
                "simpleResponses": {
                    "simpleResponses": [
                        {
                            "textToSpeech": textoEnviar
                        }
                    ]
                }
            },
            {
                "text": {
                    "text": [
                        textoEnviar
                    ]
                }
            }
        ]
    }
    return respuesta;
}
/**
 * 
 * @param {*} res Añade a una respuesta básica la lista de sugerencias
 * @param {*} opciones Es la lista de sugerencia a añadir a res con el formato
 *                     ["opcion1","opcion2",..."opcionn"]
 */
function addSugerencias(res, opciones) {
    res.fulfillmentMessages.push({
        "platform": "ACTIONS_ON_GOOGLE",
        "suggestions": {
            "suggestions": listaOpcionesGoogle(opciones)
        }
    });
}
/**
 * 
 * @param {*} res Añade a una respuesta básica un card
 * @param {*} titulo Titulo del card
 * @param {*} texto Texto principal
 * @param {*} imagen Imagen asociada
 * @param {*} url URL a la que se redirecciona
 */
function addCard(res, titulo, texto, imagen, url) {
    res.fulfillmentMessages.push(
        {
            "platform": "ACTIONS_ON_GOOGLE",
            "basicCard": {
                "title": titulo,
                "subtitle": titulo,
                "formattedText": texto,
                "image": {
                    "imageUri": imagen,
                    "accessibilityText": titulo
                },
                "buttons": [
                    {
                        "title": `Más info. ${titulo}`,
                        "openUriAction": {
                            "uri": url
                        }
                    }
                ]
            }
        });
}

/**
{
    "platform": "ACTIONS_ON_GOOGLE",
    "linkOutSuggestion": {
      "destinationName": "Ver ordenador portatiles con disco duro de 1-tb, 8-gb-ram y de la marca msi",
      "uri": "https://www.pccomponentes.com/portatiles/1-tb/8-gb-ram/msi"
    }
  }
*/
/**
 * Esta función añade un enlace en la conversación
 * @param {*} res respuesta a la que se añade el enlace
 * @param {*} texto texto a añadir en el enlace
 * @param {*} url dirección a la que apuntará el enlace.
 */
function addEnlace(res,texto,url) {
    res.fulfillmentMessages.push(
    {
        "platform": "ACTIONS_ON_GOOGLE",
        "linkOutSuggestion": {
          "destinationName": texto,
          "uri": url
        }
      }    
    );
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



/**
 * 
 * @param {*} opciones recibe la lista de opciones
 * @returns Devuelve la lista en formato suggestions de google
 *         [{"title":"valor"},...]
 */
function listaOpcionesGoogle(opciones) {
    let res = [];
    for (let i = 0; i < opciones.length; i++) {
        res.push({ "title": opciones[i] })
    }
    return res;
}
/**
 * Recibe una lista de opciones y devuelve una lista de 8 elementos o menos seleccioandos 
 * de forma aleatoria
 * @param {*} opciones lista de opciones con formato: ["opcion1", "opcion2", "opcion3"]
 */
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
function hola(nombre) {
    console.log("Encantado de conocerte " + nombre);

}
module.exports = {
    hola: hola,
    respuestaBasica: respuestaBasica,
    addSugerencias: addSugerencias,
    addCard:addCard,
    addEnlace:addEnlace,
    leerURLpromise,
    reducirAOcho:reducirAOcho
}