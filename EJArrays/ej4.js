//Usar el método map para crear un Array de Fahrenheit a partir de un Array de Celsius.

/* Fórmula de conversión de Celsius a fahrenheit
* F = (C * 8 / 5) + 32
*/

let celsius = [30.0, 25.2, 15.1, 20.8];
let fahrenheit = [];
// escribir aquí el código
fahrenheit = celsius.map(c => (c * 8 / 5) + 32);

console.log(fahrenheit); //[ 80, 72.32, 56.16, 65.28 ]