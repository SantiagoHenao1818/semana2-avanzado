# Bitácora de Análisis: Comportamiento ante la Ruptura de Enlaces en una Lista Enlazada

**Proyecto:** Algoritmos con Estructuras de Nodos (JavaScript)  

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

## ¿Qué pasa con los nodos que se pierden?

Si rompes el puente (por ejemplo, haciendo que `n1` apunte a `null` de golpe), los nodos que venían después (`n2` y `n3`) **no desaparecen de la computadora de un segundo a otro**, pero **se quedan totalmente encerrados y ya no podemos llegar a ellos**.

Para entenderlo fácil: a diferencia de las listas normales donde puedes buscar por un número de posición (como el `[0]` o `[1]`), aquí no hay atajos. La única forma de avanzar es ir de nodo en nodo, siguiendo la pista del `.siguiente` desde el principio. 

Si cortas esa cadena en el primer eslabón, pierdes el rastro hacia adelante. Los nodos siguientes quedan como "huérfanos" o abandonados: la información sigue existiendo en la memoria, pero para tu programa es como si no existieran. El ciclo `while` se detiene antes de tiempo y por eso el resultado final sale incompleto (en este caso, solo te suma el primer valor).