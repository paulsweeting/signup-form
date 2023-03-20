/// <reference types="cypress" />
import SignupForm from '../../fixtures/page-objects/signupForm';
import { user } from '../../fixtures/data-objects/user';


// ------------------------------------------------------------------------
//                          POSITIVE TESTS
// ------------------------------------------------------------------------
describe('Signup', () => {
  it('should allow a user to sign up', () => {
    SignupForm.visit();
    SignupForm.submitForm(user.firstName,
                          user.lastName,
                          user.email,
                          user.password);

    // assert that the user is signed up
    cy.get(SignupForm.signUpMessage).should('contain', SignupForm.signUpSuccessText);
  });
});

describe('User begins typing', () => {
  it('should NOT display any error messages to the user', () => {
   SignupForm.visit();

   // User starts to type their first name
   SignupForm.fillFirstName('J');

   // Assert that no error message is displayed yet
   cy.get(SignupForm.firstNameErrorMessage).should('be.empty');
   });
});

describe('User resolves field error', () => {
  it('should dismiss the previous error displayed to the user', () => {
    SignupForm.visit();

    // Attempt to submit empty form triggering error messages
    SignupForm.clickSubmitButton();

    // Check that some First Name error message is displayed
    cy.get(SignupForm.firstNameErrorMessage).should('not.be.empty');

    // User completes their first name
    SignupForm.fillFirstName(user.firstName);

    // Assert the field error message is removed (empty string)
    cy.get(SignupForm.firstNameErrorMessage).should('be.empty');
   });
});

// ------------------------------------------------------------------------
//                          NEGATIVE TESTS
// ------------------------------------------------------------------------
describe('Required field incomplete when clicking on next field', () => {
  it('should inform the user the field is required', () => {
    SignupForm.visit();

    // User clicks on the first name
    cy.get(SignupForm.firstNameInput).click();

    // User proceeds to Last Name without completing First Name
    cy.get(SignupForm.lastNameInput).click();

    // Assert the user is told that the first name field is required
    cy.get(SignupForm.firstNameErrorMessage)
      .should('contain', SignupForm.fieldErrorText.get('required'));

    // Assert that the error is only displayed once within the form.
    cy.get(SignupForm.signUpForm)
      .find(SignupForm.allErrorMessages)
      .filter(`:contains("${ SignupForm.fieldErrorText.get('required') }")`)
      .its('length')
      .should('eq', 1);
    });
});

describe('Single required field missing on submit', () => {
  it('should inform the user the field is required', () => {
    SignupForm.visit();

    // Missing first name
    SignupForm.fillLastName(user.lastName)
    SignupForm.fillEmail(user.email)
    SignupForm.fillPassword(user.password)

    // Attempt to submit form
    SignupForm.clickSubmitButton();

    // Assert that the user is NOT signed up
    cy.get(SignupForm.signUpMessage)
      .should('not.contain', SignupForm.signUpSuccessText);

    // Assert the user is told that the first name field is required
    cy.get(SignupForm.firstNameErrorMessage).
       should('contain', SignupForm.fieldErrorText.get('required'));

    // Assert that the error is only displayed once within the form.
    cy.get(SignupForm.signUpForm)
      .find(SignupForm.allErrorMessages)
      .filter(`:contains("${ SignupForm.fieldErrorText.get('required') }")`)
      .its('length')
      .should('eq', 1);
    });
});

describe('All required fields missing on submit', () => {
  it('should inform the user of all fields that are required', () => {
    SignupForm.visit();

    // Attempt to submit form having not completed and required fields
    SignupForm.clickSubmitButton();

    // Assert that the user is NOT signed up
    cy.get(SignupForm.signUpMessage)
      .should('not.contain', SignupForm.signUpSuccessText);

    // Assert that the error is displayed for the number of required fields
    cy.get(SignupForm.signUpForm)
      .find(SignupForm.allErrorMessages)
      .should('have.length', 4)
      .each(($el) => {
        expect($el).to.contain(SignupForm.fieldErrorText.get('required'));
      });
    });
});

describe('Entered text is too short on submit', () => {
  it('should inform the user that text they entered into the field is too short', () => {
    SignupForm.visit();

    // Short Second name
    SignupForm.submitForm('Joe', 'D', 'test@example.com', 'password');

    // Attempt to submit form
    SignupForm.clickSubmitButton();

    // Assert that the user is NOT signed up
    cy.get(SignupForm.signUpMessage)
      .should('not.contain', SignupForm.signUpSuccessText);

    // Assert the user is told that the second name field is too short
    cy.get(SignupForm.lastNameErrorMessage).
       should('contain', SignupForm.fieldErrorText.get('minLength'));

    // Assert that the error is only displayed once within the form.
    cy.get(SignupForm.signUpForm)
      .find(SignupForm.allErrorMessages)
      .filter(`:contains("${ SignupForm.fieldErrorText.get('minLength') }")`)
      .its('length')
      .should('eq', 1);
    });
});

describe('Entered text is too long on submit', () => {
  it('should inform the user that text they entered into the field is too long', () => {
    SignupForm.visit();
    // Long password
    SignupForm.submitForm(user.firstName,
                          user.lastName,
                          user.email,
                          'thispasswordisreallyreallyreallyreallyreallyreallyreallylong');

    // Attempt to submit form
    SignupForm.clickSubmitButton();

    // Assert that the user is NOT signed up
    cy.get(SignupForm.signUpMessage)
      .should('not.contain', SignupForm.signUpSuccessText);

    // Assert the user is told that the password entered is too long
    cy.get(SignupForm.passwordErrorMessage).
       should('contain', SignupForm.fieldErrorText.get('maxLength'));

    // Assert that the error is only displayed once within the form.
    cy.get(SignupForm.signUpForm)
      .find(SignupForm.allErrorMessages)
      .filter(`:contains("${ SignupForm.fieldErrorText.get('maxLength') }")`)
      .its('length')
      .should('eq', 1);
    });
});

describe('Invalid email on submit', () => {
  it('should inform the user that the email they entered is invalid', () => {
    SignupForm.visit();

    // Invalid Email
    SignupForm.submitForm(user.firstName,
                          user.lastName,
                          'invalidemail',
                          user.password);

    // Attempt to submit form
    SignupForm.clickSubmitButton();

    // Assert that the user is NOT signed up
    cy.get(SignupForm.signUpMessage)
      .should('not.contain', SignupForm.signUpSuccessText);

    // Assert the user is told that email is invalid
    cy.get(SignupForm.emailErrorMessage).
       should('contain', SignupForm.fieldErrorText.get('invalidEmail'));

    // Assert that the error is only displayed once within the form.
    cy.get(SignupForm.signUpForm)
      .find(SignupForm.allErrorMessages)
      .filter(`:contains("${ SignupForm.fieldErrorText.get('invalidEmail') }")`)
      .its('length')
      .should('eq', 1);
    });
});