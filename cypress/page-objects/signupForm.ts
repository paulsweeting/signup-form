// signupForm.ts

class SignupForm {
  private firstNameInput: string;
  private lastNameInput: string;
  private emailInput: string;
  private passwordInput: string;
  private submitButton: string;

  constructor() {
    this.firstNameInput = '[data-cy=first-name-input]';
    this.lastNameInput = '[data-cy=last-name-input]';
    this.emailInput = '[data-cy=email-input]';
    this.passwordInput = '[data-cy=password-input]';
    this.submitButton = '[data-cy=submit-button]';
  }

  public visit(): void {
    cy.visit('http://localhost:3000');
  }

  public fillFirstName(firstName: string): void {
    cy.get(this.firstNameInput).type(firstName);
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