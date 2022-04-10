const closeButton = document.getElementById('close');
const openButton = document.getElementById('open');
const container = document.querySelector('.container');

openButton.addEventListener('click', () => container.classList.add('show-nav'));
closeButton.addEventListener('click', () => container.classList.remove('show-nav'));