function resetGrid() {
    grid_squares = document.querySelectorAll('.grid-square');

    grid_squares.forEach(square => square.remove());
}

function drawGrid(ncol) {
    resetGrid()
    
    const drawing_surface = document.querySelector(".drawing-surface");

    drawing_surface.style.cssText = `display: grid;\
                                     grid-template-columns: repeat(${ncol}, 1fr);\
                                     grid-template-rows: repeat(${ncol}, 1fr)`                                 

    for (let i=1; i <= ncol; i++) {
        for (let j=1; j <= ncol; j++) {
            const div = document.createElement('div');
            div.classList.add("grid-square")
            div.style.cssText = `border: grey solid 1px;\
                                 grid-column: ${i};\
                                 grid-row: ${j}`
        
            drawing_surface.appendChild(div)
        }
    }
}

function connectSquares(paintFunction) {
    grid_squares = document.querySelectorAll('.grid-square');

    grid_squares.forEach(square => 
                         square.addEventListener('mouseover',
                                                 paintFunction));
}

function paintPlain() {
    this.style['background-color'] = "rgb(43, 43, 43)";
}

function paintGradual() {
    const currentColor = this.style['background-color'];
    console.log(currentColor)

    if (currentColor) {
        let alpha = /(\d{1}.\d{1})/.exec(currentColor);        
        if (!alpha) return;

        alpha = parseFloat(alpha[0])
        const new_alpha = (alpha <= 1) ?
                          (alpha + 0.1).toFixed(1) :
                          alpha;

        this.style['background-color'] = `rgba(0, 0, 0, ${new_alpha})`;
    } else {
        this.style['background-color'] = "rgba(0, 0, 0, 0.1)";
    }
}

function paintRainbow() {
    rgb = [0, 0, 0]

    for (let i = 0; i < rgb.length; i++) {
        rgb[i] = Math.floor(Math.random() * 255)
    }

    this.style['background-color'] = `rgb(${rgb.join(", ")})`;
}

drawGrid(10);
connectSquares(paintGradual);