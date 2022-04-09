const progress = document.getElementById('progress');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const circles = document.querySelectorAll('.circle');

let currentValue = 1;

nextButton.addEventListener('click', () => {
	currentValue++;

	if(currentValue > 4) {
		currentValue = 4;
	}

	update();
});

prevButton.addEventListener('click', () => {
	currentValue--;

	if (currentValue < 1) {
		currentValue = 1;
	}

	update();
});

function update () {
	circles.forEach((circle, i) => {
		if (i < currentValue) {
			circle.classList.add('active');
		} else {
			circle.classList.remove('active');
		}
	});

	if (currentValue === 1) {
		prevButton.disabled = true;
	} else if (currentValue === circles.length) {
		nextButton.disabled = true;
	} else {
		prevButton.disabled = false;
		nextButton.disabled = false;
	}

	const actives = document.querySelectorAll('.active');

	progress.style.width = ((actives.length - 1) / (circles.length - 1) * 100) + '%';
}