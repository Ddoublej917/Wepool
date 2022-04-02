describe('Test each question on page.', () => {
    it('Fill in private information.', () => {
      cy.visit('http://localhost:4200/profile')
      cy.get('#mat-input-0').type('Renzo Pretto')
      cy.get('#search').type('311 Southwest 13th Street, Gainesville, FL, USA')
      cy.get('.company > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').type('Stadium Road')
      cy.get('#mat-option-0 > .mat-option-text').click()
    })
    it('Fill in preferences.', () => {
        cy.get(':nth-child(6) > question-component > #body > .type > .slider > .mat-slider').type('{rightarrow}{leftarrow}')
        cy.get(':nth-child(7) > question-component > #body > .type > .slider > .mat-slider').type('{rightarrow}{leftarrow}{leftarrow}')
        cy.get(':nth-child(8) > question-component > #body > .type > .slider > .mat-slider').type('{rightarrow}{rightarrow}')
    })
    it('Fill in must haves.', () => {
        cy.get('#mat-slide-toggle-1 > .mat-slide-toggle-label > .mat-slide-toggle-bar > .mat-slide-toggle-thumb-container > .mat-slide-toggle-thumb').click()
        cy.get('#mat-slide-toggle-3 > .mat-slide-toggle-label > .mat-slide-toggle-bar > .mat-slide-toggle-thumb-container > .mat-slide-toggle-thumb').click()
    })
  })