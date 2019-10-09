export default function taskDesk() {
    const deskWrapper = document.querySelector('.desk__wrapper');
    const temp = document.querySelector('.js-template');
    const deskClone = temp.content.cloneNode(true);

    class Kanban {
        constructor() {
            this.element = temp.content.cloneNode(true);
            const element = this.element.querySelector('.taskDesk');

            const taskDesk = element.querySelector('.taskDesk');
            const taskAddBox = element.querySelector('.taskDesk_add_box');
            const buttonSave = element.querySelector('.taskDesk_button_save');
            const buttonAddTitle = element.querySelector('.js-add-column');
            const buttonSaveTitle = element.querySelector('.js-save-title');

            const taskArea = element.querySelector('.js-task-area');
            const taskInput = element.querySelector('.js-task-input');
            const taskList = element.querySelector('.task_list');

            const closeCardBottom = element.querySelector('.js-close');
            const openCardBottom = element.querySelector('.js-add-card');



            buttonAddTitle.addEventListener('click', this.handleAddTitle.bind(element));
            buttonSaveTitle.addEventListener('click', this.handleSaveTitle.bind(element));
            taskInput.addEventListener('input', this.handleCheckTitle.bind(element));
            taskArea.addEventListener('input', this.handleCheckArea.bind(element));
            buttonSave.addEventListener('click', this.handleSaveTask.bind(element));
            closeCardBottom.addEventListener('click', this.handleCloseBottomMenu.bind(element));
            openCardBottom.addEventListener('click', this.handleOpenBottomMenu.bind(element));

        }

        handleAddTitle() {
            const taskInput = this.querySelector('.js-task-input');
            const buttonSaveTitle = this.querySelector('.js-save-title');

            this.classList.add('active');
            taskInput.classList.add('active');
            buttonSaveTitle.classList.add('active');
        }

        handleCheckTitle() {
            const taskInput = this.querySelector('.js-task-input');
            const buttonSaveTitle = this.querySelector('.js-save-title');
            const RegSpace = new RegExp(/.*\S.*/);

            if (!RegSpace.test(taskInput.value)) {
                buttonSaveTitle.classList.remove('emptyInput');
            } else {
                buttonSaveTitle.classList.add('emptyInput');
            }
        }

        handleSaveTitle() {
            const taskAddBox = this.querySelector('.taskDesk_add_box');
            const taskInput = this.querySelector('.js-task-input');

            this.querySelector('.taskDesk_title').innerHTML = taskInput.value;

            taskAddBox.classList.remove('addColumn');
            taskAddBox.classList.add('active');


            new Kanban().appendDesk();
        }

        handleCheckArea() {
            const taskArea = this.querySelector('.js-task-area');
            const taskAddBox = this.querySelector('.taskDesk_add_box');
            const RegSpace = new RegExp(/.*\S.*/);

            if (!RegSpace.test(taskArea.value)) {
                taskAddBox.classList.add('emptyArea');
            } else {
                taskAddBox.classList.remove('emptyArea');
            }
        }

        handleSaveTask() {
            const taskList = this.querySelector('.task_list');
            const taskArea = this.querySelector('.js-task-area');
            const taskAddBox = this.querySelector('.taskDesk_add_box');
            const newTask = document.createElement('li');

            newTask.classList.add('task_item');
            newTask.innerHTML = taskArea.value;
            taskList.appendChild(newTask);

            taskArea.value = '';
            taskAddBox.classList.add('emptyArea');
        }

        handleCloseBottomMenu() {
            const taskAddBox = this.querySelector('.taskDesk_add_box');
            taskAddBox.classList.remove('active');
        }

        handleOpenBottomMenu() {
            const taskAddBox = this.querySelector('.taskDesk_add_box');
            taskAddBox.classList.add('active');
        }

        appendDesk() {
            deskWrapper.appendChild(this.element);
        }
    }

    const newDesk = new Kanban();
    newDesk.appendDesk();
}