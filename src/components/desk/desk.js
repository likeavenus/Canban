export default function desk() {
    const deskForm = document.querySelector('.desk__box');
    const addTitleButton = document.querySelector('.js-title-add');
    const bottomPanel = document.querySelector('.js-desk__bottom');


    addTitleButton.addEventListener('click', function () {
        deskForm.classList.add('desk__box--active')
    })
}