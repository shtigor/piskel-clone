const frame = document.querySelector('.frame');
const hiddenFunctions = document.querySelectorAll('.frame-hide-functions');

// TODO: change to beautiful style

frame.addEventListener('mouseover', () => {
  hiddenFunctions[0].style.visibility = 'visible';
  hiddenFunctions[1].style.visibility = 'visible';
  hiddenFunctions[2].style.visibility = 'visible';
});

frame.addEventListener('mouseout', () => {
  hiddenFunctions[0].style.visibility = 'hidden';
  hiddenFunctions[1].style.visibility = 'hidden';
  hiddenFunctions[2].style.visibility = 'hidden';
});