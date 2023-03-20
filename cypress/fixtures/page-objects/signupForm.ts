// signupForm.ts

class SignupForm {
  constructor() {
    this.signUpForm = '[data-cy=sign-up-form]';

    this.firstNameInput = '[data-cy=first-name-input]';
    this.lastNameInput = '[data-cy=last-name-input]';
    this.emailInput = '[data-cy=email-input]';
    this.passwordInput = '[data-cy=password-input]';
    this.submitButton = '[data-cy=submit-button]';

    this.allErrorMessages = '[data-cy$=-error-message]';
    this.firstNameErrorMessage = '[data-cy=first-name-error-message]';
    this.lastNameErrorMessage = '[data-cy=last-name-error-message]';
    this.emailErrorMessage = '[data-cy=email-error-message]';
    this.passwordErrorMessage = '[data-cy=password-error-message]'

    this.signUpMessage = 'h1';
    this.signUpSuccessText = 'Submitted Successfully';

    this.fieldErrorText = new Map<string, string>([
        ['required', 'Required'],
        ['minLength', 'Too Short!'],
        ['maxLength', 'Too Long!'],
        ['invalidEmail', 'Invalid email'],
     ]);
  }

  public visit(): void {
    //TODO - Use environment variables
    cy.visit('http://localhost:3000');
  }

  public fillFirstName(firstName: string): void {
    cy.get(this.firstNameInput).type(firstName);
  }

  public clickFirstName(): void {
      cy.get(this.firstNameInput).click();
    }

  public fillLastName(lastName: string): void {
    cy.get(this.lastNameInput).type(lastName);
  }

  public fillEmail(email: string): void {
    cy.get(this.emailInput).type(email);
  }

  public fillPassword(password: string): void {
    cy.get(this.passwordInput).type(password);
  }

  public clickSubmitButton(): void {
    cy.get(this.submitButton).click();
  }

  public submitForm(firstName: string, lastName: string, email: string, password: string): void {
    this.fillFirstName(firstName);
    this.fillLastName(lastName);
    this.fillEmail(email);
    this.fillPassword(password);
    this.clickSubmitButton();
  }
}

export default new SignupForm();