
import { Nodo } from "../src/nodo.js";
const n1 = new Nodo({ motivo: "vacunacion anual", costo: 85000 });
const n2 = new Nodo({ motivo: "Control de peso", costo: 40000 });
const n3 = new Nodo({ motivo: "Limpieza dental", costo: 150000 });
n1.siguiente = n2;
n2.siguiente = n3;

let costoTotal=0;
let actual = n1

while (actual !== null) {
    console.log(actual)
    
    costoTotal+= actual.dato.costo;
    actual = actual.siguiente;
}
console.log("Costo total: ", costoTotal)


/*Romper el Nodo. 
import { Nodo } from "../src/nodo.js";
const n1 = new Nodo({ motivo: "vacunacion anual", costo: 85000 });
const n2 = new Nodo({ motivo: "Control de peso", costo: 40000 });
const n3 = new Nodo({ motivo: "Limpieza dental", costo: 150000 });
n1.siguiente = n2;
n2.siguiente = n3;

n1.siguiente=null;


let actual = n1

while (actual !== null) {
    console.log(actual)
    actual = actual.siguiente;
}
*/
