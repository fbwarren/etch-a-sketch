function drawGrid(v) {
    let rightColumn = document.querySelector('.right-column');
    let sliderText = document.querySelector('.text');

    for (let i = 0; i < v; i++) {
        let row = document.createElement('div');
        row.className = 'row';
        row.style.display = 'flex';
        row.style.maxWidth = '66vmin';
        for (let j = 0; j < v; j++) {
            let cell = document.createElement('div');
            cell.className = 'cell'
            cell.id = `${i * v + j}`;
            cell.style.backgroundColor = 'rgb(255, 255, 255)'
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

    sliderText.appendChild(document.createTextNode(`${v} x ${v}`));
}

function redrawGrid(e) {
    cells.forEach(cell => cell.remove());
    let sliderText = document.querySelector('.text')
    sliderText.removeChild(sliderText.childNodes[0]);
    size = e;
    drawGrid(size);
    cells = document.querySelectorAll('.cell');
}

function clearScreen() {
    cells.forEach(cell => cell.style.backgroundColor = 'rgb(255, 255, 255');
}

function toggleGrid() {
    cells.forEach(cell => {
        cell.style.outlineStyle = (cell.style.outlineStyle == 'solid') ? 'None' : 'solid';
    });
}

function colorCell(e) {
    if (e.buttons == 1 || e.buttons == 3) {
        switch (mode) {
            case 'regular':
                this.style.backgroundColor = color;
                break;
            case 'eraser':
                this.style.backgroundColor = 'rgb(255, 255, 255)';
                break;
            case 'rainbow':
                let random = () => Math.round(Math.random() * 255).toString();
                let rgb = [random(), random(), random()];
                this.style.backgroundColor = 'rgb(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ')';
                break;
            case 'shading':
                let prevColor = this.style.backgroundColor;
                this.style.backgroundColor = RGB_Log_Shade(-0.17, prevColor);
                break;
            case 'fill':
                fill(this);
                break;
        }
    }
}

function fill(start) {
    let dirs = [0, 1, 0, -1, 0];
    let prevColor = start.style.backgroundColor;
    const stack = [start.id];

    while (stack.length) {
        let cell = stack.pop();
        cells[cell].style.backgroundColor = color;
        let row = Math.floor(cell / size); col = cell % size;
        for (let i=0; i<4; i++) {
            let neighborCell = size * (row + dirs[i]) + (col + dirs[i + 1]);
            if (0 <= row+dirs[i] && row+dirs[i] < size &&
                0 <= col+dirs[i+1] && col+dirs[i+1] < size &&
                cells[neighborCell].style.backgroundColor == prevColor) {
                    stack.push(neighborCell);
            }
        }
    }
}

function changeMode(newMode) {
    mode = newMode;
}

function changeColor(newColor) {
    color = newColor;
}

// https://stackoverflow.com/questions/5560248/
function RGB_Log_Shade(p, c) {
    var i = parseInt, r = Math.round, [a, b, c, d] = c.split(","), P = p < 0, t = P ? 0 : p * 255 ** 2, P = P ? 1 + p : 1 - p;
    return "rgb" + (d ? "a(" : "(") + r((P * i(a[3] == "a" ? a.slice(5) : a.slice(4)) ** 2 + t) ** 0.5) + "," + r((P * i(b) ** 2 + t) ** 0.5) + "," + r((P * i(c) ** 2 + t) ** 0.5) + (d ? "," + d : ")");
}

var color = 'rgb(0, 0, 0)';
var mode = 'regular';
var size = 16;
drawGrid(size);
var cells = document.querySelectorAll('.cell');