/* Francesc Brugarolas - Skylab bootcamp 2020-07 - Precurs */
'use strict';

/* DATA */
const DOM_ELEMENTS = new Map();
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