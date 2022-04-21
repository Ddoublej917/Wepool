describe('Check page loaded group.', () => {
    it('Clicks on join group.', () => {
        cy.visit('http://localhost:4200/login')
        cy.contains('Login').click()
        cy.get('#mat-input-0').type('renzo@gmail.com')
        cy.get('#mat-input-1').type('123')
        cy.contains('Sign In').click()
        cy.saveLocalStorage()
        cy.visit('http://localhost:4200/joinGroup')
        cy.contains('Join Group!').click()
    })
    it('Creates custom group', () => {
      cy.contains('Add custom group!').click()
    })
  })