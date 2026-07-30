const userTestingAccount = {
  email: Cypress.env("TESTING_AUTH_EMAIL"),
  password: Cypress.env("TESTING_PASSWORD_EMAIL"),
};

const CREATE_NEW_PASSWORD = false;

const localizationForgetPassword = {
  id: {
    forgotPasswordTitle: "Lupa Password?",
    description:
      "Masukkan email Anda yang terdaftar disitem untuk mengatur ulang password Anda.",
    emailLabel: "Email",
    incorrectEmailFormat: "Format email kamu salah",
    submitButton: "Kirim Password Baru",
    backButton: "Kembali",
    emailMustFilled: "Email Wajib Diisi",
    emailNotFound: "Email tidak terdaftar",
    passwordResetSuccess: "Password baru sudah dikirim ke email kamu",
    passwordResetLimit: "Anda sudah melakukan 3 kali permintaan reset password",
  },
  en: {
    forgotPasswordTitle: "Forgot Password?",
    description:
      "Please enter your registered email address to reset your password.",
    emailLabel: "Email",
    submitButton: "Send New Password",
    incorrectEmailFormat: "Your email format is incorrect",
    backButton: "Back",
    emailMustFilled: "Email is required",
    emailNotFound: "Email Not Registered",
    passwordResetSuccess: "Your new password has been sent to your email",
    passwordResetLimit: "Max 3 forgot password requests per day ",
  },
};

function getNewTestMailPassword() {
  cy.request({
    method: "GET",
    url: `${Cypress.env("TESTMAIL_URL")}`,
    timeout: 30000,
  }).then((response) => {
    expect(response.status).to.eq(200);

    const emails = response.body.emails;
    expect(emails, "Should have received emails").to.have.lengthOf.at.least(1);

    let passwordMatch = null;
    for (const email of emails) {
      const localMatch = email.text.match(/Password\s*:\s*(\S+)/);
      if (
        email.envelope_to.toString() === userTestingAccount.email &&
        localMatch
      ) {
        passwordMatch = localMatch[1];
        break;
      }
    }

    expect(passwordMatch, "Latest password found").to.not.be.null;
    const newPassword = passwordMatch || null;

    let extractedPin = null;
    for (const email of emails) {
      const pinMatch = email.text.match(/PIN\s*:\s*(\S+)/);
      if (
        email.envelope_to.toString() === userTestingAccount.email &&
        pinMatch
      ) {
        extractedPin = pinMatch[1];
        cy.log(`Found PIN in email: ${email.subject}`);
        break; // Stop searching once we find the most recent PIN
      }
    }

    expect(extractedPin, "PIN found across email history").to.not.be.null;

    // make pin optional
    // expect(pinMatch, "PIN should exist in email").to.not.be.null;

    cy.log(`Extracted Password: ${newPassword}`);
    cy.log(`Extracted PIN: ${extractedPin}`);

    Cypress.env("TESTING_PASSWORD_EMAIL", newPassword);
    Cypress.env("TESTING_AUTH_PIN", extractedPin);

    userTestingAccount.password = newPassword;
  });
}

describe("Try Log In", () => {
  if (CREATE_NEW_PASSWORD) {
    it("TEST-ID: AUTH-2.7 | Password berhasil dikirim [id]", () => {
      cy.visit("/auth/forgot-password");
      cy.wait(400);

      cy.get("form")
        .contains("label", localizationForgetPassword.id.emailLabel)
        .should("be.visible")
        .type(userTestingAccount.email);
      cy.wait(400);

      cy.get("form")
        .contains(
          "button",
          new RegExp(`${localizationForgetPassword.id.submitButton}`, "i"),
        )
        .should("be.visible")
        .click();
      cy.wait(100);

      cy.contains(
        `section[aria-label="Notifications alt+T"]`,
        new RegExp(
          `${localizationForgetPassword.id.passwordResetSuccess}|${localizationForgetPassword.id.passwordResetLimit}`,
          "i",
        ),
      ).should("be.visible");

      cy.wait(2000);
    });
  }

  it("TEST-ID: AUTH-2.8 | Check Inbox (TESTMAIL)", () => {
    getNewTestMailPassword();
    cy.wait(4000);
  });

  it("TEST-ID: AUTH-2.9 | Login New Password", () => {
    cy.visit("/auth/login");
    cy.wait(400);

    const newPassword = userTestingAccount.password;

    cy.contains("label", "Email").click().type(userTestingAccount.email);
    cy.wait(400);
    cy.get("input[type='password']").click().type(newPassword);
    cy.wait(400);
    cy.contains("button", "Masuk").click();

    cy.wait(2000);

    cy.url().should("include", "/dashboard");
  });
});
