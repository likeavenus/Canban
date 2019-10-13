export default function taskDesk() {
    const deskWrapper = document.querySelector('.desk__wrapper');
    const temp = document.querySelector('.js-template');
    const taskPopupTemp = document.querySelector('.js-task-popup');
    const dragElement = document.querySelector('.js-drag-element');


    const titles = JSON.parse(localStorage.getItem("titles")) || [];
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const testTaskArr = [
        [1,2,3],
        [4,5,6],
        [7,8,9]
    ];

    function createKanban(title, tasksArray) {
        // constants
        const template = temp.content.cloneNode(true);
        const element = template.querySelector('.taskDesk');
        const buttonSaveTitle = element.querySelector('.js-save-title');
        const buttonSave = element.querySelector('.taskDesk_button_save');
        const buttonAddTitle = element.querySelector('.js-add-column');

        const taskList = element.querySelector('.task_list');
        const taskArea = element.querySelector('.js-task-area');
        const taskInput = element.querySelector('.js-task-input');

        const closeCardBottom = element.querySelector('.js-close');
        const openCardBottom = element.querySelector('.js-add-card');

        const taskAddBox = element.querySelector('.taskDesk_add_box');

        // listeners
        buttonAddTitle.addEventListener('click', handleAddTitle);
        buttonSaveTitle.addEventListener('click', function () {
            handleSaveTitle(title)
        });

        if (title) {
            handleAddTitle();
            handleSaveTitle(title);
        }

        taskInput.addEventListener('input', handleCheckTitle);
        taskArea.addEventListener('input', handleCheckArea);

        buttonSave.addEventListener('click', handleSaveTask);

        closeCardBottom.addEventListener('click', handleCloseBottomMenu);
        openCardBottom.addEventListener('click', handleOpenBottomMenu);



        // inject template to DOM
        deskWrapper.appendChild(template);


        // Reg Exp
        const RegSpace = new RegExp(/.*\S.*/);

       // handlers
        function handleAddTitle() {
            element.classList.add('active');
            taskInput.classList.add('active');
            buttonSaveTitle.classList.add('active');
        }

        function handleCheckTitle() {
            if (!RegSpace.test(taskInput.value)) {
                buttonSaveTitle.classList.remove('emptyInput');
            } else {
                buttonSaveTitle.classList.add('emptyInput');
            }
        }

        function handleSaveTitle() {
            if (!title) {
                element.querySelector('.taskDesk_title').innerHTML = taskInput.value;
                titles.push(taskInput.value);
                localStorage.setItem('titles', JSON.stringify(titles));
                createKanban();
            } else {
                element.querySelector('.taskDesk_title').innerHTML = title;
            }
            taskAddBox.classList.remove('addColumn');
            taskAddBox.classList.add('active');
        }

        function handleCheckArea() {
            if (!RegSpace.test(taskArea.value)) {
                taskAddBox.classList.add('emptyArea');
            } else {
                taskAddBox.classList.remove('emptyArea');
            }
        }

        function handleSaveTask() {
            const newTask = document.createElement('li');
            const newTaskTextElem = document.createElement('span');
            newTaskTextElem.classList.add('js-task-text');
            newTask.appendChild(newTaskTextElem);
            const newTaskPopup = taskPopupTemp.content.cloneNode(true);

            const taskItemPopup = newTaskPopup.querySelector('.js-task-popup-list');
            const openTaskEditorButton = newTaskPopup.querySelector('.js-task-item-btn');
            const taskRemoveButton = newTaskPopup.querySelector('.js-task-item-delete');
            const taskEditButton = newTaskPopup.querySelector('.js-task-item-edit');
            const taskEditInput = newTaskPopup.querySelector('.js-input-task');
            const taskSaveButton = newTaskPopup.querySelector('.js-task-item-save');

            if(!tasksArray) {
                newTask.classList.add('task_item');
                newTaskTextElem.innerHTML = taskArea.value;
                newTask.appendChild(newTaskPopup);
                taskList.appendChild(newTask);

                dragAndDrop(newTask);
                taskArea.value = '';
                taskAddBox.classList.add('emptyArea');

                tasks.push(newTask.innerHTML);
                // localStorage.setItem('tasks', JSON.stringify(tasks));
                // console.log(localStorage.getItem('tasks'));

                openTaskEditorButton.addEventListener('mousedown', function (e) {
                    e.stopPropagation();
                });

                taskSaveButton.addEventListener('mousedown', function (e) {
                    e.stopPropagation();
                });

                openTaskEditorButton.addEventListener('click', handleOpenTaskEditor);
                taskRemoveButton.addEventListener('click', handleRemoveTask);
                taskEditButton.addEventListener('click', handleEditTask);
                taskSaveButton.addEventListener('click', handleSaveEditTask);

                taskItemPopup.addEventListener('mousedown', function (e) {
                    e.stopPropagation();
                }, false);

                taskEditInput.addEventListener('mousedown', function (e) {
                    e.stopPropagation();
                }, false);

                taskEditInput.addEventListener('input', handleEditTaskInput);
            }
        }


        function handleCloseBottomMenu() {
            taskAddBox.classList.remove('active');
        }

        function handleOpenBottomMenu() {
            taskAddBox.classList.add('active');
        }

        function handleOpenTaskEditor() {
            this.closest('.task_item').classList.add('cantDrag');
            this.closest('.task_item').querySelector('.js-task-popup-list').classList.add('active');
        }

        function handleRemoveTask() {
            this.closest('.task_item').remove();
        }

        function handleEditTask() {
            this.closest('.task_item').querySelector('.js-task-popup-controls').classList.add('active');
            this.closest('.task_item').querySelector('.js-input-task').value = this.closest('.task_item').querySelector('.js-task-text').innerHTML;
            this.closest('.task_item').querySelector('.js-task-popup-list').classList.remove('active');
        }

        function handleEditTaskInput() {
            if (!RegSpace.test(this.value)) {
                this.nextElementSibling.classList.remove('valid');
            } else {
                this.nextElementSibling.classList.add('valid');
            }
        }

        function handleSaveEditTask() {
            const parent = this.closest('.taskDesk');
            if(this.classList.contains('valid')) {
                parent.querySelector('.js-task-text').innerHTML = parent.querySelector('.js-input-task').value;
                parent.querySelector('.js-task-popup-controls').classList.remove('active');
                console.log(parent);
                parent.querySelector('.task_item').classList.remove('cantDrag');
            }
        }

        function dragAndDrop(elem) {

            elem.addEventListener('mousedown', function (e) {

                if (!elem.classList.contains('cantDrag')) {
                    e.preventDefault();
                    e.stopPropagation();
                    let startCoords = {
                        x: e.clientX,
                        y: e.clientY
                    };


                    dragElement.style.top = elem.getBoundingClientRect().top + 'px';
                    dragElement.style.left = elem.getBoundingClientRect().left + 'px';

                    function onMouseMove(moveEvt) {
                        moveEvt.preventDefault();

                        let shift = {
                            x: startCoords.x - moveEvt.clientX,
                            y: startCoords.y - moveEvt.clientY
                        };

                        startCoords = {
                            x: moveEvt.clientX,
                            y: moveEvt.clientY
                        };

                        dragElement.innerHTML = elem.innerHTML;
                        dragElement.style.display = 'block';
                        dragElement.style.zIndex = 1000;

                        elem.classList.add('onDrag');

                        dragElement.style.top = (dragElement.offsetTop - shift.y) + 'px';
                        dragElement.style.left = (dragElement.offsetLeft - shift.x) + 'px';
                        dragElement.style.pointerEvents = 'none';
                        dragElement.style.opacity = '.8';
                        document.body.style.cursor = 'move';

                        let elementUnderMouse = document.elementFromPoint(moveEvt.x, moveEvt.y);

                        if (elementUnderMouse.classList.contains('task_item') && !elementUnderMouse.classList.contains('onDrag')) {
                            elementUnderMouse.classList.add('pauseDrag');

                            elementUnderMouse.addEventListener('mouseout', function () {
                                elementUnderMouse.classList.remove('pauseDrag');
                            })
                        }
                    }

                    const onMouseUp = function (upEvt) {
                        upEvt.preventDefault();
                        document.removeEventListener('mousemove', onMouseMove);
                        document.removeEventListener('mouseup', onMouseUp);
                        dragElement.style.pointerEvents = 'auto';
                        dragElement.style.opacity = '1';

                        elem.classList.remove('onDrag');
                        dragElement.style.display = 'none';
                        document.body.style.cursor = 'auto';

                        let elementUnderMouse = document.elementFromPoint(upEvt.x, upEvt.y);
                        elementUnderMouse.classList.remove('pauseDrag');

                        if (elementUnderMouse.classList.contains('task_item')) {

                            let elemUnderMouseHTML = elementUnderMouse.innerHTML;
                            let currentElem = elem.innerHTML;


                            elem.innerHTML = elemUnderMouseHTML;
                            elementUnderMouse.innerHTML = currentElem;

                        }

                        elem.querySelector('.js-task-item-btn').addEventListener('click', handleOpenTaskEditor);
                        elem.querySelector('.js-task-item-delete').addEventListener('click', handleRemoveTask);
                        elem.querySelector('.js-task-item-edit').addEventListener('click', handleEditTask);
                        elem.querySelector('.js-task-item-save').addEventListener('click', handleSaveEditTask);
                        elem.querySelector('.js-input-task').addEventListener('input', handleEditTaskInput);
                    };

                    document.addEventListener('mousemove', onMouseMove);
                    document.addEventListener('mouseup', onMouseUp);
                }

            })


        }

    }



    if (localStorage.getItem('titles')) {
        const titlesLength = JSON.parse(localStorage.getItem('titles')).length;
        const titlesArray = JSON.parse(localStorage.getItem('titles'));

        for (let i = 0; i < titlesLength; i++) {
            createKanban(titlesArray[i]);
        }
        createKanban();
    } else {
        createKanban();
    }
}