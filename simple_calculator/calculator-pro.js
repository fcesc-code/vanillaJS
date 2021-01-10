/* Francesc Brugarolas - Skylab bootcamp 2020-07 - Precurs */
'use strict';
function validar(input) {
    try{
        const errVal = ["Error: el valor introduït no és un nombre", 'Error: el nombre està fora de rang'];
        let nombre = Number(input);

        if (isNaN(nombre) || typeof(nombre) === 'number' && (input === 'Infinity' || input === '-Infinity') ){
            throw errVal[0];
        }
        if (nombre !== 0 && nombre > 0 && (Math.abs(nombre) < Number.EPSILON || Math.abs(nombre) > Number.MAX_VALUE) ){
            throw errVal[1];
        }
    
        return nombre;

    } catch (err) {
        console.log(err);
    }
}

function prepara (input){
    let args = String(input).split(',');
    let base = [];
    for (let i = 0; i < args.length; i++){
        let tmp = validar(args[i]);
        if (tmp === undefined){
            console.log('Ooops. Alguna cosa ha anat malament. Aturat el càlcul.');
            return undefined;
        }
        base.push(tmp);
    }
    return base;
}

function calcula(base){
  
    if (base.length === 1){
        calculaSimple(base);
    } else if (base.lneght === 2) {
        calculaDoble(base); 
    } else {
        calculaMultiple(base);
    }
  
    function calculaSimple (arr){
        let n = arr[0];
        let resultats = {
            arrelQuadrada: n**(1/2),
            arrelCubica: n**(1/3),
            quadrat: n**2,
            cub: n**3,
            absolut: Math.abs(n),
            enter: Number.isInteger(n),
            signe: (n>=0) ? '+' : '-'
        }
        return mostrar(resultats, arr);
    }

    function calculaDoble (arr){
        let resultats = {
            suma: arr[0] + arr[1],
            resta1: arr[0] - arr[1],
            resta2: arr[1] - arr[0],
            producte: arr[0] * arr[1],
            divisio1: arr[0] / arr[1],
            divisio2: arr[1] / arr[0],
            modul1: arr[0] % arr[1],
            modul2: arr[1] % arr[0],
            sumaQuadrats: arr[0]**2 + arr[1]**2
        }
        return mostrar(resultats, arr);
    }

    function calculaMultiple (arr){
        const reSuma = (a, b) => a + b;
        const reSmAb = (a, b) => Math.abs(a) + Math.abs(b);
        const reRest = (a, b) => a - b;
        const reProd = (a, b) => a * b;
        const reDivf = (a, b) => a / b;
        const reSumQ = (a, b) => a**2 + b**2;
        let resultats = {
            suma: arr.reduce(reSuma),
            sumaAbs: arr.reduce(reSmAb),
            restaED: arr.reduce(reRest),
            restaDE: arr.reverse().reduce(reRest),
            producte: arr.reduce(reProd),
            divisioED: arr.reduce(reDivf),
            divisioDE: arr.reverse().reduce(reDivf),
            sumaQuadrats: arr.reduce(reSumQ)
        }
        return mostrar(resultats, arr);
    }
}

function mostrar(obj, arr){
    let res = Object.entries(obj); /* així tenim als resultats a un array com es demanava però també podem posar el nom de cada operació */
    console.log("Mostrant resultats de les operacions realitzades amb els següents nombres: " + arr);
    for (let en of res){
        let r;
        if(typeof(en[1]) !== 'boolean' && typeof(en[1]) !== 'string'){
          (!Number.isInteger(en[1])) ? r = Number.parseFloat(en[1]).toFixed(3) : r = en[1];
        } else {
          r = en[1];
        }
        console.log("   > operació " + en[0] + " = " + r);
    }
    return init();
}

function requereix(){
    console.log("Recorda, només pots introduir nombres: enters, decimals i en forma exponencial - com 3E4. Poden tenir signe.");
    let input = prompt("Introdueix un o varis nombres seguits per comes, o introdueix 'exit' per sortir: ");
    return input;
}

function init(){
    var base;
    do {
        let input = requereix();
        if (input.toLowerCase() === 'exit'){
            return;
        }
        base = prepara(input);
    } while (base === undefined);
    calcula(base);
}

init();