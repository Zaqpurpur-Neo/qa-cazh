/*
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

for (const [locale, localization] of Object.entries(localizations)) {
  describe(`Auth Localization for ${locale}`, () => {
    beforeEach(() => {
      // only visit /auth/login if not already there
      cy.visit(`/auth/login`);
      check.isOnLoginPage = true;

      // Language or Bahasa
      cy.contains(locale === "id" ? "Bahasa" : "Language").click();

      const targetLangText = locale === "id" ? "Indonesia" : "English";
      cy.contains(targetLangText).click();
    });

    it("title passes", () => {
      cy.contains("p", localization.title).should("be.visible");
    });

    it("description passes", () => {
      cy.contains("p", localization.description).should("be.visible");
    });
  });
}
