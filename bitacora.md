# Bitácora de Análisis: Comportamiento ante la Ruptura de Enlaces en una Lista Enlazada

**Proyecto:** Algoritmos con Estructuras de Nodos (JavaScript)  

================================================================================
1. NODO BASE & RUPTURA DE ENLACE
================================================================================
Normal:
  [n1: Vacunación $85k] ──► [n2: Control peso $40k] ──► [n3: Limpieza $150k] ──► null
  (while recorre todo -> Total: 275,000)

Ruptura (n1.siguiente = null):
  [n1: Vacunación $85k] ──► null      [n2: Control peso $40k] ──► [n3: Limpieza $150k] ──► null
  (while para en n1)                   (nodos huérfanos / inaccesibles desde n1)

================================================================================
2. LISTA ENLAZADA & OPERACIONES SIN ROMPER CADENA
================================================================================
  cabeza                                                              cola
    │                                                                   │
    ▼                                                                   ▼
  [Nodo A] ──► [Nodo B (objetivo)] ──► [Nodo Nuevo (insertarDespuesDe)] ──► [Nodo C] ──► null
  tamanio = 4

  Operaciones:
- agregar_inicio / agregar_final -> O(1) con cabeza y cola
- buscar(condicion)              -> recorre con while desde cabeza
- insertarDespuesDe(...)         -> enlaza nuevo nodo sin perder lo siguiente
- eliminar(condicion)            -> reacomoda enlaces (vacía, 1 nodo, cabeza, cola, no existe)

================================================================================
3. REGISTRO CLÍNICO (PATITAS v0.1) — UN HISTORIAL POR MASCOTA
================================================================================
  RegistroClinico
   ├── "Lola" (3 atenciones | $275.000)
   │     cabeza                                                        cola
   │       ▼                                                             ▼
   │     [Vacunación anual] ──► [Control de peso] ──► [Limpieza dental] ──► null
   │
   ├── "Toby" (3 atenciones | $265.000)
   │     cabeza                                                         cola
   │       ▼                                                              ▼
   │     [Vacunación rabia] ──► [Consulta general] ──► [Vacunación refuerzo] ──► null
   │
   └── "Mía" (2 atenciones | $280.000)
         cabeza                                       cola
           ▼                                            ▼
         [Examen de sangre] ──► [Vacunación anual] ──► null


## 1. Contexto Inicial
La estructura base consta de tres nodos enlazados secuencialmente:
- `n1` (Vacunación anual - 85,000) $\rightarrow$ apunta a `n2`
- `n2` (Control de peso - 40,000) $\rightarrow$ apunta a `n3`
- `n3` (Limpieza dental - 150,000) $\rightarrow$ apunta a `null` (fin de la lista)

El flujo normal del ciclo `while` permite que el puntero viajero visite los tres nodos de manera consecutiva, acumulando un costo total de **275,000**.

---

## 2. Escenario de Prueba: Ruptura Intencional de un Enlace
Para evaluar la tolerancia y el comportamiento dinámico de los nodos, se simula la pérdida de un enlace a mitad del recorrido mediante la siguiente instrucción:

```javascript
n1.siguiente = null; // Rompemos el puente entre el nodo 1 y el nodo 2
```

## ¿Qué pasa con los nodos que se pierden?

Si rompes el puente (por ejemplo, haciendo que `n1` apunte a `null` de golpe), los nodos que venían después (`n2` y `n3`) **no desaparecen de la computadora de un segundo a otro**, pero **se quedan totalmente encerrados y ya no podemos llegar a ellos**.

Para entenderlo fácil: a diferencia de las listas normales donde puedes buscar por un número de posición (como el `[0]` o `[1]`), aquí no hay atajos. La única forma de avanzar es ir de nodo en nodo, siguiendo la pista del `.siguiente` desde el principio. 

Si cortas esa cadena en el primer eslabón, pierdes el rastro hacia adelante. Los nodos siguientes quedan como "huérfanos" o abandonados: la información sigue existiendo en la memoria, pero para tu programa es como si no existieran. El ciclo `while` se detiene antes de tiempo y por eso el resultado final sale incompleto (en este caso, solo te suma el primer valor).

# Reporte de Desarrollo: Clase `ListaEnlazada` con `Nodo`

## 1. Organización de Archivos
Para mantener el código ordenado y separado por responsabilidades, el proyecto se dividió en:
- **`nodo.js`**: Contiene únicamente la clase `Nodo` con `this.dato` y `this.siguiente`.
- **`listaEnlazada.js`**: Importa `Nodo` y encapsula la estructura completa con `this.cabeza`, `this.cola` y `this.tamanio`.
- **`prueba.js` (o `index.js`)**: Archivo encargado de instanciar la lista, agregar datos y mostrar los resultados en consola.

---

## 2. Propiedades de `ListaEnlazada`
- **`cabeza`**: Apunta al primer nodo de la lista (`null` al iniciar).
- **`cola`**: Apunta al último nodo de la lista (`null` al iniciar), evitando tener que recorrer toda la lista con ciclos para insertar al final.
- **`tamanio`**: Lleva el conteo de nodos ingresados (`0` al iniciar).
- **`agregar_inicio(dato)`**: Inserta un nodo al principio en $O(1)$. Si la lista está vacía, `cabeza` y `cola` apuntan al nuevo nodo.
- **`agregar_final(dato)`**: Inserta un nodo al final en $O(1)$ usando `this.cola` directamente, sin ciclos `while`.
---

## 3. Métodos Implementados (Sin Ciclos)

### `agregar_inicio(dato)`
- Crea un `newNodo` con el dato recibido.
- Si la lista está vacía (`this.cabeza === null`), asigna `newNodo` tanto a `cabeza` como a `cola`.
- Si ya hay nodos, conecta `newNodo.siguiente` hacia la `cabeza` actual y actualiza `this.cabeza` al nuevo nodo.
- Aumenta `this.tamanio++` sin usar ciclos `while`.

### `agregar_final(dato)`
- Crea un `newNodo` con el dato recibido.
- Si la lista está vacía (`this.cabeza === null`), asigna `newNodo` a `cabeza` y `cola`, suma `tamanio` y termina.
- Si ya hay nodos, usa `this.cola` directamente (`this.cola.siguiente = newNodo` y `this.cola = newNodo`) para engancharlo al final sin tener que recorrer toda la lista con un `while`.
- Aumenta `this.tamanio++`.

---
# Corregir el historial sin romper la cadena

## Métodos implementados en `ListaEnlazada`

- **`buscar(condicion)`**: Recorre desde `cabeza` con un `while` y devuelve el dato que cumpla la condición. Si no aparece nada, retorna `null`.
- **`insertarDespuesDe(condicion, dato)`**: Busca el nodo que cumpla la condición e inserta el nuevo nodo justo después sin cortar lo que sigue. Si se inserta después de la `cola`, actualiza `cola` y suma `1` al `tamanio`.
- **`eliminar(condicion)`**: Borra el nodo que cumpla la condición reacomodando los enlaces para que la lista no se rompa, actualizando `cabeza`, `cola` y `tamanio` según corresponda.

---

## Casos borde probados

1. **Lista vacía**: Intentar eliminar cuando no hay nodos; no falla y deja `cabeza` y `cola` en `null` con `tamanio` en `0`.
2. **Único nodo**: Eliminar el único elemento deja la lista vacía (`cabeza: null`, `cola: null`, `tamanio: 0`).
3. **Eliminar la cabeza**: Mueve `cabeza` al siguiente nodo y resta `1` al `tamanio`.
4. **Eliminar la cola**: Reasigna `cola` al nodo anterior para que su `.siguiente` quede en `null` y resta `1` al `tamanio`.
5. **Elemento que no existe**: No modifica enlaces ni `tamanio`.

---

## Verificación después de cada prueba

En cada caso se revisaron en consola `lista.cabeza`, `lista.cola` y `lista.tamanio` para confirmar que la cadena siguiera bien conectada y los valores cuadraran.


# MiniReto 4: Patitas v0.1 - Historiales Completos

## 1. `RegistroClinico` por Mascota
Cada mascota tiene su propia `ListaEnlazada` donde se van guardando sus atenciones (`motivo` y `costo`) sin usar arreglos ni índices. Al recorrer la lista con un `while` desde `cabeza`, se calcula:
- **Lola**: 3 atenciones — Costo total: **$275.000**.
- **Toby**: 3 atenciones — Costo total: **$265.000**.
- **Mía**: 2 atenciones — Costo total: **$280.000**.

---

## 2. Última Vacunación con `buscar` (Sin Índices)
Para consultar la última vacunación sin depender de índices de arreglo (`[0]`, `[length - 1]`), se recorre la lista enlazada de la mascota evaluando la condición sobre cada nodo (`motivo` relacionado con vacunación), quedándose con la última coincidencia encontrada mediante referencias `.siguiente`.

---

```javascript
import { ListaEnlazada } from "./ListaEnlazada.js";

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
```