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

