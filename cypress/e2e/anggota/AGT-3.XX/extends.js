export const configAcademicStaff = {
  path: "/member/staff",
  loginPath: "/auth/login",
  userTestingAccount: {
    userId: "6a5eec0263c54300195a6058",
    email: Cypress.env("SECOND_AUTH_EMAIL"),
    password: Cypress.env("SECOND_PASSWORD_EMAIL"),
    pin: 999999, // Cypress.env("SECOND_AUTH_PIN"),
  },
};

export function buttonDropdownSelect(
  message = "Filter",
  optionSelect = "Semua",
  firstItemIndicator = "Semua",
) {
  buttonClick(message);

  return cy
    .get(`div[data-radix-popper-content-wrapper]`)
    .last()
    .should("contain.text", firstItemIndicator)
    .should("be.visible")
    .contains("div[role='option']", optionSelect)
    .should("be.visible")
    .click({ force: true });
}

export function simpleFillFormField(find, type, value) {
  cy.contains("label", find)
    .should("be.visible")
    .closest('[data-slot="form-item"]')
    .find(type)
    .then(($el) => {
      if (type === "select") {
        cy.wrap($el).select(value, { force: true });
      } else {
        if (value.length <= 0) {
          cy.wrap($el).clear();
        } else {
          cy.wrap($el).clear().type(value, { force: true });
        }
      }
    });
}

export function buttonClick(message = "Simpan") {
  cy.wait(800);
  cy.contains("button", message).click();
}

export function checkNotificationOpen(message = "") {
  cy.contains("section[aria-label='Notifications alt+T']", message).should(
    "be.visible",
  );
}

export function _localLoginSession() {
  cy.session(
    [
      configMapel.userTestingAccount.email,
      configMapel.userTestingAccount.password,
    ],
    () => {
      cy.visit(configMapel.loginPath);

      cy.wait(400);
      cy.contains("label", "Email")
        .click()
        .type(configMapel.userTestingAccount.email);
      cy.wait(400);
      cy.get("input[type='password']")
        .click()
        .type(configMapel.userTestingAccount.password);
      cy.wait(400);
      cy.contains("button", "Masuk").click();

      cy.url().should("not.include", configMapel.loginPath);
    },
  );
}

export function uncaughtHandle() {
  const messageList = [
    "ResizeObserver loop completed with undelivered notifications",
    "ResizeObserver loop limit exceeded",
    "Failed to execute 'removeChild' on 'Node'",
  ];
  cy.on("uncaught:exception", (err, runnable) => {
    if (messageList.some((message) => err.message.includes(message))) {
      return false;
    }

    return true;
  });
}

export function waitUntilLoadingAnimationGone() {
  return cy.get("body").then(($body) => {
    return cy
      .get("tr .animate-pulse", { timeout: 12000 })
      .should("not.exist")
      .then(() => {
        return cy
          .get("tr .animate-pulse", { timeout: 12000 })
          .should("not.exist")
          .then(() => {
            return cy.wrap($body);
          });
      });
  });
}

export function openTambahMapel() {
  cy.get("button:contains('Tambah Mata Pelajaran')")
    .should("be.visible")
    .click();

  cy.wait(400);
  cy.get("div[role='dialog']:contains('Tambah Mata Pelajaran')", {
    timeout: 12000,
  }).should("be.visible");
}

export function dialogShouldClose() {
  cy.get("div[role='dialog']").should("not.exist");
}

export function deleteSimpleFill(kodeMapel, instansi) {
  const target = kodeMapel;

  return waitUntilLoadingAnimationGone().then(($body) => {
    const found =
      $body.find(`tr:contains(${target}):contains(${instansi})`).length > 0;

    if (found) {
      cy.wait(800);
      cy.get(`tr:contains(${target}):contains(${instansi})`)
        .find("svg.lucide-trash")
        .closest("button")
        .click();
      cy.wait(800);
      cy.get("div[role='dialog']:contains('Hapus Mata Pelajaran')", {
        timeout: 12000,
      }).should("be.visible");
      cy.wait(600);
      cy.contains("button", "Hapus").should("be.visible").click();
      cy.wait(800);
      cy.contains(
        "section[aria-label='Notifications alt+T']",
        "Mata pelajaran berhasil dihapus",
      ).should("be.visible");
      cy.log(`Found and clicked trash button for ${target}`);
    } else {
      cy.log(`No trash button found for ${target}`);
    }

    // this is what the caller's .then() receives
    return cy.wrap(found);
  });
}

export function deleteSimpleFillWithNamaMapel(namaMapel, instansi) {
  const target = namaMapel;

  return waitUntilLoadingAnimationGone().then(($body) => {
    const found =
      $body.find(`tr:contains(${target}):contains(${instansi})`).length > 0;

    if (found) {
      cy.wait(800);
      cy.get(`tr:contains(${target}):contains(${instansi})`)
        .find("svg.lucide-trash")
        .closest("button")
        .click();
      cy.wait(800);
      cy.get("div[role='dialog']:contains('Hapus Mata Pelajaran')", {
        timeout: 12000,
      }).should("be.visible");
      cy.wait(600);
      cy.contains("button", "Hapus").should("be.visible").click();
      cy.wait(800);
      cy.contains(
        "section[aria-label='Notifications alt+T']",
        "Mata pelajaran berhasil dihapus",
      ).should("be.visible");
      cy.log(`Found and clicked trash button for ${target}`);
    } else {
      cy.log(`No trash button found for ${target}`);
    }

    // this is what the caller's .then() receives
    return cy.wrap(found);
  });
}

export function deleteSimpleFillCancel(kodeMapel, instansi, withEsc = false) {
  const target = kodeMapel;

  return waitUntilLoadingAnimationGone().then(($body) => {
    const found =
      $body.find(`tr:contains(${target}):contains(${instansi})`).length > 0;

    if (found) {
      cy.wait(800);
      cy.get(`tr:contains(${target}):contains(${instansi})`)
        .find("svg.lucide-trash")
        .closest("button")
        .click();
      cy.wait(800);
      cy.contains("div[role='dialog']", "Hapus Mata Pelajaran").should(
        "be.visible",
      );
      cy.wait(600);
      if (withEsc) {
        cy.press("Escape");
      } else {
        cy.contains("button", "Batal").should("be.visible").click();
      }
      cy.log(`Found and clicked cancel button for ${target}`);
    } else {
      cy.log(`No cancel button found for ${target}`);
    }

    return cy.wrap(found);
  });
}

export function forEachWrap(array = [], callback = (item, index = 0) => {}) {
  cy.wrap(array).each((item, index) => {
    cy.then(() => {
      callback(item, index);
    });
  });
}

export function errorFormMessage(msg = "") {
  cy.get("div[data-slot='form-message']").contains(msg);
}

export function forLoopWrap(
  rangeStart = 0,
  rangeEnd = 0,
  callback = (item, index = 0) => {},
) {
  const ext = Array.from(
    { length: rangeEnd - rangeStart + 1 },
    (_, idx) => idx + rangeStart,
  );
  cy.wrap(ext).each((item, index) => {
    cy.then(() => {
      callback(item, index);
    });
  });
}

export function isItemExist(kodeMapelAtauNamaMapel, instansi) {
  return (
    cy.get(`tr:contains(${kodeMapelAtauNamaMapel}):contains(${instansi})`, {
      timeout: 12000,
    }).length > 0
  );
}

export function id(id) {
  return `TEST-ID: ${id}`;
}

export function name(name) {
  return `TEST-NAME: ${name}`;
}

export function group(idStart, idEnd) {
  return `TEST-GROUP: ${idStart}-${idEnd}`;
}
