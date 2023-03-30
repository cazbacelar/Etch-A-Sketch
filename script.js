const DEFAULT_SIZE = 16;
const DEFAULT_BG_COLOR = '#ffffff';
const DEFAULT_GRID_BORDER = true;

let currentSize = DEFAULT_SIZE;
let current_bg_color = DEFAULT_BG_COLOR;
let current_grid_border = DEFAULT_GRID_BORDER;

const grid = document.querySelector('.grid');
const bgColorPicker = document.querySelector('.bgColorPicker');
const toggleBtn = document.getElementById('toggleBtn');
const sliderLabel = document.getElementById('sliderLabel');
const sliderInput = document.getElementById('slider');

const toggleGrid = (current_grid_border) => {
  const gridElements = grid.childNodes;
  for (const element of gridElements) {
    if (current_grid_border === true) {
      element.classList.add('grid-element-border');
    } else {
      element.classList.remove('grid-element-border');
    }
  }
};

const bgColorUpdate = () => {
  grid.style.backgroundColor = current_bg_color;
};

// This function loads the grid with a specific size
// Could be with the default size of the grid (when the page is loaded) or with input from the user using the slider input
const loadGrid = (size) => {
  grid.innerHTML = '';
  grid.style.cssText = `grid-template-columns: repeat(${size}, 2fr); grid-template-rows: repeat(${size}, 2fr);`;

  for (let i = 0; i < (size * size); i++) {
    const gridElement = document.createElement('div');
    grid.appendChild(gridElement);
  }
  toggleGrid(current_grid_border);
  bgColorUpdate();
};

bgColorPicker.addEventListener('input', (e) => {
  current_bg_color = e.target.value
  bgColorUpdate();
});

// It adds border to each element of the grid when clicked on
toggleBtn.addEventListener('click', () => {
  if (current_grid_border === true) {
    current_grid_border = false;
  } else {
    current_grid_border = true;
  }
  toggleGrid(current_grid_border);
});

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
