describe('Blog App', function () {

  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      username: 'spacepirate',
      name: 'Mark Watney',
      password: 'ihateabba'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('login form is shown', function () {
    cy.contains('login')
  })

  describe('Login', function () {

    it('succeeds with correct credentials', function () {
      cy.get('input:first').type('spacepirate')
      cy.get('input:last').type('ihateabba')
      cy.get('button').click()

      cy.contains('log out')
    })

    it('fails with wrong credentials', function () {
      cy.get('input:first')
      cy.get('input:first').type('arcticpirate')
      cy.get('input:last').type('iloveabba')
      cy.get('button').click()

      cy.get('.error').contains('invalid username or password')
      cy.get('.error')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'spacepirate', password: 'ihateabba' })
    })

    it('can create a new blog', function () {
      cy.contains('Create blog').click()
      cy.get('#title').type('test blog title')
      cy.get('#author').type('authorname testcase')
      cy.get('#url').type('www.testurl.com')
      cy.get('#create-blog-button').click()

      cy.contains('test blog title created!')
      cy.get('.error')
        .should('have.css', 'color', 'rgb(0, 128, 0)')
    })

     describe('and several blogs exist', function () {
       beforeEach(function () {
         cy.createBlog({title:'blog one', author:''})
       })
     })


  })
})