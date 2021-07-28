const body = document.querySelector('body');
const mix = document.getElementById('mix');
const paletteBoard = document.getElementById('color-palette');
const randomPalette = document.querySelectorAll('.random-palette');
const paletteButton = document.getElementById('palette-button');
const stopPlayButton = document.getElementById('pause-play');
const reseter = document.getElementById('reset');
const inputBoard = document.getElementById('board-size');
const conditionAlertLarge = document.getElementById('conditionNumber-large');
const conditionAlertMedium = document.getElementById('conditionNumber-medium');
const resizeButton = document.getElementById('pix-size');
const twistButton = document.getElementById('twist-button');
const borders = document.querySelectorAll('.random-color');
let idInterval = null;
let idBg = null;
let idBorder = null;

const selected = () => document.querySelector('.selected');

const color = () => selected().style.backgroundColor;

const allPixels = () => document.querySelectorAll('.pixel');

// cria uma cor aleatória em RGB
const number = () => Math.floor(Math.random() * 255);
const rgbColor = () => `rgb(${number()}, ${number()}, ${number()})`;

// muda a cor de background para um 'gradient' aleatório
const bgColor = () => {
  body.style.backgroundImage = `linear-gradient(${rgbColor()}, ${rgbColor()})`;
};

// muda cor de bordas pra um tom de 'preto + branco'
const bordersCol = () => {
  const value = number();
  for (let ind = 0; ind < borders.length; ind += 1) {
    borders[ind].style.borderColor = `rgb(${value}, ${value}, ${value})`;
  }
};

// executa 'bgColor()' e 'bordersCol()' em intervalos
const bordersBgColorChange = () => {
  const id1 = setInterval(bordersCol, 4000);
  idBorder = id1;
  const id = setInterval(bgColor, 9000);
  idBg = id;
};

// pausa ou reinicia 'bordersBgColorChange()'
function stopPlay() {
  if (idBg !== null) {
    clearInterval(idBg);
    clearInterval(idBorder);
    idBg = null;
    idBorder = null;
  } else {
    bordersBgColorChange();
  }
}

// gera cores aleatórias para o 'color-palette'
function randomColorInterval() {
  function colorRandom() {
    for (let index = 0; index < randomPalette.length; index += 1) {
      randomPalette[index].style.backgroundColor = rgbColor();
    }
    mix.style.color = rgbColor();
  }
  const event = setInterval(colorRandom, 100);
  idInterval = event;
}

// cria botão para 'randomColorInterval()'
function randomColorButton() {
  if (idInterval === null) {
    randomColorInterval();
  } else {
    clearInterval(idInterval);
    mix.style.color = 'black';
    idInterval = null;
  }
}

// cria botão para resetar 'color-palette'
function resetPalette() {
  randomPalette[0].style.backgroundColor = 'red';
  randomPalette[1].style.backgroundColor = 'green';
  randomPalette[2].style.backgroundColor = 'blue';
}

// nome auto-explicativo
function pixResize() {
  const pixels = allPixels();
  for (let index = 0; index < pixels.length; index += 1) {
    const pix = pixels[index];
    if (pix.style.width === '30px') {
      pix.style.width = '25px';
      pix.style.height = '25px';
    } else {
      pix.style.width = '30px';
      pix.style.height = '30px';
    }
  }
}

// pinta todos os pixels cada um com uma cor aleatória
function colorTwister() {
  const allPix = allPixels();
  for (let index = 0; index < allPix.length; index += 1) {
    allPix[index].style.backgroundColor = rgbColor();
  }
}

// adiciona, em todos pixels, evento de mudança de cor ao clicar
function colorPix(value) {
  const allPix = allPixels();
  for (let index = 0; index < allPix.length; index += 1) {
    allPix[index].addEventListener('click', (event) => {
      const clicked = event.target;
      clicked.style.backgroundColor = value;
    });
  }
}

// remove a classe 'selected' do palete de cor atual
function removeClass() {
  selected().className = 'color';
}

// define a classe 'selected' ao palete de cor clicado
function defineClass() {
  paletteBoard.addEventListener('click', (event) => {
    removeClass();
    const clicked = event.target;
    clicked.className = 'color selected';
    colorPix(color());
  });
}

// cria botão que retorna a backgroundColor de todos os pixels para branco
function clearButton() {
  const button = document.getElementById('clear-board');
  button.addEventListener('click', () => {
    const clearPix = document.querySelectorAll('.pixel');
    for (let index = 0; index < clearPix.length; index += 1) {
      clearPix[index].style.backgroundColor = 'white';
    }
  });
}

// cria um 'PIXEL'
function createPix() {
  const pix = document.createElement('div');
  pix.className = 'pixel';
  return pix;
}

// captura o valor do 'boad-size' e o retorna condicionalmente
// destaca o aviso de número max/min caso seja desrespeitado
function inputValue(num) {
  const currentInput = inputBoard.value;
  conditionAlertLarge.className = 'conditionTrue';
  conditionAlertMedium.className = 'conditionTrue';
  if (currentInput < 5) {
    conditionAlertLarge.className = 'conditionFalse';
    conditionAlertMedium.className = 'conditionFalse';
    return 5;
  }
  if (currentInput > num) {
    conditionAlertLarge.className = 'conditionFalse';
    conditionAlertMedium.className = 'conditionFalse';
    return num;
  }
  return currentInput;
}

// cria um linha de pixels de acordo com 'inputValue'
function createLine(num) {
  const coluns = inputValue(num);
  const parentDiv = document.createElement('div');
  parentDiv.setAttribute('class', 'tableRow');
  for (let index = 1; index <= coluns; index += 1) {
    const currentDiv = createPix();
    parentDiv.appendChild(currentDiv);
  }
  return parentDiv;
}

// repete as linhas de acordo com 'inputValue'
function createTable(num) {
  const pixBoard = document.getElementById('pixel-board');
  const lines = inputValue(num);
  for (let index = 1; index <= lines; index += 1) {
    const lineDiv = createLine(num);
    pixBoard.appendChild(lineDiv);
  }
}

// remove todo o quadro de pixels
function removeTable() {
  const currentBoard = document.getElementById('pixel-board');
  const currentTable = document.querySelectorAll('.tableRow');
  for (let index = 0; index < currentTable.length; index += 1) {
    currentBoard.removeChild(currentTable[index]);
  }
}

// botão para criar nova tabela de pixels conforme 'inputValue'
function createNewTable(id, num) {
  const inputButton = document.getElementById(id);
  inputButton.addEventListener('click', () => {
    removeTable();
    createTable(num);
    colorPix(color());
  });
}

// - - - - - - - - - - //

window.onload = () => {
  paletteButton.addEventListener('click', randomColorButton);
  stopPlayButton.addEventListener('click', stopPlay);
  reseter.addEventListener('click', resetPalette);
  twistButton.addEventListener('click', colorTwister);
  resizeButton.addEventListener('click', pixResize);

  createNewTable('generate-board-large', 30);
  createNewTable('generate-board-medium', 20);
  createTable();
  clearButton();
  defineClass();
  colorPix(color());
  bordersBgColorChange();
};
