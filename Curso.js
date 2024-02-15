
function capitalize(str){
    let capitalizedString = str.charAt(0).toUpperCase();	
    for (let i = 1; i < str.length; i++){
        if (str.charAt(i-1) === ' '){
            capitalizedString += str.charAt(i).toUpperCase();
        }
        else{
            capitalizedString += str.charAt(i).toLowerCase();
        }
    }
    return capitalizedString;
  }
    
  const capitalized = capitalize("pensar incomoda como andar bajo la lluvia");
  console.log(capitalized);


  function capitalize2(str){
    function capitalizeWord(word){
        let capitalizeWord = word.charAt(0).toUpperCase() + word.slice(1);
        return capitalizeWord;
    }
    let wordsInString = str.toLowerCase().split(' ');

    for (let i = 0; i < words_in_string.length; i++){
        wordsInString[i] = capitalizeWord(wordsInString[i]);
    }
    return wordsInString.join(' ');
}
capitalize("pensar incomoda como andar bajo la lluvia");

/*


Para añadir/eliminar elementos

push(...elements), agrega elements al final.
pop(), extrae un elemento del final.
shift(), extrae un elemento desde el principio.
unshift(...elements), agrega elements al principio.
splice(pos, deleteCount[, ...elements]), elimina deleteCount elementos empezando por el índice pos e inserta elements.
slice(start, end), crea un nuevo Array copiando los elementos desde la posición start hasta end (no incluido).
concat (...items), devuelve un nuevo Array: copia todos los elementos del array actual y le agrega items. Si alguno de los elementos es Array, se agragan sus elementos.

Para buscar entre los elementos

indexOf/lastIndexOf(item, pos), busca el item que comienza desde la posición pos y devuelve su índice, o -1 si no lo encuentra.
includes(value), devuelve true si el Array contiene value, de lo contrario false.
find/filter(func), filtra elementos a través de la función, devuelve el primero en el caso de find o todos los valores en el caso de filter para que func devuelve true.
findIndex, es como find, pero devuelve el índice en lugar de un valor.

Para iterar sobre los elementos

forEach(func), llama a func para cada elemento, no devuelve nada.

Para transformar el Array

map(func), crea un nuevo Array a partir de los resultados de la función func llamada para cada elemento.
sort(func), ordena el Array in situ, luego lo devuelve.
reverse(), invierte el Array in situ y luego lo devuelve.
split/join, convierte una cadena de carácteres a Array y viceversa.
reduce(func[, initial]), calcula un valor único sobre el Array llamando a func para cada elemento y pasando un resultado intermedio entre las llamadas.

Recordad que push, pop, shift, unshift, sort, reverse y splice modifican el propio Array.



*/