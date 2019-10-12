export default function taskDesk() {
    const deskWrapper = document.querySelector('.desk__wrapper');
    const temp = document.querySelector('.js-template');
    const dragElement = document.querySelector('.js-drag-element');


    function createKanban() {
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
        buttonSaveTitle.addEventListener('click', handleSaveTitle);

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

                element.querySelector('.taskDesk_title').innerHTML = taskInput.value;

                taskAddBox.classList.remove('addColumn');
                taskAddBox.classList.add('active');

                createKanban();
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

                newTask.classList.add('task_item');
                newTask.innerHTML = taskArea.value;
                taskList.appendChild(newTask);

                dragAndDrop(newTask, taskList);


                taskArea.value = '';
                taskAddBox.classList.add('emptyArea');
            }


            function handleCloseBottomMenu() {
                taskAddBox.classList.remove('active');
            }

            function handleOpenBottomMenu() {
                taskAddBox.classList.add('active');
            }
    }

    createKanban();

    function dragAndDrop(elem, parent) {
        elem.addEventListener('mousedown', function (e) {
            e.preventDefault();
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

                elem.classList.add('ondrag');

                dragElement.style.top = (dragElement.offsetTop - shift.y) + 'px';
                dragElement.style.left = (dragElement.offsetLeft - shift.x) + 'px';
                dragElement.style.pointerEvents = 'none';
                dragElement.style.opacity = '.8';
                document.body.style.cursor = 'move';
            }

            const onMouseUp = function (upEvt) {
                upEvt.preventDefault();
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
                dragElement.style.pointerEvents = 'auto';
                dragElement.style.opacity = '1';

                elem.classList.remove('ondrag');
                dragElement.style.display = 'none';
                document.body.style.cursor = 'auto';

                let elementUnderMouse = document.elementFromPoint(upEvt.x, upEvt.y);

                if (elementUnderMouse.classList.contains('task_item')) {

                    let elemUnderMouseHTML = elementUnderMouse.innerHTML;
                    let currentElem = elem.innerHTML;


                    elem.innerHTML = elemUnderMouseHTML;
                    elementUnderMouse.innerHTML = currentElem;
                    console.log(elementUnderMouse, elem);

                    console.log(elem.parentElement);

                }



            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        })
    }
}