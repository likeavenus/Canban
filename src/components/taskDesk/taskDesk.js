export default function taskDesk() {
    const deskWrapper = document.querySelector('.desk__wrapper');
    const taskDesk = document.querySelector('.taskDesk');

    const taskAddBox = document.querySelector('.taskDesk_add_box');

    const buttonAdd = document.querySelector('.js-add-card');
    const buttonSave = document.querySelector('.taskDesk_button_save');
    const buttonAddTitle = document.querySelector('.js-add-column');
    const buttonSaveTitle = document.querySelector('.js-save-title');

    const taskArea = document.querySelector('.js-task-area');
    const taskInput = document.querySelector('.js-task-input');
    const taskList = document.querySelector('.task_list');

    const closeCardButton = document.querySelector('.js-close');

    const KEY_ENTER = '13';


    buttonSaveTitle.addEventListener('click', function (evt) {
        document.querySelector('.taskDesk_title').innerHTML = taskInput.value;

        taskAddBox.classList.remove('addColumn');
        taskAddBox.classList.add('active');
    });

    buttonAddTitle.addEventListener('click', function () {
        taskDesk.classList.add('active');
        taskInput.classList.add('active');
        buttonSaveTitle.classList.add('active');
    });


    taskInput.addEventListener('input', function (evt) {
        if (taskInput.value === '') {
            buttonSaveTitle.classList.remove('emptyInput');
        } else {
            buttonSaveTitle.classList.add('emptyInput');
        }
    });

    taskArea.addEventListener('input', function (evt) {
        if (taskArea.value === '') {
            taskAddBox.classList.add('emptyArea');
        } else {
            taskAddBox.classList.remove('emptyArea');
        }
    });

    buttonSave.addEventListener('click', function (evt) {
        const newTask = document.createElement('li');
        newTask.classList.add('task_item');
        newTask.innerHTML = taskArea.value;
        taskList.appendChild(newTask);

        taskArea.value = '';
        taskAddBox.classList.add('emptyArea');
    });

    closeCardButton.addEventListener('click', function (evt) {
        taskAddBox.classList.remove('active');
    });

    buttonAdd.addEventListener('click', function (evt) {
        taskAddBox.classList.add('active');
    })

}