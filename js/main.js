const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

form.addEventListener('submit', addTask);

taskInput.oninput = limitWords;

function limitWords() {
    taskInput.value = taskInput.value.substr(0, 50);
}

// taskInput.oninput = function(){
//     this.value = this.value.substr(0, 50);
// }

function addTask(event) {
    event.preventDefault();
    const taskText = taskInput.value;
    const date = new Date();
    const getDate = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
    const getTime = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    const taskDate = getDate + ' at ' + getTime;
    const taskHTML = `				<li class="list-group-item d-flex justify-content-between task-item">
    <span class="task-title">${taskText}</span>
    <span class="task-date text-muted">${taskDate}</span>
    <div class="task-item__buttons">
        <button type="button" data-action="done" class="btn-action">
            <i class="button-icon bi bi-check-lg"></i>
        </button>
        <button type="button" data-action="delete" class="btn-action">
            <i class="button-icon bi bi-x-lg"></i>
        </button>
    </div>
</li>`
    tasksList.insertAdjacentHTML('beforeend', taskHTML);
    taskInput.value = "";
    taskInput.focus();
    if (tasksList.children.length > 1) {
        emptyList.classList.add('none');
    }
    save();
}


tasksList.addEventListener('click', deleteTask);

function deleteTask(event) {
    if (event.target.dataset.action === "delete") {
        const parent = event.target.closest('.list-group-item');
        parent.remove()
    }
    if (tasksList.children.length === 1) {
        emptyList.classList.remove('none');
    }
    save();
}

tasksList.addEventListener('click', finishTask);

function finishTask(event) {
    if (event.target.dataset.action === "done") {
        const taskItem = event.target.closest('.list-group-item');
        const taskName = taskItem.querySelector('.task-title');
        const finishedTag = `<div><span class="badge badge-dark">Finished</span></div>`;
        taskName.classList.toggle('finished');
        taskName.insertAdjacentHTML('afterend', finishedTag);
    }
    save();
}

function save(){
    localStorage.setItem('tasksHTML', tasksList.innerHTML);
}

if(localStorage.getItem('tasksHTML')){
    tasksList.innerHTML = localStorage.getItem('tasksHTML');
};


