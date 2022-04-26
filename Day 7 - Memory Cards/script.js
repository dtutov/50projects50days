const cardsContainer = document.querySelector('.cards-container');
const addNewCardsButton = document.querySelector('.new-cards');
const prevCard = document.getElementById('prev-card');
const nextCard = document.getElementById('next-card');
const currentCardNumber = document.querySelector('.cards-nav__count');
const addNewForm = document.querySelector('.add-container');
const addNewFormCloseButton = document.querySelector('.add-container__close');
const questionFormElement = document.getElementById('question');
const answerFormElement = document.getElementById('answer');
const addNewCardButton = document.querySelector('.add-container__button');
const clearCardsButton = document.querySelector('.clear-cards');

let currentActiveCard = 0;
const cardsList = [];

const cardsData = getCardsData();

function createCards() {
	cardsData.forEach((card, index) => createCard(card, index));
};

createCards();

function createCard(data, index) {

	const {question, answer} = data;

	const card = document.createElement('div');
	card.classList.add('card');

	if (index === 0) {
		card.classList.add('active');
	}

	card.innerHTML = `
		<div class="inner-card">
			<div class="inner-card__front">
				<p>${question}</p>
			</div>
			<div class="inner-card__back">
				<p>${answer}</p>
			</div>
		</div>
	`;

	card.addEventListener('click', () => card.classList.toggle('show-answer'));

	cardsList.push(card);
	cardsContainer.appendChild(card);
	updateCardsCounter();
};

function updateCardsCounter() {
	currentCardNumber.innerText = `${currentActiveCard + 1}/${cardsList.length}`;
};

function getCardsData() {
	const cards =JSON.parse(localStorage.getItem('cards'));
	return cards === null ? [] : cards;
};

function setCardsData(cards) {
	localStorage.setItem('cards', JSON.stringify(cards));
	window.location.reload();
};

nextCard.addEventListener('click', () => {
	cardsList[currentActiveCard].className = 'card left';
	currentActiveCard++;

	if (currentActiveCard > cardsList.length - 1) {
		currentActiveCard = cardsList.length - 1;
	}

	cardsList[currentActiveCard].className = 'card active';
	updateCardsCounter();
});

prevCard.addEventListener('click', () => {
	cardsList[currentActiveCard].className = 'card';

	currentActiveCard--;
	
	if (currentActiveCard < 0) {
		currentActiveCard = 0;
	} 

	cardsList[currentActiveCard].className = 'card active';
	updateCardsCounter();
});

addNewCardsButton.addEventListener('click', () => {
	addNewForm.classList.remove('hidden');
});

addNewFormCloseButton.addEventListener('click', () => {
	addNewForm.classList.add('hidden');
});

addNewCardButton.addEventListener('click', () => {
	const question = questionFormElement.value;
	const answer = answerFormElement.value;

	if (question.trim() && answer.trim()) {
		const newCard = {question, answer};
		
		createCard(newCard);
		
		questionFormElement.value = '';
		answerFormElement.value = '';
		
		addNewForm.classList.add('hidden');	

		cardsData.push(newCard);
		setCardsData(cardsData);
	}
});

clearCardsButton.addEventListener('click', () => {
	localStorage.clear();
	cardsContainer.innerHTML = '';
	window.location.reload();
});