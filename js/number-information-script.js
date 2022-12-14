let inputDecemal = document.getElementById("decimal_number");
let inputDischargeGrid = document.getElementById("discharge_grid");

let inputDirectCode = document.getElementById("direct_code");
let inputAdditionalCode = document.getElementById("additional_code");
let inputReturnCode = document.getElementById("return_code");

inputDecemal.addEventListener("input", function () {
    let decimal = inputDecemal.value;

    if (decimal.length > 0 && !decimal.match(/^-?[0-9]+$/) && isNaN(Number(decimal))) {
        inputDecemal.classList.add("error");
        return;
    } else {
        inputDecemal.classList.remove("error");
        let prop = "value";
        if (decimal.length == 0) {
            decimal = "10";
            prop = "placeholder";
            inputDecemal.placeholder = 10;
            cleanInputs();
        }
        calculate(decimal, prop);
    }
});

inputDischargeGrid.addEventListener("input", function () {
    let dischargeGrid = inputDischargeGrid.value;
    if (dischargeGrid.length > 0 && !dischargeGrid.match(/^[0-9]+$/)) {
        inputDischargeGrid.classList.add("error");
        return;
    } else {
        let prop = "value";
        inputDischargeGrid.classList.remove("error");
        if (dischargeGrid.length == 0) {
            prop = "placeholder";
            inputDischargeGrid.placeholder = 8;
            dischargeGrid = 8;
        }
        let val = inputDecemal.value || inputDecemal.placeholder;
        calculate(val, prop); 
    }
});

function calculate(decimal, prop){
    let num = Number(decimal);
    decimal = Math.abs(num).toString();
    inputDirectCode[prop] = translateNumber(decimal, 2, 10);
    let grid = "";
    while(grid.length + inputDirectCode[prop].length < (Number(inputDischargeGrid.value || inputDischargeGrid.placeholder) - 1)){
        grid += "0";
    }
    grid += inputDirectCode[prop];
    inputDirectCode[prop] = `${num >= 0 ? "0" : "1"}.${grid}`;
    if(num >= 0){
        inputAdditionalCode[prop] = inputDirectCode[prop];
        inputReturnCode[prop] = inputDirectCode[prop];
    }else{
        let tmp = "";
        for(let i = 0; i < grid.length; i++){
            tmp += grid[i] == "0" ? "1" : "0";
        }
        inputReturnCode[prop] = `1.${tmp}`;
        inputAdditionalCode[prop] = `1.${plassOneLaftBit(tmp)}`;
    }
}

function cleanInputs() {
    inputDirectCode.value = "";
    inputAdditionalCode.value = "";
    inputReturnCode.value = "";
}

function plassOneLaftBit(n) {
    let arr = n.split('');
    let k = 1;
    for (let i = arr.length - 1; i >= 0; i--) {
        let num = Number(arr[i]) + k;
        if(num > 1){
            arr[i] = '0';
            k = 1;
        }else{
            arr[i] = num.toString();
            k = 0;
        }
    }
    return arr.join('');
}

function init(){
    inputDischargeGrid.placeholder = 8
    inputDecemal.placeholder = 10;
    calculate(10, "placeholder");
}
init();