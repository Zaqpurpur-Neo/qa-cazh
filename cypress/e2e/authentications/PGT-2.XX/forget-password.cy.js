/*

TEST-ID: AUTH-2.1
scenario: User klik btn 'Lupa Password' di halaman login
expected: Halaman forgot password tampil dengan semua elemen: title, deskripsi, field Email, btn Kembali, btn Kirim Password Baru

TEST-ID: AUTH-2.2
scenario: Halaman lupa password dibuka dengan bahasa ID — verifikasi seluruh label & wording
expected: Title 'Lupa Password?', deskripsi 'Masukkan email Anda yang terdaftar disitem untuk mengatur ulang password Anda.', label 'Email', btn 'Kembali', btn 'Kirim Password Baru'

TEST-ID: AUTH-2.3
scenario: Halaman lupa password dibuka dengan bahasa EN — verifikasi seluruh label & wording
expected: Title 'Forgot Password?', deskripsi 'Please enter your registered email address to reset your password.', label 'Email', btn 'Back', btn 'Sent New Password'

TEST-ID: AUTH-2.4
scenario: Klik 'Kirim Password Baru' dengan field Email kosong
expected: Muncul error required di bawah field email (field email wajib diisi)

TEST-ID: AUTH-2.5
scenario: Input email format salah ('user@', 'usergmail.com', '@domain.com') → klik 'Kirim Password Baru'
expected: Muncul error 'Format email kamu salah' di bawah field email

TEST-ID: AUTH-2.6
scenario: Input email format valid TAPI tidak terdaftar di sistem → klik 'Kirim Password Baru'
expected: Muncul pesan error 'Email tidak terdaftar' (EN: 'Email Not Registered')

TEST-ID: AUTH-2.7
scenario: Input email format valid DAN terdaftar di sistem → klik 'Kirim Password Baru'
expected: Muncul pesan sukses 'Password baru sudah dikirim ke email kamu' (EN: 'Your new password has been sent to your email')

TEST-ID: AUTH-2.8
scenario: Cek inbox email user setelah submit lupa password berhasil
expected: Email berisi password baru yang ter-generate otomatis oleh sistem (bukan input user) masuk ke inbox user

TEST-ID: AUTH-2.9
scenario: Login pakai password baru yang dikirim ke email
expected: Berhasil login dengan password baru tersebut

TEST-ID: AUTH-2.10
scenario: Klik btn 'Kembali' di halaman lupa password
expected: User diarahkan kembali ke halaman login

*/

const CREATE_NEW_PASSWORD = false;

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
    emailMustFilled: "Email is required",userTestingAccount
    emailNotFound: "Email Not Registered",
    passwordResetSuccess: "Your new password has been sent to your email",
    passwordResetLimit: "Max 3 forgot password requests per day ",
  },
};

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

function changeLanguage(locale) {
  const langText = "Bahasa";
  cy.contains("button", langText).click();
  cy.wait(800);
  const targetLangText = locale === "id" ? "Indonesia" : "English";
  cy.contains("div", targetLangText).click({ force: true });
  cy.wait(800);
}

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

describe("TEST-CASE: 2.xx | Forget Password", () => {
  const emailModifieds = changeEmailToWrongFormat(userTestingAccount.email);

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

  it("TEST-ID: AUTH-2.1 | Halaman lupa password valid dari user click", () => {
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

  it("TEST-ID: AUTH-2.2 | ID localization", () => {
    cy.visit("/auth/forgot-password");
    cy.wait(400);

    cy.contains("p", localizationForgetPassword.id.forgotPasswordTitle).should(
      "be.visible",
    );
    cy.wait(400);

    cy.contains("p", localizationForgetPassword.id.description).should(
      "be.visible",
    );
    cy.wait(400);

    cy.get("form")
      .contains("label", localizationForgetPassword.id.emailLabel)
      .should("be.visible");
    cy.wait(400);

    cy.get("form")
      .contains("button", localizationForgetPassword.id.submitButton)
      .should("be.visible");
    cy.wait(400);

    cy.get("form")
      .contains("button", localizationForgetPassword.id.backButton)
      .should("be.visible");
    cy.wait(400);
  });

  it("TEST-ID: AUTH-2.3 | EN Localization", () => {
    cy.visit("/auth/forgot-password");
    cy.wait(400);

    changeLanguage("en");
    cy.wait(400);

    cy.contains("p", localizationForgetPassword.en.forgotPasswordTitle).should(
      "be.visible",
    );
    cy.wait(400);

    cy.contains("p", localizationForgetPassword.en.description).should(
      "be.visible",
    );
    cy.wait(400);

    cy.get("form")
      .contains("label", localizationForgetPassword.en.emailLabel)
      .should("be.visible");
    cy.wait(400);

    cy.get("form")
      .contains("button", localizationForgetPassword.en.submitButton)
      .should("be.visible");
    cy.wait(400);

    cy.get("form")
      .contains("button", localizationForgetPassword.en.backButton)
      .should("be.visible");
    cy.wait(400);
  });

  it("TEST-ID: AUTH-2.4 | Kirim Password Baru email kosong", () => {
    cy.visit("/auth/forgot-password");
    cy.wait(400);

    cy.get("form")
      .contains(
        "button",
        new RegExp(
          `${localizationForgetPassword.id.submitButton}|${localizationForgetPassword.en.submitButton}`,
          "i",
        ),
      )
      .should("be.visible")
      .click();
    cy.wait(400);

    cy.contains(
      `div[data-slot="form-message"]`,
      new RegExp(
        `${localizationForgetPassword.id.emailMustFilled}|${localizationForgetPassword.en.emailMustFilled}`,
        "i",
      ),
    ).should("be.visible");
  });

  for (const [kind, emailModified] of Object.entries(emailModifieds)) {
    it(`TEST-ID: AUTH-2.5 | Format email salah ${kind}`, () => {
      cy.visit("/auth/forgot-password");
      cy.wait(400);

      cy.get("form")
        .contains("label", localizationForgetPassword.id.emailLabel)
        .should("be.visible")
        .type(emailModified.emailModified);
      cy.wait(400);

      cy.get("form")
        .contains(
          "button",
          new RegExp(
            `${localizationForgetPassword.id.submitButton}|${localizationForgetPassword.en.submitButton}`,
            "i",
          ),
        )
        .should("be.visible")
        .click();
      cy.wait(400);

      cy.contains(
        `div[data-slot="form-message"]`,
        new RegExp(
          `${localizationForgetPassword.id.incorrectEmailFormat}|${localizationForgetPassword.en.incorrectEmailFormat}`,
          "i",
        ),
      ).should("be.visible");
    });
  }

  it("TEST-ID: AUTH-2.6 | Email tidak terdaftar [id]", () => {
    cy.visit("/auth/forgot-password");
    cy.wait(400);

    cy.get("form")
      .contains("label", localizationForgetPassword.id.emailLabel)
      .should("be.visible")
      .type(unregisteredEmail.email);
    cy.wait(400);

    cy.get("form")
      .contains(
        "button",
        new RegExp(
          `${localizationForgetPassword.id.submitButton}|${localizationForgetPassword.en.submitButton}`,
          "i",
        ),
      )
      .should("be.visible")
      .click();
    cy.wait(100);

    cy.contains(
      `section[aria-label="Notifications alt+T"]`,
      localizationForgetPassword.id.emailNotFound,
    ).should("be.visible");
  });

  it("TEST-ID: AUTH-2.6 | Email tidak terdaftar [en]", () => {
    cy.visit("/auth/forgot-password");
    cy.wait(400);

    changeLanguage("en");

    cy.wait(400);

    cy.get("form")
      .contains("label", localizationForgetPassword.en.emailLabel)
      .should("be.visible")
      .type(unregisteredEmail.email);
    cy.wait(400);

    cy.get("form")
      .contains(
        "button",
        new RegExp(
          `${localizationForgetPassword.id.submitButton}|${localizationForgetPassword.en.submitButton}`,
          "i",
        ),
      )
      .should("be.visible")
      .click();
    cy.wait(100);

    cy.contains(
      `section[aria-label="Notifications alt+T"]`,
      localizationForgetPassword.en.emailNotFound,
    ).should("be.visible");
  });

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

    it("TEST-ID: AUTH-2.7 | Password berhasil dikirim [en]", () => {
      cy.visit("/auth/forgot-password");
      cy.wait(400);

      changeLanguage("en");
      cy.wait(800);

      cy.get("form")
        .contains("label", localizationForgetPassword.en.emailLabel)
        .should("be.visible")
        .type(userTestingAccount.email);
      cy.wait(400);

      cy.get("form")
        .contains(
          "button",
          new RegExp(`${localizationForgetPassword.en.submitButton}`, "i"),
        )
        .should("be.visible")
        .click();
      cy.wait(100);

      cy.contains(
        `section[aria-label="Notifications alt+T"]`,
        new RegExp(
          `${localizationForgetPassword.en.passwordResetSuccess}|${localizationForgetPassword.en.passwordResetLimit}`,
          "i",
        ),
      ).should("be.visible");

      cy.wait(2000);
    });
  } else {
    it("TEST-ID: AUTH-2.7 | Skipped test because CREATE_NEW_PASSWORD is false", () => {
      cy.visit("/auth/forgot-password");
      cy.wait(400);

      cy.url().should("include", "/auth/forgot-password");
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

  it("TEST-ID: AUTH-2.10 | Button kembali di lupa password", () => {
    cy.visit("/auth/login");
    cy.wait(400);

    cy.contains(
      "a",
      new RegExp(
        `${localizationForgetPassword.en.forgotPasswordTitle}|${localizationForgetPassword.id.forgotPasswordTitle}`,
        "i",
      ),
    ).click();
    cy.wait(800);
    cy.contains(
      "button",
      new RegExp(
        `${localizationForgetPassword.en.backButton}|${localizationForgetPassword.id.backButton}`,
        "i",
      ),
    ).click();

    cy.wait(800);
    cy.url().should("include", "/auth/login");
  });
});
