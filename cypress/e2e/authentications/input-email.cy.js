const input = {
  email: Cypress.env("AUTH_EMAIL"),
  password: Cypress.env("AUTH_PASSWORD"),
};

describe("Input Email", () => {
  it("Login with valid credentials", () => {
    cy.visit("/auth/login");

    cy.contains("label", "Email").click().type(input.email);
    cy.get("input[type='password']").click().type(input.password);
    cy.contains("button", "Masuk").click();

    cy.wait(2000);

    cy.url().should("include", "/dashboard");
    cy.contains("h1", "Dashboard").should("be.visible");
  });
});
