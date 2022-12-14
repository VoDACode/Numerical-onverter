let inputDecemal = document.getElementById("decimal_number");
let inputBinary = document.getElementById("binary_number");
let inputOctal = document.getElementById("octal_number");
let inputHexadecimal = document.getElementById("hexadecimal_number");

let inputCustomBase = document.getElementById("custom_base");
let inputCustomNumber = document.getElementById("custom_number");
let inputItedationCount = document.getElementById("iteration_count");

let inputs = [
    inputDecemal,
    inputBinary,
    inputOctal,
    inputHexadecimal,
    inputCustomBase,
    inputCustomNumber,
    inputItedationCount
]

function getItedationCount() {
    return Number(inputItedationCount.value.length > 0 ? inputItedationCount.value : inputItedationCount.placeholder);
}

let lastEdited = {
    input: null,
    base: null
};

init();

inputItedationCount.addEventListener("input", function () {
    if (inputItedationCount.value.length > 0 && !inputItedationCount.value.match(/^[0-9]+$/)) {
        inputItedationCount.classList.add("error");
        return;
    } else {
        inputItedationCount.classList.remove("error");
        let prop = "value";
        if (inputItedationCount.value.length == 0) {
            inputItedationCount.placeholder = 10;
            prop = "placeholder";
        }
        if(lastEdited.input){
            calculate(lastEdited.base, lastEdited.input, prop);
        }
    }
});

inputDecemal.addEventListener("input", function () {
    let decimal = inputDecemal.value;
    if (decimal.length > 0 && !decimal.match(/^[0-9]+(\.[0-9]+)?$/)) {
        inputDecemal.classList.add("error");
        return;
    } else {
        if(hasError(inputDecemal)) 
        return;
        let prop = "value";
        if (decimal.length == 0) {
            decimal = "10";
            prop = "placeholder";
            cleanInputs();
        }
        lastEdited.input = inputDecemal;
        lastEdited.base = 10;
        calculate(10, inputDecemal, prop);
    }
});

inputBinary.addEventListener("input", function () {
    let binary = inputBinary.value;
    if (binary.length > 0 && !binary.match(/^[0-1]+(\.[0-1]+)?$/)) {
        inputBinary.classList.add("error");
        return;
    } else {
        if(hasError(inputBinary)) 
        return;
        let prop = "value";
        if (binary.length == 0) {
            binary = "101010";
            prop = "placeholder";
            cleanInputs();
        }
        lastEdited.input = inputBinary;
        lastEdited.base = 2;
        calculate(2, inputBinary, prop);
    }
});

inputOctal.addEventListener("input", function () {
    let octal = inputOctal.value;
    if (octal.length > 0 && !octal.match(/^[0-7]+(\.[0-7]+)?$/)) {
        inputOctal.classList.add("error");
        return;
    } else {
        if(hasError(inputOctal)) 
        return;
        let prop = "value";
        if (octal.length == 0) {
            octal = "12";
            prop = "placeholder";
            cleanInputs();
        }
        lastEdited.input = inputOctal;
        lastEdited.base = 8;
        calculate(8, inputOctal, prop);
    }
});

inputHexadecimal.addEventListener("input", function () {
    let hexadecimal = inputHexadecimal.value.toUpperCase();
    if (hexadecimal.length > 0 && !hexadecimal.match(/^[0-9A-F]+(\.[0-9A-F]+)?$/)) {
        inputHexadecimal.classList.add("error");
        return;
    } else {
        if(hasError(inputHexadecimal))
        return;
        let prop = "value";
        if (hexadecimal.length == 0) {
            hexadecimal = "A";
            prop = "placeholder";
            cleanInputs();
        }
        lastEdited.input = inputHexadecimal;
        lastEdited.base = 16;
        calculate(16, inputHexadecimal, prop);
    }
});

inputCustomBase.addEventListener("input", function () {
    let customBase = inputCustomBase.value;
    if (customBase.length > 0 && !customBase.match(/^[0-9]+$/)) {
        inputCustomBase.classList.add("error");
        return;
    } else {
        if (Number(customBase) > 36) {
            inputCustomNumber.classList.add("error");
            return;
        }
        inputCustomBase.classList.remove("error");
        var prop = "value";
        if (customBase.length == 0) {
            prop = "placeholder";
            customBase = "24";
            inputCustomBase.value = "";
        }
        let number = inputBinary.value || inputBinary.placeholder;
        let a = number.split('.')[0];
        let b = number.split('.')[1];
        inputCustomNumber[prop] = translateNumber(a, customBase, 2) + (b ? "." + translateFractional(b, customBase, 2, getItedationCount()) : "");
    }
});

inputCustomNumber.addEventListener("input", function () {
    let customNumber = inputCustomNumber.value.toUpperCase();

    let last = inputCustomBase.value || inputCustomBase.placeholder;
    last = Number(last);
    if (last > 36) {
        inputCustomNumber.classList.add("error");
        return;
    }
    let lastNum = last <= 10 ? Number(last) : 9;
    let lastLeter = last > 10 ? String.fromCharCode(last + 54) : '';

    let rex = new RegExp(`^[0-${lastNum}${lastLeter != '' ? 'A-' + lastLeter : ''}]+(\.[0-${lastNum}${lastLeter != '' ? 'A-' + lastLeter : ''}]+)?$`);

    if (customNumber.length > 0 && rex.test(customNumber) == false) {
        inputCustomNumber.classList.add("error");
        return;
    } else {
        if(hasError(inputCustomNumber))
        return;
        inputCustomNumber.classList.remove("error");
        var prop = "value";
        if (customNumber.length == 0) {
            prop = "placeholder";
            customNumber = "A";
            inputCustomNumber.value = "";
        }    
        let base = inputCustomBase.value || inputCustomBase.placeholder;
        lastEdited.base = base;
        lastEdited.input = inputCustomNumber;
        calculate(base, inputCustomNumber, prop);
    }
});

function calculate(mode, input, prop) {
    let number = input.value;
    let a = number.split('.')[0];
    let b = number.split('.')[1];
    input.classList.remove("error");
    if (mode != 10) {
        inputDecemal[prop] = translateNumber(a, 10, mode) + (b ? "." + translateFractional(b, 10, mode, getItedationCount()) : "");
    }
    if (mode != 2) {
        inputBinary[prop] = translateNumber(a, 2, mode) + (b ? "." + translateFractional(b, 2, mode, getItedationCount()) : "");
    }
    if (mode != 8) {
        inputOctal[prop] = translateNumber(a, 8, mode) + (b ? "." + translateFractional(b, 8, mode, getItedationCount()) : "");
    }
    if (mode != 16) {
        inputHexadecimal[prop] = translateNumber(a, 16, mode) + (b ? "." + translateFractional(b, 16, mode, getItedationCount()) : "");
    }
    let customBase = !inputCustomBase.value || hasError(inputCustomBase) ? inputCustomBase.placeholder : inputCustomBase.value;
    if (mode != customBase) {
        inputCustomNumber[prop] = translateNumber(a, customBase, mode) + (b ? "." + translateFractional(b, customBase, mode, getItedationCount()) : "");
    }

}

function cleanInputs() {
    inputDecemal.value = "";
    inputBinary.value = "";
    inputOctal.value = "";
    inputHexadecimal.value = "";
    inputCustomNumber.value = "";
}

function init() {
    if (inputDecemal.value.length == 0) {
        inputDecemal.placeholder = 10;
        inputBinary.placeholder = translateNumber(10, 2);
        inputOctal.placeholder = translateNumber(10, 8);
        inputHexadecimal.placeholder = translateNumber(10, 16);
    }
    if (inputCustomBase.value.length == 0) {
        inputCustomBase.value = 24;
        inputCustomNumber.placeholder = translateNumber(10, 24);
    }
    if (inputItedationCount.value.length == 0) {
        inputItedationCount.value = 10;
    }
}

function numberToDecemal(n, from) {
    let tmp = "";
    for (let i = 0; i < n.length; i++) {
        tmp += (!!Number(n[i]) || n[i] == '0' ? Number(n[i]) : n.charCodeAt(i) - 55) * (from ** (n.length - i - 1));
    }
    return tmp;
}

function hasError(input) {
    return input.classList.contains("error");
}

function hasError(ignore){
    let status = false;
    inputs.forEach(input => {
        if (input.classList.contains("error") && input != ignore) {
            status = true;
        }
    });
    return status;
}