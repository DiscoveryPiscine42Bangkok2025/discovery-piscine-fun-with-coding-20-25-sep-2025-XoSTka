window.onload = function () {
    loadTodos();

    document.getElementById("new").addEventListener("click", function () {
        let task = prompt("Enter your new TO DO:");
        if (task && task.trim() !== "") {
            addTodo(task);
            saveTodos();
        }
    });
};

function addTodo(task) {
    let list = document.getElementById("ft_list");
    let newTask = document.createElement("div");
    newTask.innerText = task;

    newTask.addEventListener("click", function () {
        if (confirm("Do you really want to remove this TO DO?")) {
            list.removeChild(newTask);
            saveTodos();
        }
    });

    list.insertBefore(newTask, list.firstChild);
}

function saveTodos() {
    let list = document.getElementById("ft_list").children;
    let todos = [];
    for (let i = 0; i < list.length; i++) {
        todos.push(list[i].innerText);
    }
    document.cookie = "todos=" + encodeURIComponent(JSON.stringify(todos)) + "; path=/";
}

function loadTodos() {
    let cookies = document.cookie.split("; ");
    let todos = [];
    for (let i = 0; i < cookies.length; i++) {
        let [name, value] = cookies[i].split("=");
        if (name === "todos") {
            todos = JSON.parse(decodeURIComponent(value));
        }
    }
    if (todos.length > 0) {
        for (let task of todos) {
            addTodo(task);
        }
    }
}