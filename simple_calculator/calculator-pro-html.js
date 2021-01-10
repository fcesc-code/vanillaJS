/* Francesc Brugarolas - Skylab bootcamp 2020-07 - Precurs */
'use strict';

/* DATA */
const DOM_ELEMENTS = new Map();
const SESSIONDATA = {
    current: 0,
    previous: 0,
    operand: 0,
    binaryOperator: {shortRep: '', name: ''},
    record: [],
    recordsShown: 5
};
const DOM_NAMES_BYCLASS = {
    super: ['el_super_calc', 'el_super_undo', 'el_super_ce', 'el_super_c'], 
    const: ['el_const_pi', 'el_const_e', 'el_const_phi', 'el_const_sq2'],
    num: ['el_num_0', 'el_num_1', 'el_num_2', 'el_num_3', 'el_num_4', 'el_num_5', 'el_num_6', 'el_num_7', 'el_num_8', 'el_num_9'],
    as: ['el_as_leftparen', 'el_as_rightparen'],
    op: ['el_op_addition', 'el_op_substraction', 'el_op_division', 'el_op_modulo', 'el_op_product', 'el_op_xexpy', 'el_op_xrooty', 'el_op_exp10'],
    unary: ['el_unary_factorial', 'el_unary_invx', 'el_unary_square', 'el_unary_squareroot', 'el_unary_cube', 'el_unary_cubicroot', 'el_unary_percent', 'el_unary_abs', 'el_unary_changeSign', 'el_unary_log', 'el_unary_invlog', 'el_unary_ln', 'el_unary_invln', 'el_unary_sin', 'el_unary_cos', 'el_unary_tan', 'el_unary_asin', 'el_unary_acos', 'el_unary_atan'],
    screen: ['el_screen_calc', 'el_screen_history'],
    decimal: ['el_decimal'],
    all: []
}
DOM_NAMES_BYCLASS.all = Array.from([...DOM_NAMES_BYCLASS.super,...DOM_NAMES_BYCLASS.const,...DOM_NAMES_BYCLASS.num,...DOM_NAMES_BYCLASS.as,...DOM_NAMES_BYCLASS.op,...DOM_NAMES_BYCLASS.unary,...DOM_NAMES_BYCLASS.screen,...DOM_NAMES_BYCLASS.decimal]);
/* ----------------------------------------------------------- */

/* DOM ELEMENTS */
function findDOMElements(){
    for (let el of DOM_NAMES_BYCLASS.all){
        DOM_ELEMENTS.set(el, document.querySelector('#' + el));
    }
}
/* ----------------------------------------------------------- */

/* DOM STEP 1: MOUSE */
function injectDOMListeners(){
    // numbers
    for (let el of DOM_NAMES_BYCLASS.num){
        DOM_ELEMENTS.get(el).addEventListener('click', () => { numbers(DOM_ELEMENTS.get(el).innerHTML); } );
    }
    // constants
    DOM_ELEMENTS.get('el_const_pi').addEventListener('click', () => { constants('pi'); } );
    DOM_ELEMENTS.get('el_const_e').addEventListener('click', () => { constants('e'); } );
    DOM_ELEMENTS.get('el_const_phi').addEventListener('click', () => { constants('phi'); } );
    DOM_ELEMENTS.get('el_const_sq2').addEventListener('click', () => { constants('sq2'); } );
    // decimal point
    DOM_ELEMENTS.get('el_decimal').addEventListener('click', () => { decimal(); } );
    // unary operators
    DOM_ELEMENTS.get('el_unary_abs').addEventListener('click', () => { unary_abs(); } );
    DOM_ELEMENTS.get('el_unary_changeSign').addEventListener('click', () => { unary_changeSign(); } );
    DOM_ELEMENTS.get('el_unary_square').addEventListener('click', () => { unary_square(); } );
    DOM_ELEMENTS.get('el_unary_squareroot').addEventListener('click', () => { unary_squareroot(); } );
    DOM_ELEMENTS.get('el_unary_cube').addEventListener('click', () => { unary_cube(); } );
    DOM_ELEMENTS.get('el_unary_cubicroot').addEventListener('click', () => { unary_cubicroot(); } );
    DOM_ELEMENTS.get('el_unary_percent').addEventListener('click', () => { unary_percent(); } );
    DOM_ELEMENTS.get('el_unary_invx').addEventListener('click', () => { unary_invx(); } );
    DOM_ELEMENTS.get('el_unary_factorial').addEventListener('click', () => { unary_factorial(); } );
    DOM_ELEMENTS.get('el_unary_log').addEventListener('click', () => { unary_log(); } );
    DOM_ELEMENTS.get('el_unary_invlog').addEventListener('click', () => { unary_invlog(); } );
    DOM_ELEMENTS.get('el_unary_ln').addEventListener('click', () => { unary_ln(); } );
    DOM_ELEMENTS.get('el_unary_invln').addEventListener('click', () => { unary_invln(); } );
    DOM_ELEMENTS.get('el_unary_sin').addEventListener('click', () => { unary_sin(); } );
    DOM_ELEMENTS.get('el_unary_cos').addEventListener('click', () => { unary_cos(); } );
    DOM_ELEMENTS.get('el_unary_tan').addEventListener('click', () => { unary_tan(); } );
    DOM_ELEMENTS.get('el_unary_asin').addEventListener('click', () => { unary_asin(); } );
    DOM_ELEMENTS.get('el_unary_acos').addEventListener('click', () => { unary_acos(); } );
    DOM_ELEMENTS.get('el_unary_atan').addEventListener('click', () => { unary_atan(); } );
    // binary operators
    DOM_ELEMENTS.get('el_op_exp10').addEventListener('click', () => { op_exp10(); } );
    DOM_ELEMENTS.get('el_op_addition').addEventListener('click', () => { op_addition(); } );
    DOM_ELEMENTS.get('el_op_substraction').addEventListener('click', () => { op_substraction(); } );
    DOM_ELEMENTS.get('el_op_modulo').addEventListener('click', () => { op_modulo(); } );
    DOM_ELEMENTS.get('el_op_division').addEventListener('click', () => { op_division(); } );
    DOM_ELEMENTS.get('el_op_product').addEventListener('click', () => { op_product(); } );
    DOM_ELEMENTS.get('el_op_xexpy').addEventListener('click', () => { op_xexpy(); } );
    DOM_ELEMENTS.get('el_op_xrooty').addEventListener('click', () => { op_xrooty(); } );
    // supers
    DOM_ELEMENTS.get('el_super_c').addEventListener('click', () => { super_c(); } );
    DOM_ELEMENTS.get('el_super_ce').addEventListener('click', () => { super_ce(); } );
    DOM_ELEMENTS.get('el_super_undo').addEventListener('click', () => { super_undo(); } );
    DOM_ELEMENTS.get('el_super_calc').addEventListener('click', () => { super_calc(); } );
}
/* ----------------------------------------------------------- */

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

/* RUN */
function init(){
    findDOMElements();
    injectDOMListeners();
    printCurrentVal();
}

init();
/* ----------------------------------------------------------- */