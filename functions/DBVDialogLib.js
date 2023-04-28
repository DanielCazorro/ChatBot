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
    reducirAOcho:reducirAOcho
}