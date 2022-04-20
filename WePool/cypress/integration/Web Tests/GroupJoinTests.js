describe('Check page loaded group.', () => {
    it('Clicks on join group.', () => {
      cy.visit('http://localhost:4200/login')
        cy.contains('Login').click()
        cy.get('#mat-input-0').type('renzo@ufl.edu')
        cy.get('#mat-input-1').type('123')
        cy.contains('Sign In').click()
        cy.saveLocalStorage()
      cy.visit('http://localhost:4200/joinGroup')
      cy.get('[style="left: 0px; width: calc((50% - 0.5px) * 1 + 0px); margin-top: 0px; padding-top: calc((25% - 0.5px) * 1 + 0px);"] > .mat-figure > .mat-card > .mat-card-actions > .mat-focus-indicator > .mat-button-wrapper').click()
    })
  })