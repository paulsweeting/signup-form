/// <reference types="cypress" />
import SignupForm from '../../page-objects/signupForm';

// Positive Test
describe('Signup', () => {
  it('should allow a user to sign up', () => {
    SignupForm.visit();
    SignupForm.submitForm('John', 'Doe', 'test@example.com', 'password');
    // assert that the user is signed up
    cy.get(SignupForm.signUpSuccessMessage).should('contain', 'Submitted Successfully');
  });
});

// Negative Tests - Missing field
describe('Single missing required field', () => {
  it('should inform the user the field is required', () => {
    SignupForm.visit();

    // Missing first name
    SignupForm.fillLastName("Doe")
    SignupForm.fillEmail("test@example.com")
    SignupForm.fillPassword("password")

    // Attempt to submit form
    SignupForm.clickSubmitButton();

    // Assert that the user is NOT signed up
    cy.get(SignupForm.signUpSuccessMessage)
      .should('not.contain', 'Submitted Successfully');

    // Assert the user is told that the first name field is required
    cy.get(SignupForm.firstNameErrorMessage).should('contain', 'Required');

    // Check that the error is only displayed once across the page.
    cy.contains('Required')
       .should('have.length', 1) // Verify it is only displayed once
      });
});