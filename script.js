const DEFAULT_SIZE = 16;
let currentSize = DEFAULT_SIZE;

const grid = document.querySelector('.grid');
const sliderLabel = document.getElementById('sliderLabel');
const sliderInput = document.getElementById('slider');

// This function loads the grid with a specific size
// Could be with the default size of the grid (when the page is loaded) or with input from the user using the slider input
const loadGrid = (size) => {
  grid.innerHTML = '';
  grid.style.cssText = `grid-template-columns: repeat(${size}, 2fr); grid-template-rows: repeat(${size}, 2fr);`;

  for (let i = 0; i < (size * size); i++) {
    const gridElement = document.createElement('div');
    gridElement.classList.add('grid-element-border')
    grid.appendChild(gridElement);
  }
};

// It updates the slider label to match the input number
const updateSliderLabel = (value) => {
  sliderLabel.textContent = `${value} x ${value}`;
};

// When the user changes the value of the input slider, it changes the current size of the grid and calls the loadgrid function with the current size, and also updates the slider label to match the input number
sliderInput.addEventListener('input', (e) => {
  currentSize = e.target.value
  loadGrid(currentSize);
  updateSliderLabel(currentSize);
});

// When the page is loaded, it calls the loadGrid function with the default size of the grid
window.onload = () => {
  loadGrid(DEFAULT_SIZE)
}
