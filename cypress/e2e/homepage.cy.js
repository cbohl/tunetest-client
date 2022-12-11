const { type } = require("@testing-library/user-event/dist/type")

describe('The Home Page', () => {
    it('successfully loads', () => {
      cy.visit('http://localhost:3000') // change URL to match your dev URL
    })

    it('starts game', () => {
        cy.visit('http://localhost:3000') // change URL to match your dev URL
        cy.get('#StartButton')
        .should('be.visible')
        .click()
        cy.get('#song-guess-text')
        .should('be.visible')
        .type('Hey Jude')
        // .type('Hey Jude')
    })

    // it('enters correct song', () => {
    //     cy.visit('http://localhost:3000') // change URL to match your dev URL
    // })
  })



//   cy.get('#fullName')
//   .should('be.visible')
//   .type('John Doe')
// cy.get('#email')
//   .should('be.visible')
//   .type('john-doe@example.com')
// cy.get('#iAgree')
//   .should('be.visible')
//   .check()
// cy.get('button[type="submit"]')
//   .should('be.visible')
//   .click()