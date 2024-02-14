//Escribir el código para imprimir un mensaje "I will not burp in class" con intervalos de tiempo variable, Se empezará por 100ms y se tendrán que añadir 100ms en cada ejecución: 100ms, 200ms, 300ms, etc..


let counter = 0;

const timeout =  setTimeout(function printMessage(){
    console.log('I will not burp in class');
    counter += 10;
    if(counter === 100){
        console.log('done');
    }
    timeoutId = setTimeout(printMessage, counter * 100);
}, 100);





