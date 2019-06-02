const addFrame = document.querySelector('.frames__addFrame');
const framesList = document.querySelector('.frames__list');


// Add new frame on click 
addFrame.addEventListener('click', () => {
  let frame = document.createElement('li');
  frame.className = 'frame';
  let number = document.querySelectorAll('.frame-number').length;
  frame.innerHTML = `
    <div class="left-top-corner"><p class="frame-number">${number + 1}</p></div>
    <div class="delete-frame frame-hide-functions"><img src="assets/delete.svg" alt="Delete frame" class="frame-icons-functions"></div>
    <div class="copy-frame frame-hide-functions"><img src="assets/copy.svg" alt="Copy frame" class="frame-icons-functions"></div>
    <div class="move-frame frame-hide-functions"><img src="assets/move-dots.svg" alt="Move frame" class="frame-icons-functions"></div>`;

  framesList.appendChild(frame);
});


function updateNumFrames(num) {
  const framesList = document.querySelectorAll('.frame');
  for (let i = num - 1; i < framesList.length; i++) {
    let frameNumber = document.querySelectorAll('.frame-number');
    frameNumber[i].innerText = i + 1;
  }
}


function deleteFrame() {
  let delFrame = document.querySelectorAll('.delete-frame');

  for (let i = 0; i < delFrame.length; i++) {
    delFrame[i].addEventListener('click', (event) => {
      let frame = event.path[2];
      // check if only one frame in list
      if ((frame.parentNode !== null) && (framesList.childElementCount !== 1)) {
        frame.parentNode.removeChild(frame);
        updateNumFrames(+frame.innerText);
      } 
    });
  }
}

function draw() {
  deleteFrame();
}

setInterval(draw, 1);