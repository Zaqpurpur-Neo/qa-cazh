Cypress.Commands.add('login', (
  email = Cypress.env('AUTH_EMAIL'),
  password = Cypress.env('PASSWORD_EMAIL')
) => {
  cy.session([email, password], () => {
    cy.visit('/auth/login');
    cy.contains("label", "Email").click().type(email);
    cy.get("input[type='password']").click().type(password);
    cy.contains("button", "Masuk").click();

    cy.url().should("include", "/dashboard");
  });
});

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes("Failed to execute 'removeChild' on 'Node'")) {
    return false;
  }

  return true;
});