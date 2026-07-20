/*
TEST-ID: AUTH-1.4
scenario: Klik Masuk dengan field Email & Password kosong
expected: Muncul 2 error: 'Email wajib diisi' + 'Password wajib diisi'

TEST-ID: AUTH-1.5
scenario: Klik Masuk dengan field Email kosong, Password diisi
expected: Muncul error 'Email wajib diisi' di bawah field email

TEST-ID: AUTH-1.6
scenario: Klik Masuk dengan field Password kosong, Email diisi
expected: Muncul error 'Password wajib diisi' di bawah field password

TEST-ID: AUTH-1.7
scenario: Input email format salah ('user@', 'usergmail.com', '@domain.com') + password apapun
expected: Muncul error 'Format email kamu salah' di bawah field email

TEST-ID: AUTH-1.8
scenario: Input email format valid TAPI tidak terdaftar + password apapun
expected: Muncul error 'Email tidak terdaftar'

TEST-ID: AUTH-1.9
scenario: Input email terdaftar + password SALAH
expected: Muncul error 'Password salah'
*/

const input = {
  email: Cypress.env("AUTH_EMAIL"),
  password: Cypress.env("AUTH_PASSWORD"),
};

// spec: 'user@', 'usergmail.com', '@domain.com'
// return: modified email
function changeEmailToWrongFormat(email) {
  return {
    kind1: {
      emailModified: "@" + email.split("@")[1],
      descriptionTest: "kind1 remove after '@' (e.g. user@domain.com)",
    },
    kind2: {
      emailModified: email.split("@")[0] + "@",
      descriptionTest: "kind2 remove before '@' (e.g. @domain.com)",
    },
    kind3: {
      emailModified: "@" + email.split("@")[1].split(".")[0] + ".",
      descriptionTest: "kind3 remove before '@' and after '.' (e.g. @domain.)",
    },
    kind4: {
      // remove after '.' (e.g. user@domain)
      emailModified: email.split(".").slice(0, -1).join(""),
      descriptionTest: "kind4 remove after '.' (e.g. user@domain)",
    },

    kind5: {
      descriptionTest: "kind5 remove '@' symbol",
    },
  };
}

describe("User Input Validation", () => {
  const emailModifieds = changeEmailToWrongFormat(input.email);

  beforeEach(() => {
    cy.visit("/auth/login");
  });

  it("Email & Password Kosong", () => {
    // expected: Muncul 2 error: 'Email wajib diisi' + 'Password wajib diisi'
    cy.contains("button", "Masuk").click();
    cy.contains("div[data-slot='form-message']", "Email wajib diisi").should(
      "be.visible",
    );
    cy.contains("div[data-slot='form-message']", "Password wajib diisi").should(
      "be.visible",
    );
  });

  it("Email Kosong & Password Diisi", () => {
    // expected: Muncul error 'Format email kamu salah' di bawah field email
    cy.get("input[type='password']").click().type(input.password);
    cy.contains("button", "Masuk").click();
    cy.contains("div[data-slot='form-message']", "Email wajib diisi").should(
      "be.visible",
    );
  });

  it("Email Diisi & Password Kosong", () => {
    // expected: Muncul error 'Password wajib diisi' di bawah field password
    cy.contains("label", "Email").click().type(input.email);
    cy.contains("button", "Masuk").click();
    cy.contains("div[data-slot='form-message']", "Password wajib diisi").should(
      "be.visible",
    );
  });

  for (const [kind, emailModified] of Object.entries(emailModifieds)) {
    it(`Format Email salah [kind: ${kind}]`, () => {
      // expected: Muncul error 'Format email kamu salah' di bawah field email
      cy.contains("label", "Email").click().type(emailModified.emailModified);
      cy.contains("button", "Masuk").click();
      cy.contains(
        "div[data-slot='form-message']",
        "Format email kamu salah",
      ).should("be.visible");
    });
  }
});
