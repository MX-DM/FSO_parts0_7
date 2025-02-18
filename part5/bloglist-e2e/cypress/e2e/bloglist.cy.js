describe('Bloglist App', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user1 = {
      name: 'rootname',
      username: 'root',
      password: 'root'
    }

    const user2 = {
      name: 'rootname2',
      username: 'root2',
      password: 'root2'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user1)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:5173/')
  })
  
  it('Front page can be opened', function() {
    cy.contains('Blog App')
    cy.contains('Blogs')
  })

  it('Login form can be opened', function() {
    cy.contains('Log in').click()
    cy.contains('Username:')
    cy.contains('Password:')
  })

  describe('Login',function() {
    it('Succeeds with correct credentials', function() {
      cy.contains('Log in').click()
      cy.get('#username').type('root')
      cy.get('#password').type('root')
      cy.get('#login-button').click()
      cy.contains('rootname logged-in')
      cy.contains('Log out').click()
    })

    it('Fails with wrong credentials', function() {
      cy.contains('Log in').click()
      cy.get('#username').type('wrong')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.contains('Wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('Log in').click()
      cy.get('#username').type('root')
      cy.get('#password').type('root')
      cy.get('#login-button').click()
      cy.contains('rootname logged-in')
    })

    it('A new blog can be created', function() {
      cy.contains('Create new blog').click()
      cy.get('#title').type('blog by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('www.cypressdidthis.com')
      cy.get('#create-button').click()
      cy.contains('blog by cypress cypress')
    })

    describe('When multiple blogs exist', function () {
      beforeEach(function () {
        cy.contains('Create new blog').click()
        cy.get('#title').type('Like this')
        cy.get('#author').type('cypress')
        cy.get('#url').type('www.cypressdidthis.com')
        cy.get('#create-button').click()
        cy.contains('Like this cypress')

        cy.contains('Create new blog').click()
        cy.get('#title').type('delete this')
        cy.get('#author').type('cypress')
        cy.get('#url').type('www.cypressdidthis.com')
        cy.get('#create-button').click()
        cy.contains('delete this cypress')

        cy.contains('Log out').click()
        cy.contains('Log in').click()
        cy.get('#username').type('root2')
        cy.get('#password').type('root2')
        cy.get('#login-button').click()
        cy.contains('rootname2 logged-in')

        cy.contains('Create new blog').click()
        cy.get('#title').type('extra blog')
        cy.get('#author').type('cypress')
        cy.get('#url').type('www.cypressdidthis.com')
        cy.get('#create-button').click()
        cy.contains('extra blog cypress')
      })

      it('It can be liked', function () {
        cy.contains('Like this cypress')
          .parents('.blog')
          .contains('View').click()
      
        cy.contains('Like this cypress')
          .parents('.blog')
          .within(() => {
            cy.get('#like-button').click({ force: true })
            cy.get('[data-testid="blog-likes"]').should('contain', '1')
          })
      })

      it('Authorized user (creator) can delete it', function () {
        cy.contains('extra blog cypress')
          .parents('.blog')
          .contains('View').click()

        cy.contains('extra blog cypress')
          .parents('.blog')
          .within(() => {
            cy.get('#delete-button').click({ force: true })
          })
        cy.contains('extra blog cypress').should('not.exist')
        cy.contains('Successfully deleted the blog: extra blog')
      })

      it('Only the creator of a blog can see the delete button', function () {
        cy.contains('extra blog cypress')
        .parents('.blog')
        .within(() => {
          cy.contains('View').click()
          cy.contains('Delete')
        })

        cy.contains('Like this cypress')
        .parents('.blog')
        .within(() => {
          cy.contains('View').click()
          cy.contains('Delete').should('not.exist')
        })
      })

      it('Blogs are ordered by likes', function () {
        cy.contains('Like this cypress')
        .parents('.blog')
        .within(() => {
          cy.contains('View').click()
          for (let i = 0; i < 3; i++) {
            cy.get('#like-button').click()
          }
          cy.get('[data-testid="blog-likes"]').should('contain', '3')
        })

        cy.contains('delete this cypress')
        .parents('.blog')
        .within(() => {
          cy.contains('View').click()
          cy.get('#like-button').click()
          cy.get('[data-testid="blog-likes"]').should('contain', '1')
        })

        cy.contains('extra blog cypress')
        .parents('.blog')
        .within(() => {
          cy.contains('View').click()
          cy.get('#like-button').click()
          cy.get('#like-button').click()
          cy.get('[data-testid="blog-likes"]').should('contain', '2')
        })

        cy.get('.blog').eq(0).should('contain', 'Like this cypress')
        cy.get('.blog').eq(2).should('contain', 'delete this cypress')
      
      })
    })
  })
    
})
