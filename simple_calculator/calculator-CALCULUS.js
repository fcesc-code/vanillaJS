/* Francesc Brugarolas - Skylab bootcamp 2020-07 - Precurs */
'use strict';

/* DATA */
const SESSIONDATA = {
    current: 0,
    previous: 0,
    operand: 0,
    binaryOperator: {shortRep: '', name: ''},
    record: [],
    recordsShown: 5
};

/* CALCULUS HARDCORE */
function numbers(num){
    if (Number(num) !== 0) {
        SESSIONDATA.current = Number(SESSIONDATA.current + '' + num);
    } else {
        SESSIONDATA.current = SESSIONDATA.current + '0';
    }
    printCurrentVal();
}

function constants(specialNumber){
    let special;
    switch (specialNumber){
        case 'pi':
            special = Math.PI;
            break;
        case 'e':
            special = Math.E;
            break;
        case 'phi':
            special = ( 5**(1/2) + 1 ) / 2;
            break;
        case 'sq2':
            special = Math.SQRT2;
            break;
    }
    SESSIONDATA.current = special;
    return printCurrentVal();
}

function decimal(){
    let base = Number(SESSIONDATA.current);
    let baseStr = String(SESSIONDATA.current);
    if (base === 0 && baseStr !== '0.'){
        SESSIONDATA.current = '0.';
    } else if (Number.isInteger(base) && baseStr[baseStr.length - 1] !== '.'){
        SESSIONDATA.current = SESSIONDATA.current + '.';
    } else {
        return printError('ERROR. Sintaxi invàlida: un nombre no pot tenir dos punts decimals.');
    }
    return printCurrentVal();
}

function unary(name, position, fn){
    SESSIONDATA.current = Number(SESSIONDATA.current);
    SESSIONDATA.previous = SESSIONDATA.current;
    if (rangeCheck()){
        setHistoryRecord(name, position);
        fn();
        setHistoryResult();
        showHistoryRecords();
        return printCurrentVal();
    } else {
        return printCurrentVal();
    }
}

function unary_abs(){
    unary('abs', 'pre', () => SESSIONDATA.current = Math.abs(SESSIONDATA.current));
}
function unary_changeSign(){
    unary('-', 'pre', () => SESSIONDATA.current = SESSIONDATA.current * -1);
}
function unary_square(){
    unary('^2', 'post', () => SESSIONDATA.current = SESSIONDATA.current ** 2);
}
function unary_squareroot(){
    if(SESSIONDATA.current > 0){
        unary('^(1/2)', 'post', () => SESSIONDATA.current = SESSIONDATA.current ** (1/2));
    } else {
        return printError('ERROR. Rang: la calculadora només permet nombres reals, no imaginaris - no admet arrels negatives.');
    }
}
function unary_cube(){
    unary('^3', 'post', () => SESSIONDATA.current = SESSIONDATA.current ** 3);
}
function unary_cubicroot(){
    if(SESSIONDATA.current > 0){
        unary('^(1/3)', 'post', () => SESSIONDATA.current = SESSIONDATA.current ** (1/3));
    } else {
        return printError('ERROR. Rang: la calculadora només permet nombres reals, no imaginaris - no admet arrels negatives.');
    }
}
function unary_percent(){
    unary('%', 'post', () => SESSIONDATA.current = SESSIONDATA.current / 100);
}
function unary_invx(){
    unary('1/', 'pre', () => SESSIONDATA.current = 1 / SESSIONDATA.current);
}
function unary_log(){
    if (SESSIONDATA.current > 0){
        unary('log', 'pre', () => SESSIONDATA.current = Math.log10(SESSIONDATA.current));
    } else {
        return printError('ERROR. Operació no vàlida: els logaritmes no admeten nombres negatius o 0.');
    }
}
function unary_invlog(){
    unary('10^', 'pre', () => SESSIONDATA.current = 10 ** (SESSIONDATA.current));
}
function unary_ln(){
    if (SESSIONDATA.current > 0){
        unary('ln', 'pre', () => SESSIONDATA.current = Math.log1p(SESSIONDATA.current - 1));
    } else {
        return printError('ERROR. Operació no vàlida: els logaritmes no admeten nombres negatius o 0.');
    }
}
function unary_invln(){
    unary('e^', 'pre', () => SESSIONDATA.current = Math.E ** (SESSIONDATA.current));
}
function unary_sin(){
    unary('sin', 'pre', () => SESSIONDATA.current = Math.sin(SESSIONDATA.current));
}
function unary_cos(){
    unary('cos', 'pre', () => SESSIONDATA.current = Math.cos(SESSIONDATA.current));
}
function unary_tan(){
    unary('tan', 'pre', () => SESSIONDATA.current = Math.tan(SESSIONDATA.current));
}
function unary_asin(){
    unary('asin', 'pre', () => SESSIONDATA.current = Math.asin(SESSIONDATA.current));
}
function unary_acos(){
    unary('acos', 'pre', () => SESSIONDATA.current = Math.acos(SESSIONDATA.current));
}
function unary_atan(){
    unary('atan', 'pre', () => SESSIONDATA.current = Math.atan(SESSIONDATA.current));
}
function unary_factorial(){
    let res = Number(SESSIONDATA.current);
    if (Number.isInteger(res) && res > 0){
        return unary('!','post', function unary_inner_factorial(){
            for (let i = res-1 ; i >= 1; i--){
                res = res * i;
            }
            SESSIONDATA.current = res;
            return printCurrentVal();
        });
    } else {
        return printError('ERROR. Operació no vàlida: operació factorial només definida per als nombres naturals.');
    }
}

function binary(shortRep, name){
    if (rangeCheck()) {
        let number = Number(SESSIONDATA.current);
        SESSIONDATA.operand = number;
        SESSIONDATA.previous = number;
        SESSIONDATA.binaryOperator.shortRep = shortRep;
        SESSIONDATA.binaryOperator.name = name;
        SESSIONDATA.current = 0;
        printCurrentVal();
    }
}

function op_exp10(){
    binary('*10^', 'exp10');
}
function op_addition(){
    binary('+', 'addition');
}
function op_substraction(){
    binary('-', 'substraction');
}
function op_division(){
    binary('/', 'division');
}
function op_modulo(){
    binary('%', 'modulo');
}
function op_product(){
    binary('*', 'product');
}
function op_xexpy(){
    binary('^', 'xexpy');
}
function op_xrooty(){
    binary('^(1/', 'xrooty');
}

function super_calc(){
    if (rangeCheck()){
        SESSIONDATA.current = Number(SESSIONDATA.current);
        let formatedExpr = '';
        switch (SESSIONDATA.binaryOperator.name){
            case 'exp10':
                formatedExpr = '' + SESSIONDATA.operand + SESSIONDATA.binaryOperator.shortRep + SESSIONDATA.current;
                SESSIONDATA.current = SESSIONDATA.operand * (10 ** SESSIONDATA.current);
                break;
            case 'addition':
                formatedExpr = '' + SESSIONDATA.operand + SESSIONDATA.binaryOperator.shortRep + SESSIONDATA.current;
                SESSIONDATA.current = SESSIONDATA.operand + SESSIONDATA.current;
                break;
            case 'substraction':
                formatedExpr = '' + SESSIONDATA.operand + SESSIONDATA.binaryOperator.shortRep + SESSIONDATA.current;
                SESSIONDATA.current = SESSIONDATA.operand - SESSIONDATA.current;
                break;
            case 'division':
                formatedExpr = '' + SESSIONDATA.operand + SESSIONDATA.binaryOperator.shortRep + SESSIONDATA.current;
                SESSIONDATA.current = SESSIONDATA.operand / SESSIONDATA.current;
                break;
            case 'modulo':
                formatedExpr = '' + SESSIONDATA.operand + SESSIONDATA.binaryOperator.shortRep + SESSIONDATA.current;
                SESSIONDATA.current = SESSIONDATA.operand % SESSIONDATA.current;
                break;
            case 'product':
                formatedExpr = '' + SESSIONDATA.operand + SESSIONDATA.binaryOperator.shortRep + SESSIONDATA.current;
                SESSIONDATA.current = SESSIONDATA.operand * SESSIONDATA.current;
                break;
            case 'xexpy':
                formatedExpr = '' + SESSIONDATA.operand + SESSIONDATA.binaryOperator.shortRep + SESSIONDATA.current;
                SESSIONDATA.current = SESSIONDATA.operand ** SESSIONDATA.current;
                break;
            case 'xrooty':
                formatedExpr = '' + SESSIONDATA.operand + SESSIONDATA.binaryOperator.shortRep + SESSIONDATA.current + ')';
                SESSIONDATA.current = SESSIONDATA.operand ** (1 / SESSIONDATA.current);
                break;
        }
        printCurrentVal();
        //let ref = SESSIONDATA.binaryOperator;
        setHistoryRecord(formatedExpr, 'binary');
        setHistoryResult();
        SESSIONDATA.operand = 0;
        SESSIONDATA.binaryOperator.shortRep = '';
        SESSIONDATA.binaryOperator.name = '';
        showHistoryRecords();
    }
}

function super_c(){
    SESSIONDATA.current = 0;
    return printCurrentVal();
}
function super_ce(){
    super_c();
    SESSIONDATA.record = [];
    SESSIONDATA.errorLog = [];
    DOM_ELEMENTS.get('el_screen_history').innerHTML = '';
}
function super_undo(){
    if (SESSIONDATA.record.length > 1) {
        SESSIONDATA.record.shift();
        SESSIONDATA.current = SESSIONDATA.record[0][4];
        printCurrentVal();
        showHistoryRecords();
    } else {
        printError('ERROR. Operació no vàlida, no es poden desfer més elements.')
    }
}
/* ----------------------------------------------------------- */

/* SAFETY CHECK */
// Parenthesis parser (simple stack)
function parenChecker(){
    let str = String(SESSIONDATA.current).split('');
    let stack = 0;
    for (let i = 0; i < str.length; i++){
        if (str[i] === '(') { stack++; }
        if (str[i] === ')') { stack--; }
        if (stack < 0) { return false; }
    }
    return (stack === 0) ? true: false;
}
// Range checker
function rangeCheck(){
    let numToTest = Number(SESSIONDATA.current);
    if ( !(Number.isFinite(numToTest)) ){
        SESSIONDATA.current = 0;
        printError('ERROR. Operació no vàlida: les operacions amb infinits i les indeterminacions no estan definides.');
        return false;
    } else if (Number.isNaN(numToTest)) {
        SESSIONDATA.current = 0;
        printError('ERROR. Rang: les operacions només es poden fer amb nombres, valor no vàlid.')
        return false;
    } else if (Math.abs(numToTest) > Number.MAX_VALUE) {
        SESSIONDATA.current = 0;
        printError('ERROR. Rang: nombre fora del rang de valors de la calculadora.');
        return false;
    } else if (Math.abs(numToTest) < Number.EPSILON) {
        SESSIONDATA.current = 0;
        printError('ERROR. Rang: nombre menor a la mínima sensibiltat de la calculadora.');
        return false;
    } else {
        return true;
    }
}
// Illegal operations checker
function syntaxChecker(){
    let str = String(SESSIONDATA.current).split('');
    console.log(str);
    // do stuff - to be finished Usually like 2 *** 3 as invalid.
}
// Error messages
function printError(err){
    DOM_ELEMENTS.get('el_screen_history').innerHTML = err;
}
/* ----------------------------------------------------------- */

/* UTILS */
function printCurrentVal(){
    let value;
    if (SESSIONDATA.current < 0){
        value = '-' + SESSIONDATA.current;
    } else {
        value = '' + SESSIONDATA.current;
    }
    DOM_ELEMENTS.get('el_screen_calc').innerHTML = value;
}
/* ----------------------------------------------------------- */

/* HISTORY CONTROLLER */
function setHistoryRecord(name, position){
    let formatedExpr;
    let opname;
    if (position === 'pre'){
        formatedExpr = name + '(' + SESSIONDATA.previous + ')';
        opname = name;
    } else if (position === 'post'){
        formatedExpr = '(' + SESSIONDATA.previous + ')' + name;
        opname = name;
    } else if (position === 'binary'){
        formatedExpr = name;
        opname = SESSIONDATA.binaryOperator.name;
    }
    SESSIONDATA.record.unshift([formatedExpr, SESSIONDATA.previous, opname, position]);
}
function setHistoryResult(){
    SESSIONDATA.record[0].push(SESSIONDATA.current);
    SESSIONDATA.record[0][0] = SESSIONDATA.record[0][0] + ' = ' + SESSIONDATA.current;
}
function showHistoryRecords(){
    let data;
    if (SESSIONDATA.record.length > SESSIONDATA.recordsShown){
        data = SESSIONDATA.record.slice(0, SESSIONDATA.recordsShown);
    } else {
        data = SESSIONDATA.record;
    }
    let dataArray = [];
    for (let el of data){
        dataArray.push(el[0]);
    }
    let screenText = dataArray.toString().replace(/,/g, '<br/>');
    DOM_ELEMENTS.get('el_screen_history').innerHTML = screenText;
}
/* ----------------------------------------------------------- */

module.exports = {
    numbers: numbers,
    constants: constants
};