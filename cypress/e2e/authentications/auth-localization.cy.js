/*
TEST-ID: AUTH-1.2
scenario: Halaman login dibuka dengan bahasa ID — verifikasi seluruh label & wording
expected: Title 'Masuk ke akun anda!', deskripsi 'Isikan alamat email dan password...', label 'Email', 'Password', btn 'Lupa Password', 'Masuk', 'Masuk dengan google', 'Cek Kartu Anggota'

TEST-ID: AUTH-1.3
scenario: Halaman login dibuka dengan bahasa EN — verifikasi seluruh label & wording
expected: Title 'Log in to your account!', deskripsi 'Please enter your email and password...', label 'Email', 'Password', btn 'Forgot Password', 'Login', 'Login using google', 'Check Membership Card'
*/

/*
DATA:

id:
Title 'Masuk ke akun anda!',
deskripsi 'Isikan alamat email dan password...',
label 'Email', 'Password',
btn 'Lupa Password', 'Masuk', 'Masuk dengan google', 'Cek Kartu Anggota'

en:
Title 'Log in to your account!',
deskripsi 'Please enter your email and password...',
label 'Email', 'Password',
btn 'Forgot Password', 'Login', 'Login using google', 'Check Membership Card'
*/

const localizations = {
  id: {
    title: "Masuk ke akun anda !",
    description: "Isikan alamat email dan password...",
    label: {
      email: "Email",
      password: "Password",
    },
    btn: {
      forgotPassword: "Lupa Password",
      login: "Masuk",
      google: "Masuk dengan google",
      membershipCard: "Cek Kartu Anggota",
    },
  },
  en: {
    title: "Log in to your account!",
    description: "Please enter your email and password...",
    label: {
      email: "Email",
      password: "Password",
    },
    btn: {
      forgotPassword: "Forgot Password",
      login: "Login",
      google: "Login using google",
      membershipCard: "Check Membership Card",
    },
  },
};

const check = {
  isOnLoginPage: false,
};

function setDropdown(locale) {
  // const langText = locale === "id" ? "Bahasa" : "Language";
  const langText = "Bahasa";
  cy.contains("button", langText).click();
  const targetLangText = locale === "id" ? "Indonesia" : "English";
  cy.contains("div", targetLangText).click({ force: true });
}

for (const [locale, localization] of Object.entries(localizations)) {
  describe(`Auth Localization for ${locale}`, () => {
    before(() => {
      // only visit /auth/login if not already there
      cy.visit(`/auth/login`);
      check.isOnLoginPage = true;
    });

    it("Localization passes", () => {
      cy.log(`[STEP]: Set language to ${locale}`);
      setDropdown(locale);

      cy.log(`[STEP]: Verify title ${localization.title} is visible`);
      cy.contains("p", localization.title).should(
        "have.text",
        localization.title,
      );

      cy.log(
        `[STEP]: Verify description ${localization.description} is visible`,
      );
      cy.contains("p", localization.description).should(
        "have.text",
        localization.description,
      );

      cy.log(`[STEP]: Verify label`);
      cy.contains("label", localization.label.email).should(
        "have.text",
        localization.label.email,
      );
      cy.contains("label", localization.label.password).should(
        "have.text",
        localization.label.password,
      );

      cy.log(`[STEP]: Verify button`);
      cy.contains("button", localization.btn.forgotPassword).should(
        "have.text",
        localization.btn.forgotPassword,
      );
      cy.contains("button", localization.btn.login).should(
        "have.text",
        localization.btn.login,
      );
      cy.contains("button", localization.btn.google).should(
        "have.text",
        localization.btn.google,
      );
      cy.contains("button", localization.btn.membershipCard).should(
        "have.text",
        localization.btn.membershipCard,
      );
    });
  });
}
