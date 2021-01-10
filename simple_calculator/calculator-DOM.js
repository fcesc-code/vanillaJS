/* Francesc Brugarolas - Skylab bootcamp 2020-07 - Precurs */
'use strict';

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
