const SMALL_URL = 'https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/4x4.json';
const MEDIUM_URL = `https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/32x32.json`;
const LARGE_URL = `https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/image.png`;
const DEFAULT_SIZE = 32;
const CANVAS_SIZE = 512;

(function main() {
    let canvas = document.querySelector('#canvas');
    let ctx = canvas.getContext('2d');
  
    ctx.imageSmoothingEnabled = false;
    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;
  
    const sizeItems = document.querySelectorAll('.size-item');
  
    sizeItems.forEach(elem => {
      elem.addEventListener('click', (event) => changeSize(elem, sizeItems, canvas, event));
    })
  
    reDraw(canvas, MEDIUM_URL, DEFAULT_SIZE);
})();