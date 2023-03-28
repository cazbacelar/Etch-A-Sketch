const grid = document.querySelector('.grid');

let gridSize = Number(prompt("Choose the size of your grid"));
loadGrid(gridSize);

function loadGrid(size) {
  grid.innerHTML = '';
  grid.style.cssText = `grid-template-columns: repeat(${size}, 2fr); grid-template-rows: repeat(${size}, 2fr);`;

  for (let i = 0; i < (size * size); i++) {
    const gridElement = document.createElement('div');
    gridElement.classList.add('grid-element-border')
    grid.appendChild(gridElement);
  }
}
