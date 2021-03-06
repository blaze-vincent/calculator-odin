const calcDisplay = document.querySelector("#calc-display");
const backspace = document.querySelector("#backspace");
const enter = document.querySelector("#enter");
const clearAll = document.querySelector("#clear-all");
const decimal = document.querySelector("#decimal");
const gitMark = document.querySelector("svg");
const buttons = {
    divide: document.querySelector("#divide"),
    multiply: document.querySelector("#multiply"),
    minus: document.querySelector("#minus"),
    seven: document.querySelector("#seven"),
    eight: document.querySelector("#eight"),
    nine: document.querySelector("#nine"),
    plus: document.querySelector("#plus"),
    four: document.querySelector("#four"),
    five: document.querySelector("#five"),
    six: document.querySelector("#six"),
    one: document.querySelector("#one"),
    two: document.querySelector("#two"),
    three: document.querySelector("#three"),
    zero: document.querySelector("#zero"),
}

let input = [];
const processInput = () => {
    for(let i = 0; i < input.length; i++){
        if(input[i] === "."){
            if(isNaN(parseFloat(input[i+1])) || !input[i+1]){
                return "NaN";
            }
        }
    }
    let inputUpdated = input.join("")
                            .split(" ");
    for(let i = 0; i < inputUpdated.length; i++){
        if(inputUpdated[i] === ""){ //remove empty strings if they occur
            inputUpdated.splice(i, 1);
        }
        if(inputUpdated[i] === "-"){ //unary minus
            if(isNaN(parseFloat(inputUpdated[i-1]))){
                inputUpdated.splice(i, 2, `-${inputUpdated[i+1]}`)
            }
        }
    }
    for(let i = 0; i < inputUpdated.length; i++){ //ensure binary operators are surrounded by numbers
        if(inputUpdated[i] === "*" || inputUpdated[i] === "/"
        || inputUpdated[i] === "+" || inputUpdated[i] === "-"){
            if(isNaN(parseFloat(inputUpdated[i-1])) 
             || isNaN(parseFloat(inputUpdated[i+1]))
            ){return "NaN";}}}
    while(inputUpdated.length > 1){
        for(let i = 0; i < inputUpdated.length; i++){
            if(inputUpdated[i] === "*" || inputUpdated[i] === "/"){ //pe(M D)as
                if(inputUpdated[i] === "*"){ //broken up so it is parsed from left to right
                    inputUpdated.splice(i-1, 3, 
                        inputUpdated[i-1]*inputUpdated[i+1]);
                }
                if(inputUpdated[i] === "/"){
                    if(parseFloat(inputUpdated[i+1]) === 0){
                        return "NaN";
                    } else {
                        inputUpdated.splice(i-1, 3, 
                            inputUpdated[i-1]/inputUpdated[i+1]);
                    }
                }
            }
        }
        for(let i = 0; i < inputUpdated.length; i++){
            if(inputUpdated[i] === "+" || inputUpdated[i] === "-"){ //pemd(A S)
                if(inputUpdated[i] === "+"){ //broken up so it is parsed from left to right
                    inputUpdated.splice(i-1, 3, 
                        parseFloat(inputUpdated[i-1])+parseFloat(inputUpdated[i+1]));
                }
                if(inputUpdated[i] === "-"){
                    inputUpdated.splice(i-1, 3, 
                        inputUpdated[i-1]-inputUpdated[i+1]);
                }
            }
        }
        return inputUpdated;
    }
}

//buttons
//v v v v v v v v v v v v v v v v v v v v v v v v
//buttons
for (let i in buttons){
    buttons[i].addEventListener("click", () => {
        if(input.includes("NaN")){
            input.length = 0;
        }
        input.push(buttons[i].textContent);
        calcDisplay.textContent = input.join("");
    });
}

backspace.addEventListener("click", () => {
    input.pop();
    if(input.length === 0){
        calcDisplay.textContent = "ヽ(ヅ)ノ";
        return;
    };
    calcDisplay.textContent = input.join("");
});

enter.addEventListener("click", () => {
    let result = processInput();
    if(result === "NaN"){
        input = [result];
    } else {
        input = result.toString().split("");
    }
    calcDisplay.textContent = input.join("");
});

clearAll.addEventListener("click", () => {
    input.length = 0;
    calcDisplay.textContent = "ヽ(ヅ)ノ";
});

decimal.addEventListener("click", () => {
    if(input[input.length -1] !== "."){
        input.push(".");
        calcDisplay.textContent = input.join("");
    }
})

gitMark.addEventListener("click", () => {
    window.open("https://github.com/blaze-vincent");
});
//buttons
//^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
//buttons

///keyboard input
///v v v v v v v v v v v v v v v v v v v v v v v v
///keyboard input
const inputNumbers = ["0", "1", "2", "3",
                      "4", "5", "6", "7",
                      "8", "9", "0"];
document.addEventListener("keydown", e => {
    for(let i = 0; i < inputNumbers.length; i++){
        if(e.key === inputNumbers[i]){
            input.push(e.key);
            calcDisplay.textContent = input.join("");
            return;
        }
    }
    switch(e.key){
        case "enter":
            let result = processInput();
            if(result === "NaN"){
                input = [result];
            } else {
                input = result.toString().split("");
            }
            calcDisplay.textContent = input.join("");
            break;
        case "-":
            input.push(" - ");
            calcDisplay.textContent = input.join("");
            break;
        case "+":
            input.push(" + ");
            calcDisplay.textContent = input.join("");
            break;
        case "*":
            input.push(" * ");
            calcDisplay.textContent = input.join("");
            break;
        case "/":
            input.push(" / ");
            calcDisplay.textContent = input.join("");
            break;
    }
    
});
//keyboard input
//^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
//keyboard input