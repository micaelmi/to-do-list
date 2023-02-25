const inputTask = document.querySelector('.input-task');
const addTask = document.querySelector('.add-task');
const tasks = document.querySelector('.tasks');

inputTask.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        sendTaskRequest();
    }
})

addTask.addEventListener('click', sendTaskRequest)

function sendTaskRequest() {
    if (!inputTask.value) return;
    createTask(inputTask.value);
}

function createTask(task) {
    const li = createList();
    li.innerHTML = task;
    tasks.appendChild(li);
    createTrashButton(li);
    cleanInput();
    saveTasks();
}

function cleanInput() {
    inputTask.value = '';
    inputTask.focus();
}

function createList() {
    const li = document.createElement('li');
    return li;
}

function createTrashButton(li) {
    li.innerHTML += ' ';
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<img src="img/trash.svg" width="12">';
    trashButton.setAttribute('title', 'Apagar tarefa');
    trashButton.onclick = function () {
        trashButton.parentElement.remove();
        saveTasks();
    }
    li.appendChild(trashButton);
}

function saveTasks() {
    const liTasks = tasks.querySelectorAll('li');
    const taskList = [];

    for (let task of liTasks) {
        let text = task.innerText.trim();
        taskList.push(text);
    }
    console.log(taskList);
    const tasksJSON = JSON.stringify(taskList);
    localStorage.setItem('tasks', tasksJSON);
}

function loadTasks() {
    const tasks = localStorage.getItem('tasks');
    const tasksJSON = JSON.parse(tasks);

    for (let task of tasksJSON) {
        createTask(task);
    }
}
loadTasks();