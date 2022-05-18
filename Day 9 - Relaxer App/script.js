const pageTitle = document.querySelector('.page-title');
const circle = document.querySelector('.circle');
const circleText = document.querySelector('.circle__text');
const circleButton = document.querySelector('.circle__button');
const circleArrow = document.querySelector('.arrow');

const TRANING_TIME = 60;
const totalBreathTime = 10000;
const breathTime = totalBreathTime / 4;
let breath = null;
let timer = null;
let breathingTime = null;

function startBreath() {
	circleText.classList.remove('hidden');
	circleButton.classList.add('hidden');
	circleArrow.classList.add('start');

	breathingTime = TRANING_TIME;
	breathAnimation();

	breath = setInterval(breathAnimation, totalBreathTime);

	clearInterval(timer);
	timer = setInterval(updateTimer, 1000);
};

function finishBreath() {
	circleText.classList.add('hidden');
	circleButton.classList.remove('hidden');
	circleArrow.classList.remove('start');
	pageTitle.innerHTML = 'Relaxing breath';

	clearInterval(breath);
};

function updateTimer() {
	if (breathingTime > 2) {
		breathingTime--;
		pageTitle.innerHTML = `${breathingTime}s`;
	}
	else {
		finishBreath();
	}
};

function breathAnimation() {
	circle.className = 'circle grow';
	circleText.innerText = 'Breathe In!';

	setTimeout(() => {
		circleText.innerText = 'Hold';
	}, breathTime);

	setTimeout(() => {
		circleText.innerText = 'Breathe Out!';
		circle.className = 'circle shrink';
	}, (breathTime * 2));

	setTimeout(() => {
		circleText.innerText = 'Hold';
	}, (breathTime * 3));
};

circleButton.addEventListener('click', startBreath);