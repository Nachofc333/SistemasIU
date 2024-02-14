
// Ejercicio 3: Crear un temporizador que muestre un mensaje cada segundo durante 10 segundos y al acabar imprima done

let counter = 0;
const interval = setInterval(function(){
    console.log('I will not burp in class');
    counter++;
    if(counter === 10){
        console.log('done');
        clearInterval(interval);
    }
}, 1000);