const fillBoxes = document.querySelectorAll('.fill');
const emptyBoxes = document.querySelectorAll('.empty-box');

for(const empty of emptyBoxes) {
	empty.addEventListener('dragover', dragStart);
	empty.addEventListener('dragenter', dragOver);
	empty.addEventListener('dragleave', dragEnter);
	empty.addEventListener('drop', dragLeave);
}

function dragStart () {
	console.log('start');
};

function dragOver () {
	console.log('over');
};

function dragEnter () {
	console.log('enter');
};

function dragLeave () {
	console.log('leave');
};
