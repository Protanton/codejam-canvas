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

function changeSize(elem, sizeItems, canvas, event) {
    const newSize = parseInt(event.target.id);
    if (elem.classList.contains('active')) return;
    else {
      sizeItems.forEach(element => {
        if (element.classList.contains('active')) element.classList.remove('active');
      })
      elem.classList.add('active');
    }
    switch (newSize) {
      case parseInt(document.querySelector('.small').id):
        reDraw(canvas, SMALL_URL, newSize);
        break;
      case parseInt(document.querySelector('.medium').id):
        reDraw(canvas, MEDIUM_URL, newSize);
        break;
      case parseInt(document.querySelector('.large').id):
        reDraw(canvas, LARGE_URL, newSize);
        break;
      default:
        console.log('error');
    }
}

function reDraw(canvas, url, newSize) {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    if (url === LARGE_URL) {
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      const IMAGE = new Image();
      fetch(url)
        .then(response => response.blob())
        .then(data => URL.createObjectURL(data))
        .then(imageSrc => {
          IMAGE.src = imageSrc
          return IMAGE;
        })
        .then(image => {
          image.onload = () => {
            ctx.drawImage(image, CANVAS_SIZE / 4, CANVAS_SIZE / 4);
          }
        });
    } else {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          data.forEach((elem, i) => {
            elem.forEach((color, j) => {
              if (url === SMALL_URL) {
                ctx.fillStyle = `#${color}`;
              } else {
                ctx.fillStyle = `rgba(${data[i][j]})`;
              }
              ctx.fillRect(i * (CANVAS_SIZE / newSize), j * (CANVAS_SIZE / newSize), (CANVAS_SIZE / newSize), (CANVAS_SIZE / newSize));
            });
          });
        });
    }
}