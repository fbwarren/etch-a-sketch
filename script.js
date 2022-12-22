function clearScreen() {
    cells.forEach(cell => cell.style.backgroundColor = '#FFFFFF');
}

function toggleGrid() {
    cells.forEach(cell => {
        cell.style.outlineStyle = (cell.style.outlineStyle == 'solid') ? 'None' : 'solid';
    });
}

function changeMode(newMode) {
    mode = newMode;
}

function colorCell(e) {
    if (e.buttons == 1 || e.buttons == 3) {
        switch (mode) {
            case 'regular':
                this.style.backgroundColor = color;
                break;
            case 'eraser':
                this.style.backgroundColor = '#FFFFFF';
                break;
            case 'rainbow':
                let randomColor = Math.floor(Math.random() * 16777215).toString(16);
                this.style.backgroundColor = '#' + randomColor;
                break;
            case 'shading':
                this.style.backgroundColor = '#FFFFFF';
                break;
        }
    }
}

function redrawGrid(e) {
    cells.forEach(cell => cell.remove());
    drawGrid(e);
    cells = document.querySelectorAll('.cell');
}

function drawGrid(v) {
    let rightColumn = document.querySelector('.right-column');
    let slider = document.querySelector('.slider');

    for (let i=0; i<v; i++) {
        let row = document.createElement('div');
        row.className = 'row';
        row.style.display = 'flex';
        row.style.maxWidth = '66vmin';
        for (let j=0; j<v; j++) {
            let cell = document.createElement('div');
            cell.className = 'cell'
            cell.id = `${i*v + j}`;
            cell.style.outline = 'black solid 1px';
            cell.style.flex = '1';
            cell.style.aspectRatio = '1/1';
            row.appendChild(cell);
        }
        rightColumn.appendChild(row);
    }

    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('mouseover', colorCell);
        cell.addEventListener('mousedown', colorCell);
    });
    slider.textContent = `${v} x ${v}`;
}

let color = '#000000';
let mode = 'regular';

drawGrid(16);
let cells = document.querySelectorAll('.right-column .row .cell');