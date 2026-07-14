/* =========================================================
   PWA Learn
   Lógica principal de la aplicación
========================================================= */

/* =========================================================
   REFERENCIAS DEL DOM
========================================================= */

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

/* =========================================================
   ARREGLO DE TAREAS
========================================================= */

let tasks = [];

/* =========================================================
   INICIALIZACIÓN
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    loadTasks();

    renderTasks();

});

/* =========================================================
   EVENTO DEL FORMULARIO
========================================================= */

taskForm.addEventListener("submit", (event) => {

    event.preventDefault();

    addTask();

});

/* =========================================================
   AGREGAR TAREA
========================================================= */

function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {

        return;

    }

    const task = {

        id: Date.now(),

        text: text,

        completed: false

    };

    tasks.push(task);

    saveTasks();

    renderTasks();

    taskInput.value = "";

    taskInput.focus();

}

/* =========================================================
   ELIMINAR TAREA
========================================================= */

function deleteTask(id) {

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();

    renderTasks();

}

/* =========================================================
   CAMBIAR ESTADO
========================================================= */

function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {

            task.completed = !task.completed;

        }

        return task;

    });

    saveTasks();

    renderTasks();

}

/* =========================================================
   DIBUJAR LISTA
========================================================= */

function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach(task => {

        const li = document.createElement("li");

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {

            toggleTask(task.id);

        });

        const span = document.createElement("span");

        span.textContent = task.text;

        if (task.completed) {

            span.style.textDecoration = "line-through";

            span.style.color = "#888";

        }

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "🗑";

        deleteButton.setAttribute("aria-label", "Eliminar tarea");

        deleteButton.addEventListener("click", () => {

            deleteTask(task.id);

        });

        li.appendChild(checkbox);

        li.appendChild(span);

        li.appendChild(deleteButton);

        taskList.appendChild(li);

    });

    updateCounter();

}

/* =========================================================
   CONTADOR
========================================================= */

function updateCounter() {

    taskCount.textContent = tasks.length;

}

/* =========================================================
   LOCAL STORAGE
========================================================= */

function saveTasks() {

    localStorage.setItem(

        "tasks",

        JSON.stringify(tasks)

    );

}

function loadTasks() {

    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {

        tasks = JSON.parse(savedTasks);

    }

}

/* =========================================================
   REGISTRO DEL SERVICE WORKER
========================================================= */

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker
            .register("./service-worker.js")

            .then(registration => {

                console.log(
                    "Service Worker registrado correctamente.",
                    registration
                );

            })

            .catch(error => {

                console.error(
                    "Error al registrar el Service Worker:",
                    error
                );

            });

    });

}