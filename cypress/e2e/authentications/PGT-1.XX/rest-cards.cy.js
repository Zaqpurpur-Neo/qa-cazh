/*

TEST-ID: AUTH-1.21
scenario: Klik btn 'Cek Kartu Anggota' di halaman login
expected: User diarahkan ke halaman Cek Kartu Anggota

TEST-ID: AUTH-1.22
scenario: Verifikasi konten popup PIN Lemah saat muncul setelah login
expected: Title 'PIN Akun Anda Lemah', deskripsi 'Demi keamanan akun...', btn primary 'Ganti PIN Sekarang', btn secondary 'Nanti Saja'

TEST-ID: AUTH-1.23
scenario: Klik btn 'Ganti PIN Sekarang' di popup PIN Lemah
expected: User diarahkan ke halaman ganti PIN akun

TEST-ID: AUTH-1.24
scenario: Klik btn 'Nanti Saja' di popup PIN Lemah
expected: Popup tertutup, masuk dashboard, muncul banner persistent yang ingetin ganti PIN

TEST-ID: AUTH-1.25
scenario: Setelah klik 'Nanti Saja' → refresh / pindah halaman / navigate ke menu lain
expected: Banner persistent TETAP tampil sampai PIN diganti. Popup TIDAK muncul lagi di session ini

TEST-ID: AUTH-1.26
scenario: Logout lalu login lagi dengan akun yang masih PIN lemah
expected: Popup PIN Lemah muncul lagi (session baru = popup muncul lagi)

TEST-ID: AUTH-1.27
scenario: User berhasil ganti PIN ke kombinasi yang kuat
expected: Banner persistent hilang. Login berikutnya tidak memunculkan popup PIN Lemah lagi

TEST-ID: AUTH-1.28
scenario: Session user expired (timeout / force logout)
expected: Muncul pesan 'Sesi Anda Berakhir. Untuk keamanan akun, silakan login kembali.' dengan warna informatif (biru), bukan warna error

TEST-ID: AUTH-1.29
scenario: Verifikasi wording pesan session expired
expected: Pesan TIDAK mengandung kata 'Error', 'Kesalahan', 'Upss', atau wording yang mengindikasikan kesalahan sistem

*/

const configLocalization = {
  id: {
    btnCheckCard: "Cek Kartu",
  },
  en: {
    btnCheckCard: "Check Card",
  },
};

const userTestingAccount = {
  userId: "6a5eec0263c54300195a6058",
  email: Cypress.env("SECOND_AUTH_EMAIL"),
  password: Cypress.env("SECOND_PASSWORD_EMAIL"),
  pin: 999999, // Cypress.env("SECOND_AUTH_PIN"),
  weakPin: 123456,
};

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

function simpleLogin() {
  cy.visit("/auth/login");
  cy.wait(400);

  cy.contains("label", "Email").click().type(userTestingAccount.email);
  cy.wait(400);
  cy.get("input[type='password']").click().type(userTestingAccount.password);
  cy.wait(400);
  cy.contains("button", "Masuk").click();
}

function injectWeakPin() {
  simpleLogin();
  cy.wait(4000);
  cy.log(`Injecting weak PIN: ${userTestingAccount.weakPin}`);

  cy.request({
    method: "GET",
    url: "/api/proxy/user/me",
  }).then((response) => {
    const body = response.body;
    const userId = body.data.partner_id;
    userTestingAccount.userId = userId;

    cy.log(`User ID: ${userId}`);

    cy.visit("/profile?tab=pin");
    cy.wait(400);

    cy.getCookie("cards_school_csrf_token")
      .should("exist")
      .then((cookie) => {
        cy.log(`CSRF Token: ${cookie.value}`);
      });

    cy.log(`${userTestingAccount.pin}`);

    cy.get(`input[placeholder="Masukan PIN Lama"]`)
      .should("be.visible")
      .type(userTestingAccount.pin);

    cy.wait(2000);

    cy.contains("button", "Cek").should("be.visible").click();

    cy.wait(5000);

    cy.contains("button", "Terverifikasi").should("be.visible");

    cy.get(`input[placeholder="Masukan 6 angka"]`)
      .should("be.visible")
      .type(userTestingAccount.weakPin);

    cy.get(`input[placeholder="Ulangi PIN Baru"]`)
      .should("be.visible")
      .type(userTestingAccount.weakPin);

    cy.wait(800);

    cy.contains("button", "Ganti PIN").should("be.visible");

    cy.wait(400);
  });
}

function injectWeakPinAPI() {
  simpleLogin();
  cy.wait(4000);
  cy.log(`Injecting weak PIN: ${userTestingAccount.weakPin}`);

  cy.request({
    method: "GET",
    url: "/api/proxy/user/me",
  }).then((response) => {
    const body = response.body;
    const userId = userTestingAccount.userId;

    const userIdReal = String(meRes.body.data.id);

    cy.log(`User ID: ${userId}`);

    cy.visit("/profile?tab=pin");
    cy.wait(400);

    cy.log(`${userTestingAccount.pin}`);

    // cy.get(`input[placeholder="Masukan PIN Lama"]`)
    //   .should("be.visible")
    //   .type(userTestingAccount.pin);

    // cy.wait(2000);

    // cy.contains("button", "Cek").should("be.visible").click();

    // cy.wait(4000);

    cy.getCookies().then((cookies) => {
      // Ubah array cookies menjadi object key-value agar mudah diakses
      const cookieMap = {};
      cookies.forEach((c) => {
        cookieMap[c.name] = c.value;
      });

      // Ambil token CSRF dari cookie dan decode URL encoding-nya (%3D -> =)
      const rawCsrfToken = cookieMap["cards_school_csrf_token"] || "";
      const csrfToken = decodeURIComponent(rawCsrfToken);
      const partnerId =
        cookieMap["cards_school_partner_id"] || "6a4c61fecace47001a67a885";

      // 3. Tembak API Change PIN dengan header identik seperti browser asli
      cy.request({
        method: "POST",
        url: "/api/proxy-main/cards-school/user/change-pin",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Origin: "https://v3.cazh.id",
          Referer: "https://v3.cazh.id/profile?tab=pin",
          cards_school_csrf_token: csrfToken,
          "x-partner-id": partnerId,
          "x-domain": "v3.cazh.id",
          "x-device-id": "cards-school-11f85dae-a131-4877-a0e9-fdc10277ce67",
        },
        body: {
          userId: userIdReal,
          oldPin: String(userTestingAccount.pin), // Sesuaikan dengan PIN lama akun
          newPin: String(userTestingAccount.weakPin), // Kirim sebagai STRING "123456"
          confirmNewPin: String(userTestingAccount.weakPin),
        },
        failOnStatusCode: false, // Menangkap response tanpa menghentikan test
      }).then((res) => {
        cy.log("Response Status:", res.status);
        cy.log("Response Body:", JSON.stringify(res.body));

        // expect(res.status).to.eq(200);
      });
    });

    cy.visit("/profile?tab=pin");
    cy.wait(400);

    cy.get(`input[placeholder="Masukan PIN Lama"]`)
      .should("be.visible")
      .type(userTestingAccount.weakPin);

    cy.wait(2000);

    cy.contains("button", "Cek").should("be.visible").click();

    cy.wait(4000);

    cy.contains("button", "Terverifikasi").should("be.visible");
  });
}

describe("TEST-CASE: 1.xx | Rest the test session", () => {
  // before(() => {
  //   getNewTestMailPassword();
  // });

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

  for (const [lang, con] of Object.entries(configLocalization)) {
    it(`TEST-ID: AUTH-1.21 | Klik btn ${con.btnCheckCard}`, () => {
      cy.visit("/auth/login");
      cy.wait(400);

      if (lang !== "id") {
        changeLanguage(lang);
      }

      cy.contains("button", con.btnCheckCard).click();
      cy.wait(400);

      cy.url().should("include", "/card");
      cy.wait(400);
    });
  }

  it.only(`Get api /me`, () => {
    injectWeakPinAPI();
  });

  it(`TEST-ID: AUTH-1.28 | User timeout atau expired`, () => {
    cy.visit("/auth/login");
    cy.wait(1000);

    cy.contains("label", "Email").click().type(userTestingAccount.email);
    cy.get("input[type='password']").click().type(userTestingAccount.password);
    cy.wait(400);
    cy.contains("button", /Masuk|Login/i).click();

    cy.url().should("include", "/dashboard");
    cy.wait(400);

    cy.reload();

    cy.url().should("include", "/dashboard");
    cy.wait(400);
  });
});
