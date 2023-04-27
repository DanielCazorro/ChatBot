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
for (let i-0; i < nombres.length; i++) {
    console.log(nombres[i].nombre + " " + nom[i].apellidos);
}
