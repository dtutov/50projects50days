const fillBox = document.querySelector('.fill');
const emptyBoxes = document.querySelectorAll('.empty-box');

fillBox.addEventListener('dragstart', dragStart);
fillBox.addEventListener('dragend', dragEnd);

emptyBoxes.forEach((empty) => {
	empty.addEventListener('dragover', dragOver);
	empty.addEventListener('dragenter', dragEnter);
	empty.addEventListener('dragleave', dragLeave);
	empty.addEventListener('drop', dragDrop);
});

function dragStart(e) {
	this.className += ' hold';
	setTimeout(() => this.className = 'invisible', 0);
};

function dragEnd() {
	this.className = 'fill';
};

function dragOver(evt) {
	evt.preventDefault();
};

function dragEnter(evt) {
	evt.preventDefault();
	this.className += ' hovered';
};

function dragLeave() {
	this.className = 'empty-box';
};

function dragDrop() {
	this.className = 'empty-box';
	this.append(fillBox);
}