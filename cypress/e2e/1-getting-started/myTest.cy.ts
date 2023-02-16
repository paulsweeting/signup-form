/// <reference types="cypress" />

describe("my application", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("displays four labels by default", () => {
    cy.get("label").should("have.length", 4);
  });
});
