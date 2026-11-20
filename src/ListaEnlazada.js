import { Nodo } from "../src/nodo.js";

export class ListaEnlazada {
    constructor() {
        this.cabeza = null;
        this.cola = null;
        this.tamanio = 0;
    }

    agregar_inicio(dato) {
        const newNodo = new Nodo(dato);

        if (this.cabeza === null) {
            this.cabeza = newNodo;
            this.cola = newNodo;
        } else {
            newNodo.siguiente = this.cabeza;
            this.cabeza = newNodo;
        }

        this.tamanio++;
    }

    agregar_final(dato) {
        const newNodo = new Nodo(dato);

        if (this.cabeza === null) {
            this.cabeza = newNodo;
            this.cola = newNodo;
            this.tamanio++;
            return;
        }

        this.cola.siguiente = newNodo;
        this.cola = newNodo;
        this.tamanio++;
    }

    buscar(condicion) {
        let actual = this.cabeza;
        while (actual !== null) {
            if (condicion(actual.dato)) {
                return actual.dato;
            }
            actual = actual.siguiente;
        }
        return null;
    }

    insertarDespuesDe(condicion, dato) {
        let actual = this.cabeza;

        while (actual !== null) {
            if (condicion(actual.dato)) {
                const nuevoNodo = new Nodo(dato);
                nuevoNodo.siguiente = actual.siguiente;
                actual.siguiente = nuevoNodo;

                if (actual === this.cola) {
                    this.cola = nuevoNodo;
                }

                this.tamanio++;
                return true;
            }
            actual = actual.siguiente;
        }

        return false;
    }

    eliminar(condicion) {
        if (this.cabeza === null) {
            return false;
        }

        if (condicion(this.cabeza.dato)) {
            this.cabeza = this.cabeza.siguiente;
            this.tamanio--;

            if (this.cabeza === null) {
                this.cola = null;
            }

            return true;
        }

        let atras = this.cabeza;
        let actual = this.cabeza.siguiente;

        while (actual !== null) {
            if (condicion(actual.dato)) {
                atras.siguiente = actual.siguiente;

                if (actual === this.cola) {
                    this.cola = atras;
                }

                this.tamanio--;
                return true;
            }

            atras = actual;
            actual = actual.siguiente;
        }

        return false;
    }
}