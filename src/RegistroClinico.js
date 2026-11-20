import { ListaEnlazada } from "../src/ListaEnlazada.js";

export class RegistroClinico {
    constructor() {
        this.historiales = {};
    }

    agregarAtencion(mascota, atencion) {
        if (!this.historiales[mascota]) {
            this.historiales[mascota] = new ListaEnlazada();
        }
        this.historiales[mascota].agregar_final(atencion);
    }

    resumenMascota(mascota) {
        const lista = this.historiales[mascota];
        if (!lista) return { atenciones: 0, costoTotal: 0 };

        let actual = lista.cabeza;
        let atenciones = 0;
        let costoTotal = 0;

        while (actual !== null) {
            atenciones++;
            costoTotal += actual.dato.costo;
            actual = actual.siguiente;
        }

        return { atenciones, costoTotal };
    }

    ultimaVacunacion(mascota) {
        const lista = this.historiales[mascota];
        if (!lista) return null;

        let actual = lista.cabeza;
        let ultima = null;

        while (actual !== null) {
            if (actual.dato.motivo.toLowerCase().includes("vacun")) {
                ultima = actual.dato;
            }
            actual = actual.siguiente;
        }

        return ultima;
    }
}