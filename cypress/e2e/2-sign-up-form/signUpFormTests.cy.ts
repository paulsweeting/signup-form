/// <reference types="cypress" />
import SignupForm from '../../page-objects/signupForm';

// Positive Test
describe('Signup', () => {
  it('should allow a user to sign up', () => {
    SignupForm.visit();
    SignupForm.submitForm('John', 'Doe', 'test@example.com', 'password');
    // assert that the user is signed up
    cy.get('h1').should('contain', 'Submitted Successfully');
  });
});