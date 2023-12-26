describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5501/rock-paper-scissors/rock-paper-scissors.html')
  })

  it('user clicks rock button', () => {
    cy.dataTest('rock-button').should('be.visible').click()
    //broke it down to have the src value instead of the array.
    cy.dataTest('player-move').should('have.attr', 'src').and('include', 'images/rock-emoji.png')
    cy.dataTest('computer-move').should('have.attr', 'src')
  })


  it('user clicks paper button', () => {
    cy.dataTest('paper-button').should('be.visible').click()
    cy.dataTest('player-move').should('have.attr', 'src').and('include', 'images/paper-emoji.png')
    cy.dataTest('computer-move').should('have.attr', 'src')
  })


  it('user clicks scissors button', () => {
    cy.dataTest('scissors-button').should('be.visible').click()
    cy.dataTest('player-move').should('have.attr', 'src').and('include', 'images/scissors-emoji.png')
    cy.dataTest('computer-move').should('have.attr', 'src')
  })

  it('reset Score button', () => {
    cy.dataTest('data-reset-button').should('be.visible')
    cy.dataTest('data-reset-button').click()
    cy.dataTest('data-score').should('have.text', ' wins: 0, losses: 0, ties: 0')
  })

  it('score saved in local memory', () => {
    //clicking the rock button four times, refreshing and checking if the local storage has data.
    for (let i = 0; i < 4; i++) {
      cy.dataTest('rock-button').click()
    }
    cy.reload()

    cy.window().then((scores) => {
      const localStorageData = scores.localStorage.getItem('score')
      expect(localStorageData).to.not.equal('{"wins":0,"losses":0,"ties":0}')
    })
})
})