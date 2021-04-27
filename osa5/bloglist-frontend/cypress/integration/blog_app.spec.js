/// <reference types="Cypress" />

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');

    // Create users to test with
    const user = {
      name: 'Petri Lindholm',
      username: 'petri1807',
      password: 'salasana',
    };

    const secondUser = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    };

    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.request('POST', 'http://localhost:3003/api/users/', secondUser);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains(/log in/i);

    cy.get('#username').should('be.visible');
    cy.get('#password').should('be.visible');
    cy.get('#login-button').should('be.visible');
  });

  describe('Login', function () {
    it('succeeds with correct credentials ', function () {
      cy.get('#username').type('petri1807');
      cy.get('#password').type('salasana');
      cy.get('#login-button').click();

      cy.contains('Petri Lindholm logged in');
    });

    it('fails with wrong credentials ', function () {
      cy.get('#username').type('petri1807');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();

      cy.get('.notification')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');

      cy.get('html').should('not.contain', 'Petri Lindholm logged in');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'petri1807', password: 'salasana' });
    });

    it('A blog can be created', function () {
      cy.get('#openTogglable').click();

      cy.get('#title').type(
        'Cypress vs. Selenium: Why Cypress is the better option'
      );
      cy.get('#author').type('Paul Cowan');
      cy.get('#url').type(
        'https://blog.logrocket.com/cypress-io-the-selenium-killer/'
      );

      cy.get('#blogSubmit').click();
      cy.contains('Cypress vs. Selenium: Why Cypress is the better option');

      cy.get('.notification')
        .should(
          'contain',
          'A new blog Cypress vs. Selenium: Why Cypress is the better option added'
        )
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid');
    });

    describe('A single blog exists', () => {
      const blogTitle = 'Cypress made this blog by bypassing the UI';

      beforeEach(function () {
        // Creates blog as logged in user
        cy.createBlog({
          title: blogTitle,
          author: 'Fake Author',
          url: 'http://fakeurl.com',
        });
      });

      it('clicking the like button increases the like count', function () {
        cy.contains(blogTitle);

        cy.get('#view').click();
        cy.contains('likes 0');
        cy.get('#like').click();
        cy.contains('likes 1');
      });

      it('correct user can delete a blog', function () {
        cy.contains(blogTitle);
        cy.get('#view').click();

        // For some reason Cypress executes this without dealing with the confirm promt
        cy.get('#remove').click();

        // Notification
        cy.get('.notification')
          .should('contain', `Deleted ${blogTitle} by Fake Author`)
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid');

        // Confirm blog no longer exists
        cy.get('.blogItem').should('not.exist');
      });

      it('user can not delete a blog they did not create', function () {
        // Log is as another user
        cy.contains(/log out/i).click();
        cy.login({ username: 'mluukkai', password: 'salainen' });

        // View blog info
        cy.get('#view').click();

        // Assert the missing remove button
        cy.get('#remove').should('not.exist');
      });
    });

    describe('Multiple blogs exist', function () {
      beforeEach(function () {
        const blogs = [
          {
            title: 'first blog',
            author: 'unknown author',
            url: 'http://fakeurl.com',
          },
          {
            title: 'second blog',
            author: 'unknown author',
            url: 'http://fakeurl.com',
          },
          {
            title: 'third blog',
            author: 'unknown author',
            url: 'http://fakeurl.com',
          },
        ];

        blogs.forEach(function (blog) {
          cy.createBlog(blog);
        });
      });

      it('blogs are sorted in descending order of likes ', function () {
        // Show full info for each blog
        cy.contains('first blog').parent().find('button').click();
        cy.contains('second blog').parent().find('button').click();
        cy.contains('third blog').parent().find('button').click();

        // Save like buttons for later use
        cy.contains('second blog')
          .parent()
          .parent()
          .contains('likes')
          .find('button')
          .as('secondLikeButton');

        cy.contains('third blog')
          .parent()
          .parent()
          .contains('likes')
          .find('button')
          .as('thirdLikeButton');

        // Click like buttons
        cy.get('@secondLikeButton').click();
        cy.contains('likes 1');
        cy.get('@secondLikeButton').click();
        cy.contains('likes 2');
        cy.get('@thirdLikeButton').click();
        cy.contains('likes 1');

        // Get the parent element containing all blogs, grab the children elements from it and assert their correct order
        cy.get('.blogTable')
          .children()
          .then(function (blogs) {
            expect(blogs[0]).to.contain('second blog');
            expect(blogs[1]).to.contain('third blog');
            expect(blogs[2]).to.contain('first blog');
          });
      });
    });
  });
});
