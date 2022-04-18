const currencySelectBase = document.getElementById('currency-one');
const currencySelectTarget = document.getElementById('currency-two');
const amountInputBase = document.getElementById('amount-one');
const amountInputTarget = document.getElementById('amount-two');
const rateInfo = document.getElementById('rate');
const swapButton = document.getElementById('swap');
const currentData = document.querySelector('.current-data');

const API_KEY = '4bff45a009000f23fa5d1e99';

function calculate() {
	const currencyBase = currencySelectBase.value;
	const currencyTarget = currencySelectTarget.value;

	fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${currencyBase}`)
		.then(res => res.json())
		.then(data => {
			rate = data.conversion_rates[currencyTarget];

			rateInfo.innerHTML = `1 ${currencyBase} = ${rate} ${currencyTarget}`;

			amountInputTarget.value = (amountInputBase.value * rate).toFixed(2);
		})
};

function setCurrentDate() {
	const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	const today  = new Date();

	date = today.toLocaleDateString("en-US", options).split(', ');

	currentData.innerHTML = `${date[1]} ${date[2]}`
}

amountInputBase.addEventListener('change', calculate);
amountInputTarget.addEventListener('change', calculate);
currencySelectBase.addEventListener('change', calculate);
currencySelectTarget.addEventListener('change', calculate);
swapButton.addEventListener('click', () => {
	const baseValue = currencySelectBase.value;
	currencySelectBase.value = currencySelectTarget.value;
	currencySelectTarget.value = baseValue;
	calculate();
});

calculate();
setCurrentDate();