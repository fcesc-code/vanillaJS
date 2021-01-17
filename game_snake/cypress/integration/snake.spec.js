const URLtest = {
  protocol: 'http:',
  host: '127.0.0.1',
  port: '5500',
  path: 'game_snake/',
  file: 'snake.html'
}

describe('local host works', () => {
  it('Visit main page', () => {
    // lauch live server on port 5500 or change URLtest data so that the text can work
    cy.visit(`${URLtest.protocol}//${URLtest.host}:${URLtest.port}/${URLtest.path}${URLtest.file}`);
  })
})

describe('Keyboard test suite', () => {
  it('Keypress 37 (left arrow) should set velocity x to -1', () => {
    cy.get('document').type('{leftarrow}');
    expect(cy.get(state.vx)).to.equal(-1);
  })
})