const panels = document.querySelectorAll('.panel');

panels.forEach(panel => {
	panel.addEventListener('click', () => {
		clearActiveClasses();
		panel.classList.add('active');
	})
})

function clearActiveClasses () {
	panels.forEach(panel => {
		panel.classList.remove('active');
	});
};

