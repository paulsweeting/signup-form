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

// Negative Tests
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

    // Check that the error is only displayed once within the form.
    cy.get('[data-cy=sign-up-form]')
      .find('[data-cy$=-error-message]') //Find all error messages
      .filter(':contains("Required")') // Only return those displaying the 'Required' error
      .its('length')
      .should('eq', 1); // Assert that only one displays "Required"
    });
});

describe('All required fields missing', () => {
  it('should inform the user of all fields that are required', () => {
    SignupForm.visit();

    // Attempt to submit form having not completed and required fields
    SignupForm.clickSubmitButton();

    // Assert that the user is NOT signed up
    cy.get(SignupForm.signUpSuccessMessage)
      .should('not.contain', 'Submitted Successfully');

    // Check that the error is displayed for the number of required fields
    cy.get('[data-cy=sign-up-form]')
      .find('[data-cy$=-error-message]') // select all error messages
      .should('have.length', 4) // assert that there are 4 matching elements
      .each(($el) => {
        expect($el).to.contain('Required'); // assert that each element contains the text 'Required'
      });
    });
});