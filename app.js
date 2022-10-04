// Targetting DOM elements
let upperDisplay = document.querySelector("[data-upperDisplay]");
let mainDisplay = document.querySelector("[data-mainDisplay]");
let numberBtns = document.querySelectorAll("[data-number]");
let operationBtns = document.querySelectorAll("[data-operation]");
let allClearBtn = document.querySelector("[data-allclear]");
let equalsBtn = document.querySelector("[data-equals]");
let result;
// Making calculator functions

let clearDisplay = () => {
    upperDisplay.innerHTML = "";
    mainDisplay.innerHTML = "0";
};

let appendNum = (number) => {
    if(number === "." && mainDisplay.innerText.includes(".")) return;
    
    let regex = /[*+\/-]/gi

    if(mainDisplay.innerText == "0" && upperDisplay.innerText !== ""){
        mainDisplay.innerText = number;
        if(number !== "0"){
            upperDisplay.innerText = upperDisplay.innerText.toString().slice(0,-1);
            upperDisplay.innerText += number;
        }
    }else if(mainDisplay.innerText == "0" || mainDisplay.innerText == "NaN"){
        mainDisplay.innerText = "";
        mainDisplay.innerText = number;
        upperDisplay.innerText = number;
    }else if(regex.test(mainDisplay.innerText)){
        mainDisplay.innerText = "";
        mainDisplay.innerText = number;
        upperDisplay.innerText += number;
    }else{
        mainDisplay.innerText += number;
        upperDisplay.innerText += number;
    }
};

let chooseOperation = (operation) => {
    let regex = /[*+\/-]/gi

    if(mainDisplay.innerText == result){
        upperDisplay.innerText = result + operation;
        mainDisplay.innerText = operation;
    }else if(mainDisplay.innerText == "0" && upperDisplay.innerText !== ""){
        mainDisplay.innerText = operation;
        upperDisplay.innerText += operation;
    }else if(mainDisplay.innerText == "0" || mainDisplay.innerText == "NaN"){
        mainDisplay.innerText = "";
        mainDisplay.innerText = operation;
        upperDisplay.innerText = operation;
    }
    else{
        mainDisplay.innerText = operation;
        if(upperDisplay.innerText[upperDisplay.innerText.length - 1] !== "-" && operation == "-"){
            upperDisplay.innerText += operation;
        }else if(regex.test(upperDisplay.innerText[upperDisplay.innerText.length - 2]) && upperDisplay.innerText[upperDisplay.innerText.length - 1] == "-" ){
            upperDisplay.innerText = upperDisplay.innerText.toString().slice(0,-2);
            upperDisplay.innerText += operation;
        }else if(regex.test(upperDisplay.innerText[upperDisplay.innerText.length - 1])){
            upperDisplay.innerText = upperDisplay.innerText.toString().slice(0,-1);
            upperDisplay.innerText += operation;
        }else{
            upperDisplay.innerText += operation;
        }
    }
};

let compute = () => {
    if(upperDisplay.innerText == "" || upperDisplay.innerText == "NaN"){
        mainDisplay.innerText = "NaN";
        upperDisplay.innerText = "NaN";
    }else{
        result = eval(upperDisplay.innerText);
        mainDisplay.innerText = result;
        upperDisplay.innerText += `= ${result}`
    }
};

// Adding click events and performing desired actions

allClearBtn.addEventListener("click", clearDisplay);

numberBtns.forEach(button => {
    button.addEventListener("click", () => {      
        appendNum(button.innerText);
    });
});

operationBtns.forEach(button => {
    button.addEventListener("click", () => {
        if(button.innerText == "x"){
            chooseOperation("*");
        }else{
            chooseOperation(button.innerText);
        }
    });
});

equalsBtn.addEventListener("click", compute)