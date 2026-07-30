const userTestingAccount = {
  email: Cypress.env("TESTING_AUTH_EMAIL"),
  password: Cypress.env("TESTING_PASSWORD_EMAIL"),
};

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

describe("Only send forgot password", () => {
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
});
