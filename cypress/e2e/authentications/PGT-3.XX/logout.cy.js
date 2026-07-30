/*
TEST-ID: AUTH-3.1
scenario: Admin sudah login → klik icon Profile di header/sidebar
expected: Muncul menu/dropdown profile yang berisi tombol Keluar

TEST-ID: AUTH-3.2
scenario: Verifikasi wording tombol logout di menu profile (ID & EN)
expected: Wording tombol — ID: 'Keluar', EN: 'Logout'

TEST-ID: AUTH-3.3
scenario: Klik tombol 'Keluar' di menu profile
expected: Sistem redirect ke halaman login Cards School

TEST-ID: AUTH-3.4
scenario: Setelah logout, akses URL dashboard langsung (paste URL ke address bar)
expected: Session ter-clear, sistem redirect ke halaman login

TEST-ID: AUTH-3.5
scenario: Setelah logout, klik tombol Back browser
expected: Tidak bisa kembali ke dashboard. Tetap di halaman login
*/

const localizations = [
  {
    lang: "id",
    switchLanguageBtnSelector: "Bahasa",
    changeInto: "Indonesia",
    logoutText: "Keluar",
  },
  {
    lang: "en",
    switchLanguageBtnSelector: "Bahasa",
    changeInto: "English",
    logoutText: "Logout",
  },
];

function openProfileDropdown() {
  cy.get(`img[alt="User Avatar"][type="button"][aria-haspopup="menu"]`)
    .should("be.visible")
    .click();

  cy.wait(1000);
  cy.get(`div[data-slot="dropdown-menu-content"][data-state="open"]`).should(
    "be.visible",
  );
}

function changeLanguage(localization) {
  openProfileDropdown();

  cy.get(`div[data-slot="dropdown-menu-content"][data-state="open"]`)
    .contains(
      `div[role="menuitem"][aria-haspopup="menu"]`,
      localization.switchLanguageBtnSelector,
    )
    .click();
  cy.wait(500);

  cy.get(`div[data-slot="dropdown-menu-content"][data-state="open"]`)
    .contains(
      `div[role="menuitemradio"][data-slot="dropdown-menu-radio-item"]`,
      localization.changeInto,
    )
    .click();

  cy.wait(500);
}

describe("TEST-CASE: 3.xx | Logout Validation", () => {
  beforeEach(() => {
    cy.on("uncaught:exception", (err, runnable) => {
      if (
        err.message.includes(
          "ResizeObserver loop completed with undelivered notifications",
        ) ||
        err.message.includes("ResizeObserver loop limit exceeded")
      ) {
        return false; // Prevents Cypress from failing the test
      }

      return true;
    });
    cy.login();
    cy.visit("/dashboard");
  });

  it("Dashboard after login", () => {
    cy.url().should("include", "/dashboard");
  });

  it("TEST-ID: AUTH-3.1 | Muncul menu profile dengan tombol keluar", () => {
    openProfileDropdown();
    cy.get(`div[data-slot="dropdown-menu-content"][data-state="open"] `)
      .contains(`button`, "Keluar")
      .should("be.visible");
  });

  for (const localization of localizations) {
    it(`TEST-ID: AUTH-3.2 | Logout button text is "${localization.logoutText}"`, () => {
      changeLanguage(localization);

      openProfileDropdown();
      cy.get(`div[data-slot="dropdown-menu-content"][data-state="open"] `)
        .contains(`button`, localization.logoutText)
        .should("be.visible");
    });
  }

  it("TEST-ID: AUTH-3.3 | Redirect ke halaman login setelah logout", () => {
    openProfileDropdown();
    cy.get(`div[data-slot="dropdown-menu-content"][data-state="open"] `)
      .contains(`button`, "Keluar")
      .click();
    cy.url().should("include", "/auth/login");
  });

  it("TEST-ID: AUTH-3.4 | Tetap redirect ke halaman login setelah logout", () => {
    openProfileDropdown();
    cy.get(`div[data-slot="dropdown-menu-content"][data-state="open"] `)
      .contains(`button`, "Keluar")
      .click();

    cy.wait(500);
    cy.visit("/dashboard");
    cy.wait(800);
    cy.url().should("include", "/auth/login");
  });

  it("TEST-ID: AUTH-3.5 | Redirect ke login meski menggunakan back button", () => {
    openProfileDropdown();
    cy.get(`div[data-slot="dropdown-menu-content"][data-state="open"] `)
      .contains(`button`, "Keluar")
      .click();

    cy.wait(1000);
    cy.go("back");
    cy.wait(1000);
    // cy.url().should("include", "/auth/login");

    cy.url().then((url) => {
      expect(url).to.include("/auth/login");
    });
  });
});
