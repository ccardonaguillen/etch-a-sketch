function resetGrid() {
    // Erase all previously drawn grid squares
    grid_squares = document.querySelectorAll('.grid-square');

    grid_squares.forEach(square => square.remove());
}

function drawGrid(ncol) {
    resetGrid();

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

function connectSquares(mode) {
    // Add eventListener to all current squares with the specified paint function
    grid_squares = document.querySelectorAll('.grid-square');

    grid_squares.forEach(square => 
                         square.addEventListener('mouseover', mode));
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
                          (alpha + 0.3).toFixed(1) :
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


function changeSize() {
    const slider = document.querySelector(".slider")
    slider.addEventListener('change', () => {
        drawGrid(slider.value);
        connectSquares(getCurrentMode());
        }
    )
}

function getCurrentMode() {
    let current_mode 
    const mode_buttons = document.querySelectorAll('.mode')

    mode_buttons.forEach(button => {
        if (button.classList.contains('active-btn')) {
            if (button.id === "plain") {
                current_mode = paintPlain;
           } else if (button.id === "gradual") {
                current_mode = paintGradual;
           } else {
                current_mode = paintRainbow;
           }
        }
    })
    
    return current_mode
}

function changeMode() {
    const mode_buttons = document.querySelectorAll('.mode')
    const current_size = document.querySelector(".slider").value;

    mode_buttons.forEach(selection => {
        selection.addEventListener('click', () => {
            const mode = selection.id;
            const active = selection.classList.contains('active-btn');

            if (!active) {
                mode_buttons.forEach(button => button.classList.remove('active-btn'));
                selection.classList.add('active-btn');
                drawGrid(current_size);

                if (mode === "plain") {
                    connectSquares(paintPlain);
                } else if (mode === "gradual") {
                    connectSquares(paintGradual);
                } else {
                    connectSquares(paintRainbow);
                }
            }
        })

    })
}

function clearDraw() {
    const clear_button = document.querySelector('.clear-btn');

    clear_button.addEventListener('click', () => {
        const current_size = document.querySelector(".slider").value;

        drawGrid(current_size);
        connectSquares(getCurrentMode());
    })
}

function startApp() {
    drawGrid(36);
    connectSquares(paintPlain);
    changeSize();
    changeMode();
    clearDraw();
}

startApp()