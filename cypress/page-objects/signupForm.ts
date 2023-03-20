// signupForm.ts

class SignupForm {
  public firstNameInput: string;
  public firstNameErrorMessage: string;
  public lastNameInput: string;
  public emailInput: string;
  public passwordInput: string;
  public submitButton: string;
  public signUpSuccessMessage: string;

  constructor() {
    this.firstNameInput = '[data-cy=first-name-input]';
    this.firstNameErrorMessage = '[data-cy=first-name-error-message]';
    this.lastNameInput = '[data-cy=last-name-input]';
    this.lastNameErrorMessage = '[data-cy=last-name-error-message]';
    this.emailInput = '[data-cy=email-input]';
    this.emailErrorMessage = '[data-cy=email-error-message]';
    this.passwordInput = '[data-cy=password-input]';
    this.passwordErrorMessage = '[data-cy=password-error-message]'
    this.submitButton = '[data-cy=submit-button]';
    this.signUpSuccessMessage = 'h1';
    this.signUpForm = '[data-cy=sign-up-form]';
    this.allErrorMessages = '[data-cy$=-error-message]';
  }

  public visit(): void {
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