
import { Nodo } from "../src/nodo.js";
import { ListaEnlazada } from "../src/ListaEnlazada.js";
import { RegistroClinico } from "../src/RegistroClinico.js";


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



const lista = new ListaEnlazada();

lista.agregar_inicio({ motivo: "vacunacion anual", costo: 85000 });
lista.agregar_final({ motivo: "Control de peso", costo: 40000 });
lista.agregar_final({ motivo: "Limpieza dental", costo: 150000 });

console.log("Tamaño:", lista.tamanio);
console.log("Cabeza:", lista.cabeza);
console.log("Cola:", lista.cola);

console.log("Borrar en vacía:", lista.eliminar((d) => d.motivo === "algo"));
console.log("Estado -> cabeza:", lista.cabeza, "| cola:", lista.cola, "| tamaño:", lista.tamanio);


lista.agregar_inicio({ motivo: "vacunacion anual", costo: 85000 });
console.log("Borrar único nodo:", lista.eliminar((d) => d.motivo === "vacunacion anual"));
console.log("Estado -> cabeza:", lista.cabeza, "| cola:", lista.cola, "| tamaño:", lista.tamanio);


lista.agregar_final({ motivo: "vacunacion anual", costo: 85000 });
lista.agregar_final({ motivo: "Limpieza dental", costo: 150000 });

console.log("Buscar:", lista.buscar((d) => d.motivo === "Limpieza dental"));
console.log("Insertar después de vacunación:", lista.insertarDespuesDe(
    (d) => d.motivo === "vacunacion anual",
    { motivo: "Control de peso", costo: 40000 }
));


console.log("Borrar cabeza:", lista.eliminar((d) => d.motivo === "vacunacion anual"));
console.log("Cabeza nueva:", lista.cabeza?.dato, "| Cola:", lista.cola?.dato, "| Tamaño:", lista.tamanio);

console.log("Borrar cola:", lista.eliminar((d) => d.motivo === "Limpieza dental"));
console.log("Cabeza:", lista.cabeza?.dato, "| Cola nueva:", lista.cola?.dato, "| Tamaño:", lista.tamanio);

console.log("Borrar inexistente:", lista.eliminar((d) => d.motivo === "no existe"));
console.log("Cabeza:", lista.cabeza?.dato, "| Cola:", lista.cola?.dato, "| Tamaño:", lista.tamanio);




const clinica = new RegistroClinico();

clinica.agregarAtencion("Lola", { motivo: "vacunacion anual", costo: 85000 });
clinica.agregarAtencion("Lola", { motivo: "Control de peso", costo: 40000 });
clinica.agregarAtencion("Lola", { motivo: "Limpieza dental", costo: 150000 });


clinica.agregarAtencion("Toby", { motivo: "Vacunacion rabia", costo: 120000 });
clinica.agregarAtencion("Toby", { motivo: "Consulta general", costo: 65000 });
clinica.agregarAtencion("Toby", { motivo: "Vacunacion refuerzo", costo: 80000 });

clinica.agregarAtencion("Mía", { motivo: "Examen de sangre", costo: 190000 });
clinica.agregarAtencion("Mía", { motivo: "Vacunacion anual", costo: 90000 });

console.log("Lola:", clinica.resumenMascota("Lola"), "| Última vacuna:", clinica.ultimaVacunacion("Lola"));
console.log("Toby:", clinica.resumenMascota("Toby"), "| Última vacuna:", clinica.ultimaVacunacion("Toby"));
console.log("Mía:", clinica.resumenMascota("Mía"), "| Última vacuna:", clinica.ultimaVacunacion("Mía"));