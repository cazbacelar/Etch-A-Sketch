// Add dark mode function
// Let user download the drawing

const DEFAULT_SIZE = 16;
const DEFAULT_GRID_BORDER = true;
const DEFAULT_BG_COLOR = "#ffffff";
const DEFAULT_PEN_COLOR = "#333333";
const DEFAULT_MODE = "pen";

let currentSize = DEFAULT_SIZE;
let currentGridBorder = DEFAULT_GRID_BORDER;
let currentBgColor = DEFAULT_BG_COLOR;
let currentPenColor = DEFAULT_PEN_COLOR;
let currentMode = DEFAULT_MODE;
let mouseDown = false;

const grid = document.querySelector(".grid");
const bgColorPicker = document.querySelector(".bgColorPicker");
const penColorPicker = document.querySelector(".penColorPicker");
const penBtn = document.querySelector(".penBtn");
const pencilBtn = document.querySelector(".pencilBtn");
const rainbowBtn = document.querySelector(".rainbowBtn");
const eraserBtn = document.querySelector(".eraserBtn");
const clearBtn = document.querySelector(".clearBtn");
const toggleBtn = document.getElementById("toggleBtn");
const sliderLabel = document.getElementById("sliderLabel");
const sliderInput = document.getElementById("slider");

const toggleGrid = (currentGridBorder) => {
  const gridElements = grid.childNodes;
  for (const element of gridElements) {
    if (currentGridBorder === true) {
      element.classList.add("grid-element-border");
    } else {
      element.classList.remove("grid-element-border");
    }
  }
};

const bgColorUpdate = () => {
  const gridElements = grid.childNodes;
  for (const element of gridElements) {
    if (!element.classList.contains("colored")) {
      element.style.backgroundColor = currentBgColor;
    }
  }
};

const addColor = (type, target) => {
  if (type === "mouseover" && mouseDown === false) {
    return;
  }

  switch (currentMode) {
    case "pen":
      target.style.backgroundColor = currentPenColor;
      target.classList.add("colored");
      target.style.opacity = 1;
      break;
    case "pencil":
      target.style.backgroundColor = currentPenColor;
      let targetOpacity = Number(target.style.opacity);
      if (!target.classList.contains("colored")) {
        targetOpacity = 0;
      }
      if (!targetOpacity) {
        targetOpacity = 0.1;
      } else if (targetOpacity < 1) {
        targetOpacity += 0.1;
      }
      target.style.opacity = targetOpacity;
      target.classList.add("colored");
      break;
    case "rainbow":
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      target.style.backgroundColor = `#${randomColor}`;
      target.classList.add("colored");
      target.style.opacity = 1;
      break;
    case "eraser":
      target.classList.remove("colored");
      target.style.backgroundColor = currentBgColor;
      target.style.opacity = 1;
      break;
  }
};

const loadGrid = (size) => {
  grid.innerHTML = "";
  grid.style.cssText = `grid-template-columns: repeat(${size}, 2fr); grid-template-rows: repeat(${size}, 2fr);`;

  for (let i = 0; i < size * size; i++) {
    const gridElement = document.createElement("div");
    gridElement.addEventListener("mouseover", (e) => {
      addColor(e.type, e.target);
    });
    gridElement.addEventListener("mousedown", (e) => {
      mouseDown = true;
      addColor(e.type, e.target);
    });
    gridElement.addEventListener("mouseup", () => {
      mouseDown = false;
    });
    grid.appendChild(gridElement);
  }
  toggleGrid(currentGridBorder);
  bgColorUpdate();
};

bgColorPicker.addEventListener("input", (e) => {
  currentBgColor = e.target.value;
  bgColorUpdate();
});

penColorPicker.addEventListener("input", (e) => {
  currentPenColor = e.target.value;
  if (currentMode === "rainbow") {
    currentMode = DEFAULT_MODE;
  }
});

penBtn.addEventListener("click", () => {
  currentMode = "pen";
});

pencilBtn.addEventListener("click", () => {
  currentMode = "pencil";
});

rainbowBtn.addEventListener("click", () => {
  currentMode = "rainbow";
});

eraserBtn.addEventListener("click", () => {
  currentMode = "eraser";
});

clearBtn.addEventListener("click", () => {
  if (currentMode === "eraser") {
    currentMode = DEFAULT_MODE;
  }
  loadGrid(currentSize);
});

toggleBtn.addEventListener("click", () => {
  if (currentGridBorder === true) {
    currentGridBorder = false;
  } else {
    currentGridBorder = true;
  }
  toggleGrid(currentGridBorder);
});

const updateSliderLabel = (value) => {
  sliderLabel.textContent = `${value} x ${value}`;
};

sliderInput.addEventListener("input", (e) => {
  currentSize = e.target.value;
  loadGrid(currentSize);
  updateSliderLabel(currentSize);
});

window.onload = () => {
  loadGrid(DEFAULT_SIZE);
};
