/// <reference types="cypress" />
import SignupForm from '../../page-objects/signupForm';

// ------------------------------------------------------------------------
//                          POSITIVE TESTS
// ------------------------------------------------------------------------
describe('Signup', () => {
  it('should allow a user to sign up', () => {
    SignupForm.visit();
    SignupForm.submitForm('John', 'Doe', 'test@example.com', 'password');
    // assert that the user is signed up
    cy.get(SignupForm.signUpSuccessMessage).should('contain', 'Submitted Successfully');
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
    SignupForm.fillFirstName('Joe');

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
      .should('contain', SignupForm.fieldErrorMessages.get('required'));

    // Assert that the error is only displayed once within the form.
    cy.get(SignupForm.signUpForm)
      .find(SignupForm.allErrorMessages) //Find all error messages
      .filter(':contains("Required")') // Only return those displaying the 'Required' error
      .its('length')
      .should('eq', 1); // Assert that only one displays "Required"
    });
});

describe('Single required field missing on submit', () => {
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
    cy.get(SignupForm.firstNameErrorMessage).
       should('contain', SignupForm.fieldErrorMessages.get('required'));

    // Assert that the error is only displayed once within the form.
    cy.get(SignupForm.signUpForm)
      .find(SignupForm.allErrorMessages)
      .filter(`:contains("${ SignupForm.fieldErrorMessages.get('required') }")`)
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
    cy.get(SignupForm.signUpSuccessMessage)
      .should('not.contain', 'Submitted Successfully');

    // Assert that the error is displayed for the number of required fields
    cy.get(SignupForm.signUpForm)
      .find(SignupForm.allErrorMessages)
      .should('have.length', 4)
      .each(($el) => {
        expect($el).to.contain(SignupForm.fieldErrorMessages.get('required'));
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
    cy.get(SignupForm.signUpSuccessMessage)
      .should('not.contain', 'Submitted Successfully');

    // Assert the user is told that the second name field is too short
    cy.get(SignupForm.lastNameErrorMessage).
       should('contain', SignupForm.fieldErrorMessages.get('minLength'));

    // Assert that the error is only displayed once within the form.
    cy.get(SignupForm.signUpForm)
      .find(SignupForm.allErrorMessages)
      .filter(`:contains("${ SignupForm.fieldErrorMessages.get('minLength') }")`)
      .its('length')
      .should('eq', 1);
    });
});

describe('Entered text is too long on submit', () => {
  it('should inform the user that text they entered into the field is too long', () => {
    SignupForm.visit();
    // Long password
    SignupForm.submitForm('Joe',
                            'Doe',
                            'test@example.com',
                            'thispasswordisreallyreallyreallyreallyreallyreallyreallylong');
    // Attempt to submit form
    SignupForm.clickSubmitButton();

    // Assert that the user is NOT signed up
    cy.get(SignupForm.signUpSuccessMessage)
      .should('not.contain', 'Submitted Successfully');

    // Assert the user is told that the password entered is too long
    cy.get(SignupForm.passwordErrorMessage).
       should('contain', SignupForm.fieldErrorMessages.get('maxLength'));

    // Assert that the error is only displayed once within the form.
    cy.get(SignupForm.signUpForm)
      .find(SignupForm.allErrorMessages)
      .filter(`:contains("${ SignupForm.fieldErrorMessages.get('maxLength') }")`)
      .its('length')
      .should('eq', 1);
    });
});

describe('Invalid email on submit', () => {
  it('should inform the user that the email they entered is invalid', () => {
    SignupForm.visit();

    // Invalid Email
    SignupForm.submitForm('Joe','Doe','invalidemail','password');

    // Attempt to submit form
    SignupForm.clickSubmitButton();

    // Assert that the user is NOT signed up
    cy.get(SignupForm.signUpSuccessMessage)
      .should('not.contain', 'Submitted Successfully');

    // Assert the user is told that email is invalid
    cy.get(SignupForm.emailErrorMessage).
       should('contain', SignupForm.fieldErrorMessages.get('invalidEmail'));

    // Assert that the error is only displayed once within the form.
    cy.get(SignupForm.signUpForm)
      .find(SignupForm.allErrorMessages)
      .filter(`:contains("${ SignupForm.fieldErrorMessages.get('invalidEmail') }")`)
      .its('length')
      .should('eq', 1);
    });
});