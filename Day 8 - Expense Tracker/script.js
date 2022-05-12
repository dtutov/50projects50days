const balanceAmount = document.querySelector('.balance__amount');
const moneyPlusField = document.getElementById('money-plus');
const moneyMinusField = document.getElementById('money-minus');
const historyList = document.getElementById('history-list');
const transactionForm = document.getElementById('transaction-form');
const transactionText = document.getElementById('transaction-text');
const transactionValue = document.getElementById('transaction-amount');

const localStorageTransactions = JSON.parse(
	localStorage.getItem('transactions')
);

let transactionData = localStorage
	.getItem('transactions') !== null ? localStorageTransactions : [];

function updateLocalStorage() {
	localStorage.setItem('transactions', JSON.stringify(transactionData));
}

function addTransactionDOM(transaction) {

	const sign = transaction.amount < 0 ? '-' : '+';
  	const item = document.createElement('li');

	item.classList.add('history__item');
	item.classList.add(
		transaction.amount < 0 ? 
			'history__item--exp' :
			'history__item--inc');

	item.innerHTML = `
		${transaction.text} 
		<span>${sign}${Math.abs(transaction.amount)}₽</span>
		<button 
		class="history__delete-btn" 
		onclick="removeTransaction(${transaction.id})">
			x
		</button>
	`;

  	historyList.appendChild(item);
};

function updateValues() {
	const amounts = transactionData.map(transaction => transaction.amount);

	const total = amounts
		.reduce((acc, item) => (acc += item), 0).toFixed(2);

	const income = amounts
		.filter(item => item > 0)
		.reduce((acc, item) => (acc += item), 0).toFixed(2);

	const expense = 
		amounts.filter(item => item < 0)
		.reduce((acc, item) => (acc += item), 0).toFixed(2);

	balanceAmount.textContent = `${total} ₽`;
	moneyMinusField.textContent = `${expense} ₽`;
	moneyPlusField.textContent = `${income} ₽`
};

function newTransaction(text, amount) {
	return ({
		id: generateID(),
		text,
		amount,
	});
};

function removeTransaction(id) {
  transactionData = transactionData.filter(transaction => transaction.id !== id);

  updateLocalStorage();

  init();
}

function addTransaction(e) {
	e.preventDefault();

	let text = transactionText.value.trim();
	let amount = transactionValue.value.trim();

	if (text === '' || amount === '') {
		if (text === '') onError(transactionText);
		if (amount === '') onError(transactionValue);
	} else {
		const item = newTransaction(text, parseInt(amount));

		transactionData.push(item);
		addTransactionDOM(item);
		updateValues();
		updateLocalStorage();

		transactionText.value = '';
		transactionValue.value = '';
	}
};

function onError(item) {
	item.classList.add('bounce');
	setTimeout(() => {
		item.classList.remove('bounce')
	}, 1000);
};

function generateID() {
	return Math.floor(Math.random() * 100000000);
};

function init() {
	historyList.innerHTML = '';
	transactionData.forEach(item => addTransactionDOM(item));
	updateValues();
};

transactionForm.addEventListener('submit', addTransaction);

init();