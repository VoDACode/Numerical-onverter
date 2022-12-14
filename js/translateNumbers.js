function translateNumber(n, to, from = 10) {
    let dNum = 0;
    if (from != 10) {
        dNum = new Number(numberToDecemal(n, from));
    }
    else {
        dNum = Number(n);
    }
    let store = [];
    while (dNum >= to) {
        let mod = dNum % to;
        while (mod >= to) {
            mod -= to;
        }
        store.push(mod < 10 ? mod.toString() : String.fromCharCode(mod + 55));
        dNum = dNum / to | 0;
    }
    store.push(dNum < 10 ? dNum.toString() : String.fromCharCode(dNum + 55));
    return store.reverse().join('');
}

function translateFractional(n, to, from = 10, itedationCount = 10) {
    let dNumber = new BigNumber(0);
    if (from != 10) {
        dNumber = new BigNumber(numberToDecemal(n, from));
    } else {
        dNumber = new BigNumber("0." + n);
    }
    let result = [];
    for (let i = 0; i < itedationCount; i++) {
        let tmp = dNumber.multipliedBy(to);
        let decimal = tmp.decimalPlaces(0, 1);
        result.push(translateNumber(decimal.toString(), to, 10));
        dNumber = tmp.minus(decimal);
        if (dNumber.isEqualTo(0))
            break;
    }
    return result.join('');
}