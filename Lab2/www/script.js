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
                    // addRemoveListener(taskItem);
                    addDragListeners(taskItem);
                    addToggleDoneListener(taskItem);

                    // Cambia el estilo del elemento de la lista para indicar si la tarea está completada
                    taskItem.style.textDecoration = task.done ? 'line-through' : 'none';
                });
        })
        .catch(error => {
                console.error('Error:', error);
        });
}

document.addEventListener('DOMContentLoaded', loadTasks);


const add = () => {
    let taskTitle = document.getElementById('task-name').value.trim();
    
    if (taskTitle !== "") {
        const newTask = {
            id: taskList.length + 1,
            title: taskTitle,
            done: false
        };
    

        taskList.push(newTask);
            
        
        let taskListContainer = document.getElementById('task-list');
        let taskItem = document.createElement('li');
        taskItem.textContent = newTask.title;
        taskListContainer.appendChild(taskItem);
        // addRemoveListener(taskItem);
        addDragListeners(taskItem);
        addToggleDoneListener(taskItem);
        vibrate();
    }
    else {
        alert('Por favor, introduce el nombre de la tarea.');
        return;
    }
    document.getElementById('task-name').value = '';
    
}
const remove = function(event) {
    // Obtiene el elemento de la lista que disparó el evento
    let taskItem = event.target;

    // Añade la clase 'fade-out' al elemento para iniciar la animación
    taskItem.classList.add('slide-out-right');
    // Espera 1 segundo (la duración de la animación) antes de eliminar la tarea
    setTimeout(() => {
        // Elimina la tarea de la lista de tareas
        let taskId = taskList.findIndex(task => task.title === taskItem.textContent);
        if (taskId !== -1) {
            taskList.splice(taskId, 1);
        }

        // Elimina la tarea del HTML
        taskItem.remove();
        vibrate();
    }, 500);
}


const toggleDone = function(event) {
    // Obtiene el elemento de la lista que disparó el evento
    let taskItem = event.target;

    // Encuentra la tarea correspondiente en la lista de tareas
    let task = taskList.find(task => task.title === taskItem.textContent);
    if (task) {
        // Cambia el estado de 'done' de la tarea
        task.done = !task.done;
        taskItem.style.textDecoration = task.done ? 'line-through' : 'none';
        vibrate();
        console.log(taskList);

    }
}

const vibrate = () => {
    // Comprueba si la API de vibración está disponible
    if (navigator.vibrate) {
        // Hace vibrar el dispositivo durante 200 milisegundos
        navigator.vibrate(200);
    }
}


const addDragListeners = (item) => {
    item.draggable = true;
    item.addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('text/plain', this.textContent);
    });
    item.addEventListener('dragend', function(event) {
        if (event.screenX > window.innerWidth / 2) {
            remove.call(this, event);
        }
    });
}

const addToggleDoneListener = (item) => {
    let timerId;
    item.addEventListener('mousedown', function(event) {
        // Inicia un temporizador cuando se presiona el botón del ratón
        timerId = setTimeout(() => toggleDone.call(this, event), 1000);
    });
    item.addEventListener('mouseup', function() {
        // Detiene el temporizador cuando se suelta el botón del ratón
        clearTimeout(timerId);
    });
}

const addButton = document.querySelector("#fab-add");

// const addRemoveListener = (item) => {
//     item.addEventListener('click', remove);
// }

document.addEventListener('DOMContentLoaded', () => {
    loadTasks();

    // Añade los event listeners a las tareas existentes
    document.querySelectorAll('#task-list li').forEach(item => {
        addDragListeners(item);
        addToggleDoneListener(item);
    });

    // Añade el event listener al botón de añadir
    document.getElementById('fab-add').addEventListener('click', add);
});
addButton.addEventListener("touchend", add);


