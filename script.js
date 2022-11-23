//GRABBING DOM ELEMENTS
//Body
 const body = document.querySelector("body");
//Pen colors
const colors = Array.from(document.querySelectorAll(".buttonsContainer .pickMe"));
const currentColor = document.querySelector("#currentColor");
const colorInput = document.querySelector(`input[type="color"`);
//Change grid size
const changeGridSize = document.querySelector("#changeGridSize");
const changeGridDialog = document.querySelector(".changeGridDialog");
const exitModule = document.querySelector("#exitModule");
const finishGridChange = document.querySelector("#finishGridChange");
const textInput = document.querySelector(`input[type="text"]`);
//Load grid
const drawingGrid = document.querySelector("#drawingGrid");
const gridDimensions = document.querySelector("#gridDimensions");
//Clear hrid
const trash = document.querySelector(".withIcon:last-of-type");

//GlOBAL VARIABLES
const bodyStyle = getComputedStyle(document.body);
let penColor = colorInput.value;
let drawingCheck = false;
let divsArray = [];

const autumn1 = bodyStyle.getPropertyValue("--autumn1");
const autumn2 = bodyStyle.getPropertyValue("--autumn2");
const autumn3 = bodyStyle.getPropertyValue("--autumn3");
const autumn4 = bodyStyle.getPropertyValue("--autumn4");
const autumnColors = [
                        autumn1,
                        autumn2,
                        autumn3,
                        autumn4
                    ];

const winter1 = bodyStyle.getPropertyValue("--winter1");
const winter2 = bodyStyle.getPropertyValue("--winter2");
const winter3 = bodyStyle.getPropertyValue("--winter3");
const winter4 = bodyStyle.getPropertyValue("--winter4");
const winterColors = [
                        winter1,
                        winter2,
                        winter3,
                        winter4
                    ]

                    
//FUNCTIONS
//random picking
function randomColor(){
    return '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
}
function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
}
//dynamic changing
function extractRGBFromDivs(e){
    let divBackgroundRGB = e.target.style.background.match(/\d{1,}/gm);
        let divColors = {
            red: parseInt(divBackgroundRGB[0]),
            green: parseInt(divBackgroundRGB[1]),
            blue: parseInt(divBackgroundRGB[2])
        }
        return divColors;
}

function changePenColorDynamically(e){
    if(colors[2].classList.contains("active")){ //shading
        divColors = extractRGBFromDivs(e);
        penColor = `rgb(${divColors.red - 25}, ${divColors.green - 25}, ${divColors.blue - 25})`;
    }
    if(colors[3].classList.contains("active")){ //lightening
        divColors = extractRGBFromDivs(e);
        penColor = `rgb(${divColors.red + 25}, ${divColors.green + 25}, ${divColors.blue + 25})`;
    }
    if(colors[4].classList.contains("active")){
        penColor = randomColor();
    }
    if(colors[5].classList.contains("active")){
        penColor = getRandomItem(autumnColors);
    }
    if(colors[6].classList.contains("active")){
        penColor = getRandomItem(winterColors);
    }
}
//Pen colors
function changeCurrentColor(indexOfAButton){
    let color;

    switch(indexOfAButton) {
        case 0: //input
            color = colorInput.value;
            currentColor.style.background=color;
        break;
        case 1: //eraser
            color = bodyStyle.getPropertyValue("--gridBackground");
            currentColor.style.background=color;
        break;
        case 2: //shade
            currentColor.style.background=color;
        break;
        case 3: //lighten
            currentColor.style.background=color;
        break;
        case 4: //rainbow
            const rainbow1="#9C4F96";
            const rainbow2="#FF6355";
            const rainbow3="#FBA949";
            const rainbow4="#FAE442";
            const rainbow5="#8BD448";
            const rainbow6="#2AA8F2";
            const rainbowGradient = `linear-gradient(to right, 
                ${rainbow1}, 
                ${rainbow2}, 
                ${rainbow3}, 
                ${rainbow4}, 
                ${rainbow5}, 
                ${rainbow6})`;
            
            currentColor.style.background=rainbowGradient;
        break;
        case 5: //autumn
            const autumnGradient = `linear-gradient(to right, ${autumn1}, ${autumn2}, ${autumn3}, ${autumn4})`;
            currentColor.style.background=autumnGradient;
        break;
        case 6: //winter
            const winterGradient = `linear-gradient(to right, ${winter1}, ${winter2}, ${winter3}, ${winter4})`;
            currentColor.style.background=winterGradient;
        break;
        default:
          // code block
      }
}
function changePenColor(indexOfAButton){
    let color;

    switch(indexOfAButton) {
        case 0: //input
            penColor = colorInput.value;
        break;
        case 1: //eraser
            penColor = bodyStyle.getPropertyValue("--gridBackground");
        break;
        case 2: //shade
        break;
        case 3: //lighten
        break;
        case 4: //rainbow
            penColor = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
        break;
        case 5: //autumn
            const autumn1 = bodyStyle.getPropertyValue("--autumn1");
            const autumn2 = bodyStyle.getPropertyValue("--autumn2");
            const autumn3 = bodyStyle.getPropertyValue("--autumn3");
            const autumn4 = bodyStyle.getPropertyValue("--autumn4");
            const autumnGradient = `linear-gradient(to right, ${autumn1}, ${autumn2}, ${autumn3}, ${autumn4})`;
            currentColor.style.background=autumnGradient;
        break;
        case 6: //winter
            const winter1 = bodyStyle.getPropertyValue("--winter1");
            const winter2 = bodyStyle.getPropertyValue("--winter2");
            const winter3 = bodyStyle.getPropertyValue("--winter3");
            const winter4 = bodyStyle.getPropertyValue("--winter4");
            const winterGradient = `linear-gradient(to right, ${winter1}, ${winter2}, ${winter3}, ${winter4})`;

            currentColor.style.background=winterGradient;
        break;
        default:
          // code block
      }
}
//Grid updating
function emptyTheGrid(){
    divsArray.forEach(div => {
        drawingGrid.removeChild(div);
    });
}
function fillTheGrid(){
    drawingGrid.style.display="grid";
    drawingGrid.style.gridTemplateColumns = ` repeat(${gridDimensions.textContent}, 1fr)`;
    drawingGrid.style.gridTemplateRows = ` repeat(${gridDimensions.textContent}, 1fr)`;
    divsArray = [];

    for (let index = 0; index < Math.pow(parseInt(gridDimensions.textContent), 2); index++) {
        const div = document.createElement("div");
        div.style.background = bodyStyle.getPropertyValue("--gridBackground");
        div.style.background = "--gridBackground";
        div.setAttribute("draggable", "false");
        div.setAttribute("id", `#${index}`);
        drawingGrid.append(div);
        divsArray.push(div);
    }
}
function isValueValid(gridSize){
    return parseInt(gridSize) >= 1 && parseInt(gridSize) <= 64 && !(/\D/gm.test(gridSize));
}
function updateGrid(){
    const gridSize = textInput.value;
    if (isValueValid(gridSize)){
        gridDimensions.textContent =  gridSize;
        emptyTheGrid();
        fillTheGrid();
    }
    else{
        alert("Invalid value, try again!");
    }
}
function closeDialog(){
    changeGridDialog.close();
}
function clearTheGrid(){
    divsArray.forEach(div => {
        div.style.background = bodyStyle.getPropertyValue("--gridBackground");
    });
}

//EVENT LISTENERS
//Pen colors
//
colorInput.addEventListener("input",() => { 
    colors[0].style.background=`${colorInput.value}`;
    changeCurrentColor(0);
    changePenColor(0);
});

let indexOfLastClicked = 0;
colors.forEach((color, i) => {
    color.addEventListener("click", () => {
        colors[indexOfLastClicked].classList.remove("active");
        if(indexOfLastClicked==0) colorInput.classList.remove("active");

        color.classList.add("active");
        if(i==0) colorInput.classList.add("active");
        changeCurrentColor(i);
        changePenColor(i);
        indexOfLastClicked = i;
    });
});

//Fill up the grid
document.addEventListener("DOMContentLoaded", fillTheGrid);


//Draw
document.addEventListener("mousedown", () => {
    drawingCheck =true;
    console.log(drawingCheck);
});
document.addEventListener("mouseup", () => {
    drawingCheck =false;
    console.log(drawingCheck);
});
drawingGrid.addEventListener("mouseover", (e) =>{
    divsArray.forEach((div) => {
        if(e.target === div && drawingCheck) {
            changePenColorDynamically(e);
            div.style.background = penColor;
        }
        
    })
})

//Clear the grid 
trash.addEventListener("click", clearTheGrid);

//Grid size
//
changeGridSize.addEventListener("click", () =>{
    changeGridDialog.showModal();
});

exitModule.addEventListener("click", closeDialog);

body.addEventListener("keyup", (e) => {
    if (e.key === "Enter" && changeGridDialog.hasAttribute("open")) {
        const gridSize = textInput.value;
        if(isValueValid(gridSize)) closeDialog();
        updateGrid();
    }
});
finishGridChange.addEventListener("click", () => {
    const gridSize = textInput.value;
    if(isValueValid(gridSize)) closeDialog();
    updateGrid();
});

