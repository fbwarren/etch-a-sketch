function clearScreen() {
    cells.forEach(cell => cell.style.backgroundColor = 'white');
}

function toggleGrid() {
    cells.forEach(cell => {
        if (cell.style.outlineStyle == 'solid')
            cell.style.outlineStyle = 'None';
        else
            cell.style.outlineStyle = 'solid';
    });
}

function colorCell(e) {
    if (e.buttons == 1 || e.buttons == 3) {
        let randomColor = Math.floor(Math.random() * 16777215).toString(16);
        this.style.backgroundColor = '#' + randomColor;
    }
}

function newGrid(e) {
    cells.forEach(cell => cell.remove());
    generatePixels(e);
    cells = document.querySelectorAll('.cell');
}

function generatePixels(v) {
    let rightColumn = document.querySelector('.right-column');

    for (let i=0; i<v; i++) {
        let row = document.createElement('div');
        row.className = 'row';
        row.style.display = 'flex';
        row.style.maxWidth = '500px';
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
}

generatePixels(16);
let cells = document.querySelectorAll('.right-column .row .cell');