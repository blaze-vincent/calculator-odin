const calcDisplay = document.querySelector("#calc-display");
const backspace = document.querySelector("#backspace");
const enter = document.querySelector("#enter");
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
    decimal: document.querySelector("#decimal"),
}

let input = [];
const processInput = () => {
    let inputUpdated = input.join("")
                            .split(" ");
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
                    continue;
                }
                if(inputUpdated[i] === "/"){
                    inputUpdated.splice(i-1, 3, 
                        inputUpdated[i-1]/inputUpdated[i+1]);
                    continue;
                }
            }
        }
        for(let i = 0; i < inputUpdated.length; i++){
            if(inputUpdated[i] === "+" || inputUpdated[i] === "-"){ //pemd(A S)
                if(inputUpdated[i] === "+"){ //broken up so it is parsed from left to right
                    inputUpdated.splice(i-1, 3, 
                        parseFloat(inputUpdated[i-1])+parseFloat(inputUpdated[i+1]));
                    continue;
                }
                if(inputUpdated[i] === "-"){
                    inputUpdated.splice(i-1, 3, 
                        inputUpdated[i-1]-inputUpdated[i+1]);
                    continue;
                }
            }
        }
    }
    return inputUpdated[0];
}


for (let i in buttons){
    buttons[i].addEventListener("click", () => {
        input.push(buttons[i].textContent);
        calcDisplay.textContent = input.join("");
    });
}

backspace.addEventListener("click", () => {
    input.pop();
    if(input.length === 0){
        calcDisplay.textContent = "0";
        return;
    };
    calcDisplay.textContent = input.join("");
});

enter.addEventListener("click", () => {
    let result = processInput();
    input = result.toString().split("");
    calcDisplay.textContent = input.join("");
});