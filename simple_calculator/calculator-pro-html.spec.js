const state = require('./calculator-STATE.js');
const calc = require('./calculator-CALCULUS.js');

describe('Calculator test suite', ()=>{

  // describe('1 - Test set for DOM operations', ()=>{
  
  // })

  describe('2 - Test set for constants and number formatting', ()=>{
  
    describe('2.1 - Number function', ()=>{
      
      const SESSIONDATA = state.SESSIONDATA;
      const printCurrentVal = jest.fn();

      beforeEach(()=>{
        SESSIONDATA.current = 0;
      })

      it('2.1.1 - test numbers input display - add input number to right to current number', ()=>{
        let current = SESSIONDATA.current;

        calc.numbers('1');
        let expected = Number(SESSIONDATA.current + '' + num);

        expect(current).toBeEqual(expected);
        expect(printCurrentVal).toHaveBeenCalled();
      })

      it('2.1.2 - test numbers input display - add 0 to the right to current number', ()=>{
        let current = SESSIONDATA.current;

        calc.numbers('0');
        let expected = Number(SESSIONDATA.current + '0');

        expect(current).toBeEqual(expected);
        expect(printCurrentVal).toHaveBeenCalled();
      })

    })

    describe('2.2 - Constants function', ()=>{
  
      beforeEach(()=>{
        const SESSIONDATA = {
          current: 0
        }
        const printCurrentVal = jest.fn();
      })

      it('2.2.1 - test PI constant', ()=>{
        calc.constants('pi');

        let expected = math.PI;

        expect(SESSIONDATA.current).toBeEqual(expected);
        expect(printCurrentVal).toHaveBeenCalled();
      })

    })

  })

  // describe('3 - Test set for history record + undo functionality', ()=>{
  
  // })

})