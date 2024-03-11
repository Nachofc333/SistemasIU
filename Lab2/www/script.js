/*
Una lista de tareas sencilla

En este caso práctico queremos desarrollar una simple aplicación que nos permite organizar una lista de tareas, implementando las siguientes funcionalidades básicas: añadir tareas, marcar tareas como completadas, eliminar tareas.

La aplicación estará estructurada en los siguientes ficheros:

index.js, contendrá la lógica para ejecutar nuestro servidor Web HTTPS.
tasks.json, contendrá la lista de tareas.
www/index.html, contendrá la interfaz gráfica para nuestra aplicación.
www/script.js, contendrá el código JavaScript con las funciones a implementar para proporcionar las funcionalidades deseadas.
Las lista de tareas en nuestra aplicación será un Array de objetos. Cada objeto representa una tarea y contiene las siguientes propiedades:

id, el índice de la tarea en el Array;
title, el nombre o descripción del elemento;
done, un valor boolean que indica si la tarea se ha completado o no.
Un ejemplo de nuestra lista de tareas es:

let todos = [
    { "id": 1, "title": "Aprender JavaScript", "done": false },
    { "id": 2, "title": "Terminar los ejercicios", "done": false },
    { "id": 3, "title": "Hacer 100 sentadillas", "done": true }
  ];
Es necesario implementar las siguientes cuatro funciones en el fichero script.js (cada una 2 puntos de la nota) y la retroalimentación correspondiente (2 puntos):

-loadTasks, es la función que se llamará al entrar en la aplicación para inicializar la lista de tareas según el contenido del fichero tasks.json en el servidor. Será necesario utilizar el API Fetch para recuperar el contenido del fichero de manera asíncrona. Se puede utilizar la sintaxis async/await o la sintaxis con promesas. El contenido del fichero se guardará en un Array de tareas en la aplicación.
-add, al hacer click en el boton + se añadirá una nueva tarea a la lista. El nombre de la tarea será el nombre introducido en un campo de texto correspondiente. No se añadirá nada si el campo de texto está vacío.
-remove, es la función que se ejecutará al hacer un gesto de deslizar rápidamente el dedo a la derecha sobre la tarea. Como resultado, se eliminará la tarea de la lista.
-toggleDone, es la función que se ejecutará al mantener el dedo en una tarea más de dos segundos. Como resultado, se marcará la tarea como completada. Si la tarea ya estaba marcada como completada, se desmarcará.
-Retroalimentación. proporcionar para la funciones anteriores la retroalimentación y/o mensaje de confirmación que consideréis adecuados: mostrar visualmente al usuario que está manteniendo el dedo en la pantalla, una pequeña vibración para confirmar que se han cargado las tareas, etc.

Opcional (2 puntos extra si no se ha alcanzado el máximo en los apartados anteriores). Al añadir, eliminar o modificar las tareas se irá actualizando el contenido del fichero tasks.json en el servidor, contenente la información sobre la lista de tareas. Para esto, se pide utilizar la función fetch, especificando el método POST y pasando el contenido del array de tareas en formato JSON. Cada función hará la misma llamada al endpoint del API REST del servidor tasklist/update y actualizará el fichero task.json sobreescribiendo su contenido. No se implementaría así en una aplicación real, pero es suficiente para construir un pequeño prototipo para experiementar con (i) recuperar y enviar información a un servidor y (ii) interacción táctil.

Tenéis libertad para decidir los argumentos de cada función y podéis implementar todas las funciones que necesitéis, además de las funciones anteriores, así como añadir cualquier otro ficheros o recurso: imágenes, ficheros con los CSS, etc.

*/


let taskList = [];

const loadTasks = () => {
    fetch("/tasks/get")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
                taskList = data;
                // Do something with the taskList array
                const taskListContainer = document.getElementById("task-list");

                // Clear the existing tasks
                taskListContainer.innerHTML = "";
                console.log(taskList);

                // Add each task to the task list container
                taskList.forEach(task => {
                    const taskItem = document.createElement("li");
                    taskItem.textContent = task.title;
                    taskListContainer.appendChild(taskItem);
                });
        })
        .catch(error => {
                console.error('Error:', error);
        });
}

document.addEventListener('DOMContentLoaded', loadTasks);

const add = () => {
    const taskInput = document.querySelector("#task-input");
    const taskTitle = taskInput.value.trim();
    
    if (taskTitle !== "") {
        const newTask = {
            id: taskList.length + 1,
            title: taskTitle,
            done: false
        };
        
        taskList.push(newTask);
        
        // Do something with the new task
    }
    
    taskInput.value = "";
}

const remove = () => {
    // Implement the logic to remove a task from the taskList array
}

const toggleDone = () => {
    // Implement the logic to toggle the "done" property of a task in the taskList array
}

const addButton = document.querySelector("#fab-add");



addButton.addEventListener("touchend", add);


