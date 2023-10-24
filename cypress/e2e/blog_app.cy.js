describe('Blog App', function () {

  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user1 = {
      username: 'spacepirate',
      name: 'Mark Watney',
      password: 'ihateabba'
    }
    const user2 = {
      username: 'admin',
      name: 'Administrator',
      password: 'admin'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user1)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
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
        cy.createBlog({ title: 'blog one', author: 'blog one author', url: 'blog one url' })
        cy.createBlog({ title: 'blog two', author: 'blog two author', url: 'blog two url' })
        cy.createBlog({ title: 'blog three', author: 'blog three author', url: 'blog three url' })
      })

      it('can like a blog', function () {
        cy.contains('blog one')
          .parent()
          .contains('view')
          .click()

        cy.contains(0)
        cy.contains('like').click()
        cy.contains(1)
      })

      it('can delete a blog if creator is logged in', function () {
        cy.contains('blog two')
          .parent()
          .contains('view')
          .click()

        cy.contains('Delete').click()
        cy.contains('blog two by blog two author successfully deleted!')
      })

      it('cannot delete blog of different user', function () {
        cy.contains('log out').click()
        cy.login({ username: 'admin', password: 'admin' })

        cy.contains('blog two')
          .parent()
          .contains('view')
          .click()

        cy.contains('Delete').should('not.exist')
      })

    })
    //missing test for order of blogs by likes

  })
})