'use strict'
// Creación JSON
let valor = { "nombre": "David", "apellidos": "Bueno" };
console.log("valor-" + valor);
console.log("valor str=" + JSON.stringify(valor));
console.log("valor=" + valor.nombre + " " + valor.apellidos);
let valor2 = `{"nombre":"Antonio","apellidos":"Lopez2}`;
console.log(valor2);
let valor2json = JSON.parse(valor2)
console.log("valor2json=" + valor2.nombre + " " + valor.apellidos)
let nombres = [{ "nombre": "David", "apellidos": "Bueno" }, { "nombre": "Antonio", "apellidos": "Lopez2" }];
console.log(nombres);
for (let i = 0; i < nombres.length; i++) {
    console.log(nombres[i].nombre + " " + nom[i].apellidos);
}


// Tipos de Archivos JSON a tratar

// Tipo personaje
let personajes = {
    "Antonio Banderas": "Actor, cantante, productor y director. Podría decirse que es nuestro actor más internacional con más de 100 películas. Embajador de nuestra ciudad.",
    "Pablo Picasso": "Pintor malagueño iniciador del Cubismo con cuadros en los mejores museos del mundo y en Málaga tiene el Museo Picasso y la Casa Natal",
    "Cánovas del Castillo": "Político e historiador del siglo XIX, presidente del consejo de ministros y bajo su gobierno se aprobó la Constitución de 1876",
    "Salvador Rueda": "Poeta.  Autor de múltiples novelas y relatos costumbristas de abmiente andaluz"
}

console.log(personajes["Antonio Banderas"]);
console.log(personajes["Pablo Picasso"]);
let arIndicePersonajes = Object.keys(personajes).slice();
for (let i = 0; i < arIndicePersonajes.length; i++) {
    console.log(arIndicePersonajes[i] + ": " + personajes[arIndicePersonajes[i]]);

}
console.log(arIndicePersonajes)

// Tipo SmallTalk
let respuestas = {
    "input.welcome": [
        "Me alegra que quieras estar un rato conmigo. Espero no defraudarte",
        "¡Es un placer que vengas a hablar conmigo! ¿Cómo puedo ayudarte?",
        "¡Hola, soy Victoria! ¿Cómo puedo ayudarte?. Te muestro algunas sugerencias"
    ],
    "input.unknown": [
        "Siento no haberte entendido. Abajo te pongo algunos temas de los que puedo hablar.",
        "No te entendí. Te puedo dar un consejo, hablarte de curiosidades de Málaga o mostrarte expresiones Malagueñas",
        "No te comprendí bien. Puedes pedirme que te cuente un chiste"
    ],
    "ContarChiste": [
        "Una abuela muy humilde y pobrecita ya en su lecho de muerte le dice a su nieta: 'Te dejo una granja, con 3 tractores, 10 vacas, 20 ovejas, 3 gallinas y 15 árboles frutales.' Y la nieta muy  sorprendida le pregunta a su abuela, '¿dónde tienes todo eso en Málaga?: En el Facebook, mi hija en Facebook!! Ja,ja,ja,ja.'",
        "'¿Sabes cómo se llaman los habitantes de Málaga?' -'Pues no, todos, no...'",
        "El otro día fui a un supermercado de Málaga y la cajera empezó a tirarme yogures y le dije: 'Qué haces loca' y me contestó 'Oferta de lanzamiento'"
    ],
    "Consejo": [
        "Vale más actuar exponiéndose a arrepentirse de ello, que arrepentirse de no haber hecho nada (Giovanni Boccaccio)",
        "Ningún hombre es lo bastante bueno para gobernar a otros sin su consentimiento. (Abraham Lincoln)"
    ]
};
let contexto = "ContarChiste";
console.log(respuestas[contexto]);
console.log("respuesta[1]" + respuestas[contexto[1]]);

// Funcion aleatoria
function fraseAleatoria(listaFrases) {
    return listaFrases[Math.floor((Math.random() * listaFrases.length))];
}
console.log("frase aleatoria: " + fraseAleatoria(respuestas[contexto]));