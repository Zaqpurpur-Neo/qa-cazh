/*

TEST-ID: AUTH-1.10
scenario: Login kredensial valid, akun TANPA 2FA aktif, PIN kuat
expected: Langsung redirect ke halaman dashboard Cards School tanpa popup

TEST-ID: AUTH-1.11
scenario: Login kredensial valid, akun TANPA 2FA aktif, PIN LEMAH
expected: Setelah login berhasil, muncul popup PIN Lemah dulu, baru masuk dashboard

TEST-ID: AUTH-1.12
scenario: Login kredensial valid, akun DENGAN 2FA aktif
expected: Setelah submit, sistem menampilkan step Verifikasi Keamanan Ganda (input 6-digit code)

TEST-ID: AUTH-1.13
scenario: Login valid + 2FA aktif + PIN lemah — verifikasi urutan flow
expected: Urutan: Auth → step 2FA → Popup PIN Lemah → Dashboard. Popup PIN Lemah TIDAK muncul sebelum 2FA selesai

TEST-ID: AUTH-1.14
scenario: Login dengan akun terdaftar global TAPI bukan member di Cards School site yang sedang diakses
expected: Login ditolak dengan pesan 'Akun Anda tidak terdaftar di Cards School ini.'

TEST-ID: AUTH-1.15
scenario: Klik btn 'Lupa Password' di halaman login
expected: User diarahkan ke halaman Lupa Password

*/

const userTestingAccount = {
  email: Cypress.env("TESTING_AUTH_EMAIL"),
  password: Cypress.env("TESTING_PASSWORD_EMAIL"),
};

const unregisteredEmail = {
  email: "unregisteredemail12@gmail.com",
  password: "dummy_somerandompassword",
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

describe("TEST-CASE: 1.xx | PIN 2FA", () => {
  before(() => {
    getNewTestMailPassword();
  });

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
  });

  it("TEST-ID: AUTH-1.10 | Login kredensial valid, akun TANPA 2FA aktif, PIN kuat", () => {
    cy.visit("/auth/login");
    cy.wait(1000);

    cy.contains("label", "Email").click().type(userTestingAccount.email);
    cy.get("input[type='password']").click().type(userTestingAccount.password);
    cy.wait(400);
    cy.contains("button", "Masuk").click();

    cy.wait(2000);

    cy.url().should("include", "/dashboard");
    cy.contains("h1", "Dashboard").should("be.visible");
  });

  it("TEST-ID: AUTH-1.15 | Klik btn 'Lupa Password' di halaman login", () => {
    cy.visit("/auth/login");
    cy.wait(1000);

    cy.contains(
      "a",
      new RegExp(
        `${localizationForgetPassword.id.forgotPasswordTitle}|${localizationForgetPassword.en.forgotPasswordTitle}`,
        "i",
      ),
    ).should("be.visible");
    cy.contains(
      "a",
      new RegExp(
        `${localizationForgetPassword.id.forgotPasswordTitle}|${localizationForgetPassword.en.forgotPasswordTitle}`,
        "i",
      ),
    ).click();
    cy.wait(1000);

    cy.url().should("include", "/auth/forgot-password");
    cy.wait(400);
  });
});
