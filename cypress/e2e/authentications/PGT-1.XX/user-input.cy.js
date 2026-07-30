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
  password: Cypress.env("PASSWORD_EMAIL"),
};

const unregisteredEmail = {
  email: "unregisteredemail12@gmail.com",
  password: "dummy_somerandompassword",
};

const correctEmailWrongPassword = {
  email: Cypress.env("AUTH_EMAIL"),
  password: "dummy_somerandompassword",
};

const localization = {
  id: {
    emailMustNotEmpty: "Email wajib diisi",
    passwordMustNotEmpty: "Password wajib diisi",
    incorrectEmailFormat: "Format email kamu salah",
    btnLoginText: "Masuk",

    missmatchCredentials: "Identitas tersebut tidak cocok dengan data kami",
  },
  en: {
    emailMustNotEmpty: "Email is required",
    passwordMustNotEmpty: "Password is required",
    incorrectEmailFormat: "Your email format is incorrect",
    btnLoginText: "Login",

    missmatchCredentials: "Your credentials do not match our records",
  },
};

function changeLanguage(locale) {
  const langText = "Bahasa";
  cy.contains("button", langText).click();
  cy.wait(800);
  const targetLangText = locale === "id" ? "Indonesia" : "English";
  cy.contains("div", targetLangText).click({ force: true });
  cy.wait(800);
}

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
      emailModified: email.split(".").slice(0, -1).join(""),
      descriptionTest: "kind4 remove after '.' (e.g. user@domain)",
    },

    kind5: {
      emailModified: email.replace("@", ""),
      descriptionTest: "kind5 remove '@' symbol",
    },
  };
}

for (const [lang, messages] of Object.entries(localization)) {
  describe(`TEST-CASE: 1.xx | User Input Validation [${lang}]`, () => {
    const emailModifieds = changeEmailToWrongFormat(input.email);

    beforeEach(() => {
      cy.on("uncaught:exception", (err, runnable) => {
        if (
          err.message.includes(
            "ResizeObserver loop completed with undelivered notifications",
          ) ||
          err.message.includes("ResizeObserver loop limit exceeded")
        ) {
          return false;
        }

        return true;
      });

      cy.visit("/auth/login");
      changeLanguage(lang);
    });

    it("TEST-ID: AUTH-1.4 | Email & Password Kosong", () => {
      cy.contains("button", messages.btnLoginText).click();
      cy.wait(1000);
      cy.contains(
        "div[data-slot='form-message']",
        messages.emailMustNotEmpty,
      ).should("be.visible");

      cy.contains(
        "div[data-slot='form-message']",
        messages.passwordMustNotEmpty,
      ).should("be.visible");
    });

    it("TEST-ID: AUTH-1.5 | Email Kosong & Password Diisi", () => {
      cy.get("input[type='password']").click().type(input.password);
      cy.contains("button", messages.btnLoginText).click();
      cy.wait(1000);
      cy.contains(
        "div[data-slot='form-message']",
        messages.emailMustNotEmpty,
      ).should("be.visible");
    });

    it("TEST-ID: AUTH-1.6 | Email Diisi & Password Kosong", () => {
      cy.contains("label", "Email").click().type(input.email);
      cy.contains("button", messages.btnLoginText).click();
      cy.wait(1000);
      cy.contains(
        "div[data-slot='form-message']",
        messages.passwordMustNotEmpty,
      ).should("be.visible");
    });

    for (const [kind, emailModified] of Object.entries(emailModifieds)) {
      it(`TEST-ID: AUTH-1.7 | Format Email salah [kind: ${kind}]\ndesc: ${emailModified.descriptionTest}`, () => {
        cy.contains("label", "Email").click().type(emailModified.emailModified);
        cy.wait(1000);

        cy.contains("button", messages.btnLoginText).click();
        cy.wait(1000);

        cy.contains(
          "div[data-slot='form-message']",
          messages.incorrectEmailFormat,
        ).should("be.visible");
      });
    }

    it("TEST-ID: AUTH-1.8 | Identitas tidak cocok", () => {
      cy.contains("label", "Email").click().type(unregisteredEmail.email);
      cy.get("input[type='password']").click().type(unregisteredEmail.password);
      cy.contains("button", messages.btnLoginText).click();
      cy.wait(1000);

      cy.contains(
        "section[aria-label='Notifications alt+T']",
        messages.missmatchCredentials,
      ).should("be.visible");
    });

    it("TEST-ID: AUTH-1.9 | Email terdafter tapi password salah", () => {
      cy.contains("label", "Email")
        .click()
        .type(correctEmailWrongPassword.email);
      cy.get("input[type='password']")
        .click()
        .type(correctEmailWrongPassword.password);
      cy.contains("button", messages.btnLoginText).click();
      cy.wait(1000);

      cy.contains(
        "section[aria-label='Notifications alt+T']",
        messages.missmatchCredentials,
      ).should("be.visible");
    });
  });
}
