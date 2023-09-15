let editingTask = null;

function addTask() {
    var taskText = document.getElementById("taskInput").value;
    var newTask = createTaskElement(taskText);
    document.querySelector(".tareas-container").appendChild(newTask);
    document.getElementById("taskInput").value = "";
}

function createTaskElement(taskText) {
    var newTask = document.createElement("div");
    newTask.className = "tarea";
    newTask.draggable = true;
    newTask.dataset.originalText = taskText; // Almacenamos el texto original
    newTask.innerHTML = `
        <p class="descripcion">${taskText}</p>
        <button class="puntos" onclick="editTask(this)">Editar</button>
        <button class="puntos" onclick="deleteTask(this)">Eliminar</button>
    `;
    newTask.addEventListener("dragstart", function (event) {
        event.dataTransfer.setData("text/plain", taskText);
    });

    // Habilitar la edición al hacer doble clic
    newTask.addEventListener("dblclick", function () {
        editTask(this.querySelector(".puntos"));
    });

    return newTask;
}

function editTask(button) {
    editingTask = button.closest(".tarea");
    var descripcion = editingTask.querySelector(".descripcion");
    var editButton = editingTask.querySelector(".puntos");

    if (editButton.textContent === "Editar") {
        descripcion.contentEditable = true;
        descripcion.focus();
        editButton.textContent = "Guardar";
    } else {
        descripcion.contentEditable = false;
        editButton.textContent = "Editar";

        // Actualiza la tarea editada y el texto original
        var editedText = descripcion.textContent;
        editingTask.dataset.originalText = editedText;
    }
}

function deleteTask(button) {
    var tarea = button.closest(".tarea");
    tarea.remove();
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event, targetId) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text/plain");
    var target = document.getElementById(targetId);

    // Eliminamos la tarea original si ya estaba en otro tablero
    var existingTask = target.querySelector(".tarea");
    if (existingTask) {
        existingTask.remove();
    }

    // Creamos una copia de la tarea antes de moverla
    var newTask = createTaskElement(data);
    target.appendChild(newTask);
}