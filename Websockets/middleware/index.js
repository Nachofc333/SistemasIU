/*
Funciones de middleware
Las funciones de middleware son funciones que tienen acceso al objeto de la petición req, al objeto de respuesta res y a la siguiente función de middleware en el ciclo de solicitud/respuestas de la aplicación. La siguiente función de middleware se denota normalmente con una variable denominada next.

Las funciones de middleware pueden realizar las siguientes tareas:

Ejecutar cualquier código.
Realizar cambios en la solicitud y los objetos de respuesta.
Finalizar el ciclo de petición/respuesta.
Invocar el siguiente middleware en cola.
Si la función de middleware actual no finaliza el ciclo de solicitud/respuestas, debe invocar next() para pasar el control a la siguiente función de middleware. De lo contrario, la solicitud quedará colgada.

Ya hemos visto algunos ejemplos de funciones de middleware a nivel de aplicación: por ejemploexpress.static es la función de middleware predefinida que permite gestionar el envío de ficheros estáticos que están en una carpeta determinada, como respuestas a las peticiones de un cliente. Hemos utilizado esta función dentro de la función app.use.

En el curso nos centraremos en utilizar las funciones de middleware que utilizaremos dentro de app.METHOD. 
Por ejemplo, hemos visto la función de middleware que escribimos dentro de app.get para gestionar una petición a una ruta determinada. 
Para finalizar el ciclo de petición/respuestas, en estas funciones utilizamos el método res.send para enviar los datos que representan el cuerpo de la respuesta HTTP. También utilizamos el método res.end para terminar la respuesta y poder enviar datos al mismo tiempo
Atención, el orden en que se escriben las funciones de middleware es importante!
*/

const express = require('express');
const path = require('path');
const app = express();

app.use('/', express.static(path.join(__dirname, 'www')));

app.listen(3000, function () {
  console.log('Servidor Express en escucha');
});

app.use((req, res, next) => {
  console.log("Log de la petición");
  next();
});

app.get("/", (req, res) => {
  res.end("Hola, expressjs!");
});

