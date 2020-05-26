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

for (let i in buttons){
    buttons[i].addEventListener("click", () => {
        input.push(buttons[i].textContent);
        calcDisplay.textContent = input.join("");
    });
}

backspace.addEventListener("click", () => {
    input.pop();
    calcDisplay.textContent = input.join("");
});