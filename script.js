// https://stackoverflow.com/questions/5560248/
function RGB_Log_Shade (p, c) {
    var i = parseInt, r = Math.round, [a, b, c, d] = c.split(","), P = p < 0, t = P ? 0 : p * 255 ** 2, P = P ? 1 + p : 1 - p;
    return "rgb" + (d ? "a(" : "(") + r((P * i(a[3] == "a" ? a.slice(5) : a.slice(4)) ** 2 + t) ** 0.5) + "," + r((P * i(b) ** 2 + t) ** 0.5) + "," + r((P * i(c) ** 2 + t) ** 0.5) + (d ? "," + d : ")");
}

function clearScreen() {
    cells.forEach(cell => cell.style.backgroundColor = 'rgb(255, 255, 255');
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
                fill(this, color);
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

    slider.appendChild(document.createTextNode(`${v} x ${v}`));
}

let color = 'rgb(0, 0, 0)';
let mode = 'regular';

drawGrid(16);
let cells = document.querySelectorAll('.right-column .row .cell');