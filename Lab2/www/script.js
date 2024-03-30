
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
                const taskListContainer = document.getElementById("task-list");
                taskListContainer.innerHTML = "";
                console.log(taskList);

                
                taskList.forEach(task => {
                    const taskItem = document.createElement("li");
                    taskItem.textContent = task.title;
                    taskListContainer.appendChild(taskItem);
                    deslizarTarea(taskItem);
                    marcarTarea(taskItem);

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
    // Obtiene el valor del campo de entrada
    let taskTitleInput = document.getElementById('task-name');
    let taskTitle = taskTitleInput.value.trim();

    if (taskTitle !== "") {
        const newTask = {
            id: taskList.length + 1,
            title: taskTitle,
            done: false
        };
        // Añade la nueva tarea a la lista de tareas
        taskList.push(newTask);
        // Añade la tarea al HTML
        let taskListContainer = document.getElementById('task-list');
        let taskItem = document.createElement('li');
        taskItem.textContent = newTask.title;
        taskListContainer.appendChild(taskItem);
        marcarTarea(taskItem);
        deslizarTarea(taskItem);
        vibrate();
    } else {
        alert('Por favor, introduce el nombre de la tarea.');
        return;
    }

    // Limpia el campo de entrada después de añadir la tarea
    taskTitleInput.value = '';
}

const remove = function(event) {
    // Obtiene el elemento de la lista que disparó el evento
    let taskItem = event.target;
    taskItem.classList.add('slide-out-right');
    // Espera medio segundo (la duración de la animación) antes de eliminar la tarea
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
        // Cambia el estilo del elemento de la lista para indicar si la tarea está completada
        taskItem.style.textDecoration = task.done ? 'line-through' : 'none';
        vibrate();
        console.log(taskList);

    }
}

const vibrate = () => {
    if (navigator.vibrate) {
        // Hace vibrar el dispositivo durante 200 milisegundos
        navigator.vibrate(200);
    }
}


const deslizarTarea = (item) => {
    let touchstartX = 0;
    let touchendX = 0;
    //Cuando el usuario desliza hacia la derecha (es decir, el valor de touchendX es mayor que el valor de touchstartX), se llama a la función remove
    item.addEventListener('touchstart', function(event) {
        touchstartX = event.changedTouches[0].screenX;
    });

    item.addEventListener('touchend', function(event) {
        touchendX = event.changedTouches[0].screenX;
        if (touchendX > touchstartX) {
            remove.call(this, event);
        }
    });
}

const marcarTarea = (item) => {
    let timerId;
    item.addEventListener('touchstart', function(event) {
        // Inicia un temporizador cuando se presiona la pantalla
        timerId = setTimeout(() => toggleDone.call(this, event), 1000);
        //Cambiar el color de fondo del elemento de la lista para indicar que se ha pulsado
        item.style.backgroundColor = 'dfdfdf';
    });
    item.addEventListener('touchend', function() {
        // Detiene el temporizador cuando se suelta la pantalla
        clearTimeout(timerId);
        // Restaura el color de fondo del elemento de la lista
        item.style.backgroundColor = 'white';
    });
}

const addButton = document.querySelector("#fab-add");

document.addEventListener('DOMContentLoaded', () => {
    loadTasks();

    // Añade los event listeners a las tareas existentes
    document.querySelectorAll('#task-list li').forEach(item => {
        deslizarTarea(item);
        marcarTarea(item);
    });

    // Añade el event listener al botón de añadir
    addButton.addEventListener('click', add);
    addButton.addEventListener('touchend', function(event) {
        event.preventDefault();
        add(event);
    });
});



