const addFrame = document.querySelector('.frames__addFrame');
const framesList = document.querySelector('.frames__list');
const canvasHeight = 640;
const canvasWidth = 640;

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
    <div class="move-frame frame-hide-functions"><img src="assets/move-dots.svg" alt="Move frame" class="frame-icons-functions"></div>
    <canvas class="frame-canvas" width="107" height="107"></canvas>`;
  framesList.appendChild(frame);

  const drawing = document.querySelector('.drawing');
  const canvas = document.createElement('canvas');
  canvas.className = 'canvas-main';
  // TODO: change statis values
  canvas.setAttribute('width', canvasWidth);
  canvas.setAttribute('height', canvasHeight);

  drawing.appendChild(canvas);

  const canvasList = document.querySelectorAll('.canvas-main');
  for (let i = 0; i < canvasList.length - 1; i++) {
    canvasList[i].classList.add('hide-main-canvas');
  }
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


function deleteFrame(target) {
  
  // check if only one frame in list
  if ((target.offsetParent !== null) && (framesList.childElementCount !== 1)) {
    const frame = target.offsetParent;
    const prevElement = frame.previousElementSibling;
    frame.parentNode.removeChild(frame);
    updateNumFrames(prevElement);

    if (!framesList.children[0].classList.contains('frame-select')) {
      selectFrame(prevElement)
    }

    // delete main canvas from canvas list
    if (prevElement) {
      const canvasList = document.querySelectorAll('.canvas-main');
      const deleteCanvas = canvasList[+prevElement.innerText - 1];
      deleteCanvas.parentNode.removeChild(deleteCanvas); 
    } else {
      // const firstCanvasList = document.querySelectorAll('.canvas-main')[0];
      // firstCanvasList.parentNode.removeChild(firstCanvasList); 

      const canvasList = document.querySelectorAll('.canvas-main');
      canvasList[1].classList.remove('hide-main-canvas');
      canvasList[0].parentNode.removeChild(canvasList[0]); 
    }
  }
}

function copyFrame(target) {
  if (target.offsetParent.classList.contains('frame-select')) {
    const currentFrame = target.offsetParent;
    const parent = currentFrame.parentNode;
    const number = +currentFrame.querySelector('.frame-number').innerText;
    const prevCanvasFrame = currentFrame.querySelector('.frame-canvas');

    const canvasList = document.querySelectorAll('.canvas-main');
    const parentCanvasMain = document.querySelector('.drawing');
    const prevCanvasMain = canvasList[number - 1];
    prevCanvasMain.classList.add('hide-main-canvas');

    const newFrame = document.createElement('li');
    newFrame.className = 'frame frame-select';
    newFrame.innerHTML = `
      <div class="left-top-corner"><p class="frame-number">${number + 1}</p></div>
      <div class="delete-frame frame-hide-functions"><img src="assets/delete.svg" alt="Delete frame" class="frame-icons-functions"></div>
      <div class="copy-frame frame-hide-functions"><img src="assets/copy.svg" alt="Copy frame" class="frame-icons-functions"></div>
      <div class="move-frame frame-hide-functions"><img src="assets/move-dots.svg" alt="Move frame" class="frame-icons-functions"></div>
      <canvas class="frame-canvas" width="107" height="107"></canvas>`;
      
    currentFrame.classList.remove('frame-select');

    parent.insertBefore(newFrame, currentFrame.nextSibling);

    updateNumFrames(newFrame);

    const mainCanvas = document.createElement('canvas');
    mainCanvas.className = 'canvas-main';
    // TODO: change statis values
    mainCanvas.width = canvasWidth;
    mainCanvas.height = canvasHeight;

    parentCanvasMain.insertBefore(mainCanvas, prevCanvasMain.nextSibling);

    mainCanvas.getContext('2d').drawImage(prevCanvasMain, 0, 0);
    newFrame.querySelector('.frame-canvas').getContext('2d').drawImage(prevCanvasFrame, 0, 0);
  }
}

function operationsOnFrame() {
  const framesList = document.querySelector('.frames__list');
  framesList.addEventListener('click', (event) => {
    let target = event.target;

    while (!target.classList.contains('frames__list') || target === null) {
      if (target.classList.contains('copy-frame')) {
        copyFrame(target);
      } else if (target.classList.contains('delete-frame')) {
        deleteFrame(target);
      } else if (target.classList.contains('move-frame')) {
        console.log('move');
      }
      target = target.parentNode || framesList.children[0].parentNode;
    }
  });
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


      const lastCanvas = document.querySelector('.canvas-main:not(.hide-main-canvas)');

      const canvasList = document.querySelectorAll('.canvas-main');
      canvasList[+currentSelectFrame.innerText - 1].classList.remove('hide-main-canvas');

      const numShownCanvas = document.querySelectorAll('.canvas-main:not(.hide-main-canvas)');
      if (lastCanvas && numShownCanvas.length === 2) {
        lastCanvas.classList.add('hide-main-canvas');
      }


    });
  }
}


// INSTRUMENTS


function selectInstrument() {
  const instruments = document.querySelector('.pallete__ul').children;

  for (let i = 0; i < instruments.length; i++) {
    instruments[i].addEventListener('click', (event) => {
      const lastSelectInstrument = document.querySelector('.instrument-select');

      const selectedInstrument = event.currentTarget;
      selectedInstrument.classList.add('instrument-select');

      const numSelectInstruments = document.querySelectorAll('.instrument-select');
      if (lastSelectInstrument && numSelectInstruments.length === 2) {
        lastSelectInstrument.classList.remove('instrument-select');
      }
    });
  }

  const pencilTool = document.querySelector('.pallete__ul--pencil');
  const selectedInstrument = document.querySelector('.instrument-select');

  if (selectedInstrument === pencilTool) {
    const canvas = document.querySelector('.canvas-main:not(.hide-main-canvas)');
    const context = canvas.getContext('2d');
    let isDrawing;

    canvas.addEventListener('mousedown', (event) => {
      isDrawing = true;
      context.moveTo(event.layerX, event.layerY);
    });

    canvas.addEventListener('mousemove', (event) => {
      if (isDrawing) {
        context.lineWidth = 20;
        context.lineTo(event.layerX, event.layerY);
        context.stroke();
      }
    });

    canvas.addEventListener('mouseup', (event) => {
      const currentCanvas = event.currentTarget;
      const currentFrame = document.querySelector('.frame-select');
      const canvasStyle = window.getComputedStyle(currentCanvas);
      const widthCanvas = parseInt(canvasStyle.getPropertyValue('width'));
      const heightCanvas = parseInt(canvasStyle.getPropertyValue('height'));

      let context = currentFrame.lastElementChild.getContext('2d');
      
      context.drawImage(currentCanvas, 0, 0, widthCanvas, heightCanvas, 0, 0, 107, 107);
      isDrawing = false;
    });
  }

}

function draw() {
  selectInstrument();
  selectFrame();
  operationsOnFrame();

}

setInterval(draw, 700);