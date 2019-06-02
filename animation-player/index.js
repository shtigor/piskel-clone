const addFrame = document.querySelector('.frames__addFrame');
const framesList = document.querySelector('.frames__list');


// Add new frame on click 
addFrame.addEventListener('click', () => {
  const currentSelectFrame = document.querySelector('.frame-select');
  currentSelectFrame.classList.remove('frame-select');

  let frame = document.createElement('li');
  frame.className = 'frame frame-select';
  let number = document.querySelectorAll('.frame-number').length;
  frame.innerHTML = `
    <div class="left-top-corner"><p class="frame-number">${number + 1}</p></div>
    <div class="delete-frame frame-hide-functions"><img src="assets/delete.svg" alt="Delete frame" class="frame-icons-functions"></div>
    <div class="copy-frame frame-hide-functions"><img src="assets/copy.svg" alt="Copy frame" class="frame-icons-functions"></div>
    <div class="move-frame frame-hide-functions"><img src="assets/move-dots.svg" alt="Move frame" class="frame-icons-functions"></div>`;
  framesList.appendChild(frame);
});


function updateNumFrames(prevFrame) {
  const framesList = document.querySelectorAll('.frame');
  const frameNumber = document.querySelectorAll('.frame-number');
  let iter = prevFrame || 0;
  if (iter !== 0) {
    iter = +prevFrame.innerText;
  }
  for (let i = iter; i < framesList.length; i++) {
    frameNumber[i].innerText = i + 1;
  } 
}


function deleteFrame() {
  let delFrame = document.querySelectorAll('.delete-frame');

  for (let i = 0; i < delFrame.length; i++) {
    delFrame[i].addEventListener('click', (event) => {
      let frame = event.currentTarget.offsetParent;
      // check if only one frame in list
      if ((frame !== null) && (framesList.childElementCount !== 1)) {
        const prevElement = event.currentTarget.offsetParent.previousElementSibling;
        frame.parentNode.removeChild(frame);
        updateNumFrames(prevElement);

        if (!framesList.children[0].classList.contains('frame-select')) {
          selectFrame(prevElement)
        }        
      } 
    });
  }
}


function selectFrame(prevElement) {
  let frames = document.querySelectorAll('.frame');
  
  // if delete first element previous element equals null
  if (prevElement) {
    prevElement.classList.add('frame-select');
  } else if (prevElement === null) {
    framesList.firstElementChild.classList.add('frame-select');
  }
  
  // add function on frame click to change selection
  for (let i = 0; i < frames.length; i++) {
    frames[i].addEventListener('click', (event) => {
      const lastSelectFrame = document.querySelector('.frame-select');

      const currentSelectFrame = event.currentTarget;
      currentSelectFrame.classList.add('frame-select');

      const numSelectFrames = document.querySelectorAll('.frame-select');
      if (lastSelectFrame && numSelectFrames.length === 2) {
        lastSelectFrame.classList.remove('frame-select');
      }
    });
  }
}

function draw() {
  deleteFrame();
  selectFrame();
}

setInterval(draw, 10);