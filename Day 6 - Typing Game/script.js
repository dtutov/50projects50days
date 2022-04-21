const gameTimer = document.getElementById('timer-value');
const printError = document.getElementById('errors-value');
const currentAccuracy = document.getElementById('accuracy-value');
const newGameButton = document.querySelector('.game-button');
const quoteTextField = document.querySelector('.quote__text');
const userInput = document.getElementById('input-area');
const gameResults = document.querySelector('.results');
const resultAccuracy = document.getElementById('results-accuracy');
const resultErrors = document.getElementById('results-errors');
const resultChars = document.getElementById('results-chars');

const TIME_LIMIN = 60;
let charTyped = 0;
let totalErrors = 0;
let accuracy = 100;
let timer = null;
let timeLeft = null;

async function getRandomQuote() {
	let quote = null;
	await fetch("https://type.fit/api/quotes")
		.then( res => res.json())
		.then( data => {
			quote = data[getRandomNumber(0, data.length)].text;
		})
		.catch(err => console.log(err));
	return quote;
};

async function updateQuote() {
	let currentQuote = await getRandomQuote();
	quoteTextField.textContent = null;

	currentQuote.split('').forEach(char => {
		const charSpan = document.createElement('span');
		charSpan.innerText = char;
		quoteTextField.appendChild(charSpan);
	});
};

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
};

function gameStart() {
	resetValues();
	updateQuote();
	userInput.disabled = false;

	clearInterval(timer);
	timer = setInterval(updateTimer, 1000);
};

function finishGame() {
	gameResults.classList.remove('hidden');
	resultAccuracy.innerHTML = `${accuracy}%`;
	resultErrors.innerHTML = totalErrors;
	resultChars.innerHTML = charTyped;
	userInput.disabled = true;
};


function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    gameTimer.innerHTML = `${timeLeft}s`;
  }
  else {
    finishGame();
  }
}

function resetValues() {
	timeLeft = TIME_LIMIN;
	totalErrors = 0;
	accuracy = 0;
  	charTyped = 0;

	gameTimer.innerHTML = `${timeLeft}s`;	
	printError.innerHTML = '0';
	currentAccuracy.innerHTML = '100%';
	userInput.value = '';
};

function gameProcess() {
	const currentText = userInput.value;
	const inputArray = currentText.split('');
	charTyped++;

	const quoteSpanArray = quoteTextField.querySelectorAll('span');
	
	quoteSpanArray.forEach((char, i) => {
		let typedChar = inputArray[i]
	
		if (typedChar == null) {
			char.classList.remove('correct');
			char.classList.remove('error');
	
		} else if (typedChar === char.innerText) {
			char.classList.add('correct');
			char.classList.remove('error');
	
		} else {
			char.classList.add('error');
			char.classList.remove('correct');
		
			totalErrors++;
		}
	});

	if(inputArray.length === quoteSpanArray.length) {
		updateQuote();
		userInput.value = '';
	}

	let correctCharacters = (charTyped - totalErrors);
	accuracy =  Math.round((correctCharacters / charTyped) * 100);

	if (accuracy < 0) {
		accuracy = 0;
	}
	
	printError.innerHTML = totalErrors;
	currentAccuracy.innerHTML = `${accuracy}%`;
};

userInput.addEventListener('focus', gameStart);

userInput.addEventListener('input', gameProcess);

newGameButton.addEventListener('click', () => {
	gameStart();
	gameResults.classList.add('hidden');
});