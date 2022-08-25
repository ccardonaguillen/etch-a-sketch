function resetGrid() {
    // Erase all previously drawn grid squares
    grid_squares = document.querySelectorAll('.grid-square');

    grid_squares.forEach(square => square.remove());
}

function drawGrid(ncol) {
    // Clear drawing surface
    resetGrid()

    // Setup new grid with specified number of squares per row/column
    const drawing_surface = document.querySelector(".drawing-surface");
    drawing_surface.style.cssText = `display: grid;\
                                     grid-template-columns: repeat(${ncol}, 1fr);\
                                     grid-template-rows: repeat(${ncol}, 1fr)`                                 

    // Create and include individua squares
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
    // Add eventListener to all current squares with the specified paint function
    grid_squares = document.querySelectorAll('.grid-square');

    grid_squares.forEach(square => 
                         square.addEventListener('mouseover',
                                                 paintFunction));
}

function paintPlain() {
    // Paint squares dark grey
    this.style['background-color'] = "rgb(43, 43, 43)";
}

function paintGradual() {
    const currentColor = this.style['background-color'];

    // Check if square has already been colored
    if (currentColor) {
        // If so, current color returns rgb if alpha = 0 or 1, not rgba
        let alpha = /(\d{1}.\d{1})/.exec(currentColor);        
        if (!alpha) return;

        alpha = parseFloat(alpha[0])
        // Increase alpha by 0.1 up to 1
        const new_alpha = (alpha <= 1) ?
                          (alpha + 0.1).toFixed(1) :
                          alpha;

        this.style['background-color'] = `rgba(0, 0, 0, ${new_alpha})`;
    } else {
        // If not, paint square dark grey with alpha = 0.1
        this.style['background-color'] = "rgba(0, 0, 0, 0.1)";
    }
}

function paintRainbow() {
    // Choose random value [0-255] for each element of RGB color
    rgb = [0, 0, 0]
    for (let i = 0; i < rgb.length; i++) {
        rgb[i] = Math.floor(Math.random() * 255)
    }
    
    // Paint square that color
    this.style['background-color'] = `rgb(${rgb.join(", ")})`;
}

drawGrid(10);
connectSquares(paintPlain);