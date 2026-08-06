const config = {
  path: "setting/academic/tag",
  loginPath: "/auth/login",
  userTestingAccount: {
    userId: "6a5eec0263c54300195a6058",
    email: Cypress.env("SECOND_AUTH_EMAIL"),
    password: Cypress.env("SECOND_PASSWORD_EMAIL"),
    pin: 999999, // Cypress.env("SECOND_AUTH_PIN"),
  },

  dialogErrorMessages: {
    instansiRequired: "Instansi wajib diisi",
    namaTagRequired: "Nama Tag wajib diisi",
    kodeTagRequired: "Kode Tag wajib diisi",
    tipeAnggotaRequired: "Tipe Anggota wajib diisi",
    statusRequired: "Status wajib diisi",
  },

  misc: {
    tipeAnggotaDisplayName: ["Semua", "Siswa", "Guru & Staff"],
    tableHeader: [
      "Instansi",
      "Nama Tag",
      "Kode Tag",
      "Tipe Anggota",
      "Status",
      "Dibuat Pada",
      "",
      "",
    ],
  },

  pathAndIDCheckDataTag: {
    siswa: "/member/student/140",
    guru: "/member/teacher/128",
    staff: "/member/staff/101",
  },

  dataTag: {
    simpleFillTest: {
      instansi: [
        "Academy QA Engineer",
        "Sekolah Digital Indonesia",
        "Yayasan New School",
      ],
      namaTag: "AutoTest Beasiswa Sekolah",
      kodeTag: "PRI121-AUTOTEST",
      tipeAnggota: ["ALL", "TEACHER_STAFF", "STUDENT"],
    },
    simpleFillTest2: {
      instansi: [
        "Academy QA Engineer",
        "Sekolah Digital Indonesia",
        "Yayasan New School",
      ],
      namaTag: "AutoTest Two Beasiswa Sekolah",
      kodeTag: "PRI122-AUTOTEST",
      tipeAnggota: ["ALL", "TEACHER_STAFF", "STUDENT"],
    },
    cancelSimpleTest: {
      instansi: [
        "Academy QA Engineer",
        "Sekolah Digital Indonesia",
        "Yayasan New School",
      ],
      namaTag: "AutoTestCancel Beasiswa Sekolah",
      kodeTag: "PRI123-AUTOTEST",
      tipeAnggota: ["ALL", "TEACHER_STAFF", "STUDENT"],
    },

    formValidationFill: {
      instansi: [
        "Academy QA Engineer",
        "Sekolah Digital Indonesia",
        "Yayasan New School",
      ],
      namaTag: "AutoTest Form Validation",
      kodeTag: "PRI124-AUTOTEST",
      tipeAnggota: ["ALL", "TEACHER_STAFF", "STUDENT"],
    },

    formCheckTagEach: {
      tipeCurrent: {
        instansi: [
          "Academy QA Engineer",
          "Sekolah Digital Indonesia",
          "Yayasan New School",
        ],
        namaTag: "AutoTest Form Validation",
        kodeTag: "PRI126-AUTOTEST",
        tipeAnggota: ["ALL", "TEACHER_STAFF", "STUDENT"],
      },
    },

    formEachTipeAnggota: {
      all: {
        instansi: [
          "Academy QA Engineer",
          "Sekolah Digital Indonesia",
          "Yayasan New School",
        ],
        namaTag: "AutoTest Form Fill is Tipe ALL",
        kodeTag: "PRI144-AUTOTEST",
        tipeAnggota: ["ALL"],
      },
      teacher: {
        instansi: [
          "Academy QA Engineer",
          "Sekolah Digital Indonesia",
          "Yayasan New School",
        ],
        namaTag: "AutoTest Form Fill is Tipe TEACHER STAFF",
        kodeTag: "PRI145-AUTOTEST",
        tipeAnggota: ["TEACHER_STAFF"],
      },
      student: {
        instansi: [
          "Academy QA Engineer",
          "Sekolah Digital Indonesia",
          "Yayasan New School",
        ],
        namaTag: "AutoTest Form Fill is Tipe STUDENT",
        kodeTag: "PRI146-AUTOTEST",
        tipeAnggota: ["STUDENT"],
      },
    },

    formFillTwice: {
      form1: {
        instansi: [
          "Academy QA Engineer",
          "Sekolah Digital Indonesia",
          "Yayasan New School",
        ],
        namaTag: "AutoTest Form Fill Twice First Part",
        kodeTag: "PRI129-AUTOTEST",
        tipeAnggota: ["ALL"],
      },
      form2: {
        instansi: [
          "Academy QA Engineer",
          "Sekolah Digital Indonesia",
          "Yayasan New School",
        ],
        namaTag: "AutoTest Form Fill Twice Second Part",
        kodeTag: "PRI130-AUTOTEST",
        tipeAnggota: ["ALL"],
      },
    },
  },
};

function simpleFillFormField(find, type, value) {
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

function openTambahTag() {
  cy.get("button:contains('Tambah Tag')").should("be.visible").click();

  cy.wait(400);
  cy.contains("div[role='dialog']", "Tambah Tag").should("be.visible");
}

function _localLoginSession() {
  cy.session(
    [config.userTestingAccount.email, config.userTestingAccount.password],
    () => {
      cy.visit(config.loginPath);

      cy.wait(400);
      cy.contains("label", "Email")
        .click()
        .type(config.userTestingAccount.email);
      cy.wait(400);
      cy.get("input[type='password']")
        .click()
        .type(config.userTestingAccount.password);
      cy.wait(400);
      cy.contains("button", "Masuk").click();

      cy.url().should("not.include", config.loginPath);
    },
  );
}

function uncaughtHandle() {
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

function deleteSimpleFill(kodeTag, instansi) {
  const target = kodeTag;

  return cy.get("body").then(($body) => {
    return cy
      .get("tr .animate-pulse", { timeout: 12000 })
      .should("not.exist")
      .then(() => {
        return cy
          .get("tr .animate-pulse", { timeout: 12000 })
          .should("not.exist")
          .then(() => {
            const found =
              $body.find(`tr:contains(${target}):contains(${instansi})`)
                .length > 0;

            if (found) {
              cy.wait(800);
              cy.get(`tr:contains(${target}):contains(${instansi})`)
                .find("svg.lucide-trash")
                .closest("button")
                .click();
              cy.wait(800);
              cy.get("div[role='dialog']:contains('Hapus Tag')", {
                timeout: 12000,
              }).should("be.visible");
              cy.wait(600);
              cy.contains("button", "Hapus").should("be.visible").click();
              cy.wait(800);
              cy.contains(
                "section[aria-label='Notifications alt+T']",
                "Tag berhasil dihapus",
              ).should("be.visible");
              cy.log(`Found and clicked trash button for ${target}`);
            } else {
              cy.log(`No trash button found for ${target}`);
            }

            // this is what the caller's .then() receives
            return cy.wrap(found);
          });
      });
  });
}

function deleteSimpleFillCancel(kodeTag, instansi, withEsc = false) {
  const target = kodeTag;

  return cy.get("body").then(($body) => {
    return cy
      .get("tr .animate-pulse", { timeout: 12000 })
      .should("not.exist")
      .then(() => {
        return cy
          .get("tr .animate-pulse", { timeout: 12000 })
          .should("not.exist")
          .then(() => {
            const found =
              $body.find(`tr:contains(${target}):contains(${instansi})`)
                .length > 0;

            if (found) {
              cy.wait(800);
              cy.get(`tr:contains(${target}):contains(${instansi})`)
                .find("svg.lucide-trash")
                .closest("button")
                .click();
              cy.wait(800);
              cy.contains("div[role='dialog']", "Hapus Tag").should(
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
      });
  });
}

function editSimpleFillOpenDialogAlternative(kodeTag = [], instansi = []) {
  // Normalize both parameters to always be arrays
  const tags = Array.isArray(kodeTag) ? kodeTag : [kodeTag];
  const instansiList = Array.isArray(instansi) ? instansi : [instansi];

  return cy.get("body").then(($body) => {
    return cy
      .get("tr .animate-pulse", { timeout: 12000 })
      .should("not.exist")
      .then(() => {
        let matchedTag = null;
        let matchedInstansi = null;

        // Check combinations sequentially
        for (const tag of tags) {
          for (const item of instansiList) {
            const matchingRow = $body.find(
              `tr:contains("${tag}"):contains("${item}")`,
            );
            if (matchingRow.length > 0) {
              matchedTag = tag;
              matchedInstansi = item;
              break;
            }
          }
          if (matchedTag) break; // Stop as soon as a valid pair is found
        }

        if (matchedTag && matchedInstansi) {
          cy.wait(800);
          cy.get(
            `tr:contains("${matchedTag}"):contains("${matchedInstansi}")`,
            {
              timeout: 12000,
            },
          )
            .find("svg.lucide-square-pen")
            .closest("button")
            .click();

          return cy
            .get("div[role='dialog']", { timeout: 12000 })
            .should("contain", "Edit Tag")
            .then(() => cy.wrap(true));
        } else {
          cy.log(
            `No matching row found for tags [${tags.join(", ")}] and instansi [${instansiList.join(", ")}]`,
          );
          return cy.wrap(false);
        }
      });
  });
}

function editSimpleFillOpenDialog(kodeTag, instansi) {
  const target = kodeTag;

  return cy.get("body").then(($body) => {
    return cy
      .get("tr .animate-pulse", { timeout: 12000 })
      .should("not.exist")
      .then(() => {
        return cy
          .get("tr .animate-pulse", { timeout: 12000 })
          .should("not.exist")
          .then(() => {
            const foundElement =
              $body.find(`tr:contains(${target}):contains(${instansi})`)
                .length > 0;

            if (foundElement) {
              cy.wait(800);
              cy.get(`tr:contains(${target}):contains(${instansi})`, {
                timeout: 12000,
              })
                .find("svg.lucide-square-pen")
                .closest("button")
                .click();

              return cy
                .get("div[role='dialog']", { timeout: 12000 })
                .should("contain", "Edit Tag")
                .then(() => cy.wrap(true));
            } else {
              cy.log(`${target} with ${instansi} not found`);
              return cy.wrap(false);
            }
          });
      });
  });
}

function isItemExist(kodeTag, namaTag) {
  return cy
    .get(`tr:contains(${kodeTag}):contains(${namaTag})`, { timeout: 12000 })
    .should("exist");
}

function waitUntilLoadingAnimationGone() {
  return cy.get("body").then(($body) => {
    return cy
      .get("tr .animate-pulse", { timeout: 12000 })
      .should("not.exist")
      .then(() => {
        return cy
          .get("tr .animate-pulse", { timeout: 12000 })
          .should("not.exist");
      });
  });
}

function namaTagShouldExistOrNot(
  namaTag = "",
  path = config.dataTag.formCheckTagEach.guru,
  contain = true,
) {
  cy.visit(path);
  cy.wait(800);

  cy.contains("label", "Nama Tag")
    .should("be.visible")
    .next()
    .find("button[data-slot='dialog-trigger']")
    .click({ force: true });

  cy.get("div[role='dialog']", { timeout: 12000 }).should(
    contain ? "contain" : "not.contain",
    namaTag,
  );
}

describe("TEST-CASE: 6.XX | Academic Tag", () => {
  beforeEach(() => {
    cy.viewport(1600, 1000);

    _localLoginSession();
    uncaughtHandle();
  });

  describe("TEST-GROUP: 1 | Add Tag - Happy Path & Uniqueness Rules' [6.1 - 6.5]", () => {
    it("TEST-ID: PGT-6.1 | Isi form Tambah Tag dengan semua field valid (Instansi + Nama Tag + Kode Tag + Tipe Member) → klik Simpan", () => {
      cy.visit(config.path);
      cy.wait(800);

      const fillData = config.dataTag.simpleFillTest;
      cy.then(() => {
        cy.wait(1200);
        deleteSimpleFill(fillData.kodeTag, fillData.instansi[0]);
      });

      openTambahTag();

      simpleFillFormField("Instansi", "select", fillData.instansi[0]);

      simpleFillFormField("Nama Tag", "input", fillData.namaTag);

      simpleFillFormField("Kode Tag", "input", fillData.kodeTag);

      const randomTipeAnggota =
        fillData.tipeAnggota[
          Math.floor(Math.random() * fillData.tipeAnggota.length)
        ];

      simpleFillFormField("Tipe Anggota", "select", randomTipeAnggota);

      cy.wait(800);
      cy.contains("button", "Simpan").should("be.visible").click();

      cy.get("div[role='dialog']").should("not.exist");
      cy.contains(
        "section[aria-label='Notifications alt+T']",
        "Tag berhasil ditambahkan",
      ).should("be.visible");
    });

    it("TEST-ID: PGT-6.2 | Klik btn 'Tambah Tag' di halaman list", () => {
      cy.visit(config.path);

      openTambahTag();

      cy.contains("label", "Instansi")
        .should("be.visible")
        .closest('[data-slot="form-item"]')
        .find("select")
        .should("have.value", "");
      cy.log("Instansi field is visible and has no value");

      cy.contains("label", "Nama Tag")
        .should("be.visible")
        .closest('[data-slot="form-item"]')
        .find("input")
        .should("have.value", "");
      cy.log("Nama Tag field is visible and has no value");

      cy.contains("label", "Kode Tag")
        .should("be.visible")
        .closest('[data-slot="form-item"]')
        .find("input")
        .should("have.value", "");
      cy.log("Kode Tag field is visible and has no value");

      cy.contains("label", "Tipe Anggota")
        .should("be.visible")
        .closest('[data-slot="form-item"]')
        .find("select")
        .should("have.value", "");
      cy.log("Tipe Anggota field is visible and has no value");

      cy.wait(200);
      cy.contains("button", "Batal").should("be.visible").click();
      cy.log("Batal button is visible");
    });

    it("TEST-ID: PGT-6.3 | Isi form → klik btn Batal Modal tertutup, data tidak tersimpan, sistem kembali ke halaman list tag", () => {
      cy.visit(config.path);
      cy.wait(1200);

      const fillData = config.dataTag.cancelSimpleTest;

      openTambahTag();

      simpleFillFormField("Instansi", "select", fillData.instansi[0]);

      simpleFillFormField("Nama Tag", "input", fillData.namaTag);

      simpleFillFormField("Kode Tag", "input", fillData.kodeTag);

      const randomTipeAnggota =
        fillData.tipeAnggota[
          Math.floor(Math.random() * fillData.tipeAnggota.length)
        ];

      simpleFillFormField("Tipe Anggota", "select", randomTipeAnggota);

      cy.wait(200);
      cy.contains("button", "Batal").should("be.visible").click();

      cy.wait(100);
      cy.get(
        `tr:contains(${fillData.kodeTag}):contains(${fillData.instansi[0]})`,
      ).should("not.exist");
    });

    it("TEST-ID: PGT-6.4 | Tambah beberapa tag berbeda (nama & kode) di 1 Instansi yang sama", () => {
      cy.visit(config.path);
      cy.wait(800);

      for (let testName of ["simpleFillTest", "simpleFillTest2"]) {
        const fillData = config.dataTag[testName];
        cy.then(() => {
          cy.wait(1200);
          deleteSimpleFill(fillData.kodeTag, fillData.instansi[0]);
        });

        cy.get("button:contains('Tambah Tag')").should("be.visible").click();

        cy.wait(400);
        cy.contains("div[role='dialog']", "Tambah Tag").should("be.visible");

        simpleFillFormField("Instansi", "select", fillData.instansi[0]);

        simpleFillFormField("Nama Tag", "input", fillData.namaTag);

        simpleFillFormField("Kode Tag", "input", fillData.kodeTag);

        const randomTipeAnggota =
          fillData.tipeAnggota[
            Math.floor(Math.random() * fillData.tipeAnggota.length)
          ];

        simpleFillFormField("Tipe Anggota", "select", randomTipeAnggota);

        cy.wait(800);
        cy.contains("button", "Simpan").should("be.visible").click();

        cy.get("div[role='dialog']").should("not.exist");
        cy.contains(
          "section[aria-label='Notifications alt+T']",
          "Tag berhasil ditambahkan",
        ).should("be.visible");
      }
    });

    it("TEST-ID: PGT-6.5 | Tambah 2 tag dengan Kode Tag SAMA tapi Instansi BERBEDA", () => {
      cy.visit(config.path);
      cy.wait(800);

      const fillData = config.dataTag.simpleFillTest;

      for (let i = 0; i < 2; i++) {
        cy.then(() => {
          cy.wait(1200);
          deleteSimpleFill(fillData.kodeTag, fillData.instansi[i]);
        });

        cy.get("button:contains('Tambah Tag')").should("be.visible").click();
        cy.contains("div[role='dialog']", "Tambah Tag").should("be.visible");

        simpleFillFormField("Instansi", "select", fillData.instansi[i]);

        simpleFillFormField("Nama Tag", "input", fillData.namaTag);

        simpleFillFormField("Kode Tag", "input", fillData.kodeTag);

        const randomTipeAnggota =
          fillData.tipeAnggota[
            Math.floor(Math.random() * fillData.tipeAnggota.length)
          ];

        simpleFillFormField("Tipe Anggota", "select", randomTipeAnggota);

        cy.wait(800);
        cy.contains("button", "Simpan").should("be.visible").click();

        cy.get("div[role='dialog']").should("not.exist");
        cy.contains(
          "section[aria-label='Notifications alt+T']",
          "Tag berhasil ditambahkan",
        ).should("be.visible");
      }
    });
  });

  describe("TEST-GROUP: 2 | Add Tag - Form Validation & Error Handling [6.6 - 6.11]", () => {
    const { dialogErrorMessages } = config;

    it("TEST-ID: 6.6 | Isi field lain tapi tidak pilih Instansi → klik Simpan", () => {
      cy.visit(config.path);
      cy.wait(800);

      const fillData = config.dataTag.formValidationFill;
      cy.then(() => {
        cy.wait(1200);
        deleteSimpleFill(fillData.kodeTag, fillData.instansi[0]);
      });

      openTambahTag();

      // simpleFillFormField("Instansi", "select", fillData.instansi[0]);

      simpleFillFormField("Nama Tag", "input", fillData.namaTag);

      simpleFillFormField("Kode Tag", "input", fillData.kodeTag);

      const randomTipeAnggota =
        fillData.tipeAnggota[
          Math.floor(Math.random() * fillData.tipeAnggota.length)
        ];

      simpleFillFormField("Tipe Anggota", "select", randomTipeAnggota);

      cy.wait(800);
      cy.contains("button", "Simpan").should("be.visible").click();

      cy.get("div[data-slot='form-message']").contains(
        dialogErrorMessages.instansiRequired,
      );
    });

    it("TEST-ID: 6.7 | Kosongkan field Nama Tag → klik Simpan", () => {
      cy.visit(config.path);
      cy.wait(800);

      const fillData = config.dataTag.formValidationFill;

      openTambahTag();

      simpleFillFormField("Instansi", "select", fillData.instansi[0]);

      // simpleFillFormField("Nama Tag", "input", fillData.namaTag);

      simpleFillFormField("Kode Tag", "input", fillData.kodeTag);

      const randomTipeAnggota =
        fillData.tipeAnggota[
          Math.floor(Math.random() * fillData.tipeAnggota.length)
        ];

      simpleFillFormField("Tipe Anggota", "select", randomTipeAnggota);

      cy.wait(800);
      cy.contains("button", "Simpan").should("be.visible").click();

      cy.get("div[data-slot='form-message']").contains(
        dialogErrorMessages.namaTagRequired,
      );
    });

    it("TEST-ID: 6.8 | Kosongkan field Kode Tag → klik Simpan", () => {
      cy.visit(config.path);
      cy.wait(800);

      const fillData = config.dataTag.formValidationFill;

      openTambahTag();

      simpleFillFormField("Instansi", "select", fillData.instansi[0]);

      simpleFillFormField("Nama Tag", "input", fillData.namaTag);

      // simpleFillFormField("Kode Tag", "input", fillData.kodeTag);

      const randomTipeAnggota =
        fillData.tipeAnggota[
          Math.floor(Math.random() * fillData.tipeAnggota.length)
        ];

      simpleFillFormField("Tipe Anggota", "select", randomTipeAnggota);

      cy.wait(800);
      cy.contains("button", "Simpan").should("be.visible").click();

      cy.get("div[data-slot='form-message']").contains(
        dialogErrorMessages.kodeTagRequired,
      );
    });

    it("TEST-ID: 6.9 | Kosongkan field Tipe Member → klik Simpan", () => {
      cy.visit(config.path);
      cy.wait(800);

      const fillData = config.dataTag.formValidationFill;

      openTambahTag();

      simpleFillFormField("Instansi", "select", fillData.instansi[0]);

      simpleFillFormField("Nama Tag", "input", fillData.namaTag);

      simpleFillFormField("Kode Tag", "input", fillData.kodeTag);

      // const randomTipeAnggota =
      //   fillData.tipeAnggota[
      //     Math.floor(Math.random() * fillData.tipeAnggota.length)
      //   ];

      // simpleFillFormField("Tipe Anggota", "select", randomTipeAnggota);

      cy.wait(800);
      cy.contains("button", "Simpan").should("be.visible").click();

      cy.get("div[data-slot='form-message']").contains(
        dialogErrorMessages.tipeAnggotaRequired,
      );
    });

    it("TEST-ID: 6.10 | Klik Simpan tanpa isi field apapun", () => {
      cy.visit(config.path);
      cy.wait(800);

      openTambahTag();

      cy.wait(800);
      cy.contains("button", "Simpan").should("be.visible").click();

      for (const [field, message] of Object.entries(dialogErrorMessages)) {
        // if status skip. status exists but i want to skip

        if (field === "statusRequired") continue;
        cy.get(`div[data-slot='form-message']`).contains(message);
      }
    });

    it("TEST-ID: 6.11 | Tambah tag dengan Kode Tag yang sudah ada di Instansi yang sama (duplikat)", () => {
      cy.visit(config.path);
      cy.wait(800);

      const fillData = config.dataTag.simpleFillTest;

      openTambahTag();

      simpleFillFormField("Instansi", "select", fillData.instansi[0]);

      simpleFillFormField("Nama Tag", "input", fillData.namaTag);

      simpleFillFormField("Kode Tag", "input", fillData.kodeTag);

      const randomTipeAnggota =
        fillData.tipeAnggota[
          Math.floor(Math.random() * fillData.tipeAnggota.length)
        ];

      simpleFillFormField("Tipe Anggota", "select", randomTipeAnggota);

      cy.wait(800);
      cy.contains("button", "Simpan").should("be.visible").click();

      cy.contains(
        "section[aria-label='Notifications alt+T']",
        "Kode tag sudah digunakan di instansi ini",
      ).should("be.visible");
    });
  });

  describe("TEST-GROUP: 3 | Member Type Options & Integration Scope [6.12 - 6.15]", () => {
    it("TEST-ID: 6.12 | Dropdown menampilkan 3 opsi: 'Semua', 'Siswa', 'Guru & Staff'", () => {
      cy.visit(config.path);
      cy.wait(800);

      const tipeAnggota = config.dataTag.simpleFillTest.tipeAnggota;

      openTambahTag();

      cy.contains("label", "Tipe Anggota")
        .should("be.visible")
        .closest('[data-slot="form-item"]')
        .find("select")
        .find("option")
        .then(($options) => {
          const actualDisplay = [...$options]
            .map((i) => i.textContent)
            .filter((a) => a.length > 0);

          const actualValues = [...$options]
            .map((i) => i.value)
            .filter((a) => a.length > 0);

          tipeAnggota.forEach((item) => {
            expect(actualValues).to.include(item);
          });

          config.misc.tipeAnggotaDisplayName.forEach((item) => {
            expect(actualDisplay).to.include(item);
          });
        });
    });

    it("TEST-ID: 6.13 | Buat tag dengan Tipe Member = 'Semua' → buka fitur Data Siswa / Data Guru / Data Staff / Tagihan / Presensi Kegiatan", () => {
      cy.visit(config.path);
      cy.wait(800);

      const fillData = config.dataTag.formCheckTagEach.tipeCurrent;
      cy.then(() => {
        cy.wait(1200);
        deleteSimpleFill(fillData.kodeTag, fillData.instansi[0]);
      });

      openTambahTag();

      simpleFillFormField("Instansi", "select", fillData.instansi[0]);

      simpleFillFormField("Nama Tag", "input", fillData.namaTag);

      simpleFillFormField("Kode Tag", "input", fillData.kodeTag);

      simpleFillFormField("Tipe Anggota", "select", fillData.tipeAnggota[0]);

      cy.wait(800);
      cy.contains("button", "Simpan").should("be.visible").click();

      cy.get("div[role='dialog']", { timeout: 12000 }).should("not.exist");
      cy.contains(
        "section[aria-label='Notifications alt+T']",
        "Tag berhasil ditambahkan",
      ).should("be.visible");

      ///////////////////////////////////////////////////////////

      namaTagShouldExistOrNot(
        fillData.namaTag,
        config.pathAndIDCheckDataTag.guru,
        true,
      );

      namaTagShouldExistOrNot(
        fillData.namaTag,
        config.pathAndIDCheckDataTag.siswa,
        true,
      );

      namaTagShouldExistOrNot(
        fillData.namaTag,
        config.pathAndIDCheckDataTag.staff,
        true,
      );
    });

    it("TEST-ID: 6.14 | Buat tag dengan Tipe Member = 'Siswa' → buka fitur Data Siswa vs fitur Data Guru/Staff", () => {
      cy.visit(config.path);
      cy.wait(800);

      const fillDataBefore = config.dataTag.formCheckTagEach.tipeCurrent;
      cy.wait(1200);
      editSimpleFillOpenDialog(
        fillDataBefore.kodeTag,
        fillDataBefore.instansi[0],
      )
        .then((isDialogOpen) => {
          if (isDialogOpen) {
            simpleFillFormField(
              "Tipe Anggota",
              "select",
              fillDataBefore.tipeAnggota[2],
            );

            cy.wait(800);
            cy.contains("button", "Simpan").should("be.visible").click();

            cy.get("div[role='dialog']", { timeout: 12000 }).should(
              "not.exist",
            );
            cy.contains(
              "section[aria-label='Notifications alt+T']",
              "Tag berhasil diperbarui",
            ).should("be.visible");
          }
        })
        .then(() => {
          namaTagShouldExistOrNot(
            fillDataBefore.namaTag,
            config.pathAndIDCheckDataTag.guru,
            false,
          );

          namaTagShouldExistOrNot(
            fillDataBefore.namaTag,
            config.pathAndIDCheckDataTag.siswa,
            true,
          );

          namaTagShouldExistOrNot(
            fillDataBefore.namaTag,
            config.pathAndIDCheckDataTag.staff,
            false,
          );
        });
    });

    it("TEST-ID: 6.15 | Buat tag dengan Tipe Member = 'Guru & Staff' → buka fitur Data Guru & Staff vs Data Siswa", () => {
      cy.visit(config.path);
      cy.wait(800);

      const fillDataBefore = config.dataTag.formCheckTagEach.tipeCurrent;
      cy.wait(1200);
      editSimpleFillOpenDialog(
        fillDataBefore.kodeTag,
        fillDataBefore.instansi[0],
      )
        .then((isDialogOpen) => {
          if (isDialogOpen) {
            simpleFillFormField(
              "Tipe Anggota",
              "select",
              fillDataBefore.tipeAnggota[1],
            );

            cy.wait(800);
            cy.contains("button", "Simpan").should("be.visible").click();

            cy.get("div[role='dialog']", { timeout: 12000 }).should(
              "not.exist",
            );
            cy.contains(
              "section[aria-label='Notifications alt+T']",
              "Tag berhasil diperbarui",
            ).should("be.visible");
          }
        })
        .then(() => {
          namaTagShouldExistOrNot(
            fillDataBefore.namaTag,
            config.pathAndIDCheckDataTag.guru,
            true,
          );

          namaTagShouldExistOrNot(
            fillDataBefore.namaTag,
            config.pathAndIDCheckDataTag.siswa,
            false,
          );

          namaTagShouldExistOrNot(
            fillDataBefore.namaTag,
            config.pathAndIDCheckDataTag.staff,
            true,
          );
        });
    });
  });

  describe("TEST-GROUP: 4 | Tag List - Rendering & Initial State [6.16 - 6.19]", () => {
    it("TEST-ID: 6.16 | List tampil dengan kolom: Instansi, Nama Tag, Kode Tag, Tipe Member, Status, Dibuat Pada, Aksi", () => {
      cy.visit(config.path);
      cy.wait(800);

      cy.get("thead th").should("have.length", config.misc.tableHeader.length);

      cy.get("thead th").each(($th, idx) => {
        cy.wrap($th)
          .invoke("text")
          .invoke("trim")
          .should("equal", config.misc.tableHeader[idx]);
      });
    });

    it("TEST-ID: 6.17 | Setiap row punya tombol Aksi Edit (pencil icon) & Hapus (trash icon)", () => {
      cy.visit(config.path);
      cy.wait(800);

      cy.get("thead th").should("have.length", config.misc.tableHeader.length);

      waitUntilLoadingAnimationGone().then(() => {
        cy.get("tbody tr").each(($row) => {
          cy.wrap($row).within(() => {
            cy.get("svg.lucide-square-pen").should("have.length", 1);
            cy.get("svg.lucide-trash").should("have.length", 1);
          });
        });
      });
    });

    it("TEST-ID: 6.18 | Sistem menampilkan halaman kosong (empty state UI) ", () => {
      cy.visit(config.path);
      cy.wait(800);

      cy.intercept("GET", "https://v3.cazh.id/api/proxy/tags?page=1&limit=10", {
        statusCode: 200,
        body: {
          status: true,
          message: "OK",
          data: [],
          meta: {
            page: 1,
            limit: 10,
            total_count: 0,
          },
        },
      });

      cy.wait(2000).then(() => {
        cy.wait(2000);
        waitUntilLoadingAnimationGone().then(() => {
          cy.get("tbody tr").each(($row) => {
            cy.wrap($row).within(() => {
              cy.get("td").should("contain.text", "Data Tag tidak ditemukan");
            });
          });
        });
      });
    });

    it("TEST-ID: 6.19 | Tambah 2 tag berturut-turut → reload halaman", () => {
      cy.visit(config.path);
      cy.wait(800);

      const fillDataTwice = config.dataTag.formFillTwice;

      for (const [key, value] of Object.entries(fillDataTwice)) {
        cy.wait(800);
        deleteSimpleFill(value.kodeTag, value.instansi[0]);
      }

      for (const [key, value] of Object.entries(fillDataTwice)) {
        openTambahTag();

        simpleFillFormField("Instansi", "select", value.instansi[0]);

        simpleFillFormField("Nama Tag", "input", value.namaTag);

        simpleFillFormField("Kode Tag", "input", value.kodeTag);

        simpleFillFormField("Tipe Anggota", "select", value.tipeAnggota[0]);

        cy.wait(800);
        cy.contains("button", "Simpan").should("be.visible").click();

        cy.get("div[role='dialog']").should("not.exist");
        cy.contains(
          "section[aria-label='Notifications alt+T']",
          "Tag berhasil ditambahkan",
        ).should("be.visible");

        cy.wait(800);
      }

      cy.reload();
      cy.wait(800);

      // get list of tr need to make sure the last one insert is on the top and the first one is one the bottom
      // i think not last-childe but second child
      waitUntilLoadingAnimationGone().then(() => {
        cy.get("table tbody tr:first-child").should(
          "contain",
          fillDataTwice.form2.kodeTag,
        );
        cy.get("table tbody tr:nth-child(2)").should(
          "contain",
          fillDataTwice.form1.kodeTag,
        );
      });
    });
  });

  describe("TEST-GROUP: 5 | Tag List - Filtering Scenarios [6.20 - 6.28]", () => {
    it("TEST-ID: 6.20 | Aktifkan Filter Instansi (pilih 1 instansi)", () => {
      cy.visit(config.path);
      cy.wait(800);

      // delete config.dataTag.formEachTipeAnggota
      label_break: {
        // break label_break;

        for (const [key, value] of Object.entries(
          config.dataTag.formEachTipeAnggota,
        )) {
          cy.wait(2000);
          deleteSimpleFill(value.kodeTag, value.instansi[0]);
        }

        for (const [key, value] of Object.entries(
          config.dataTag.formEachTipeAnggota,
        )) {
          openTambahTag();

          simpleFillFormField("Instansi", "select", value.instansi[0]);

          simpleFillFormField("Nama Tag", "input", value.namaTag);

          simpleFillFormField("Kode Tag", "input", value.kodeTag);

          simpleFillFormField("Tipe Anggota", "select", value.tipeAnggota[0]);

          cy.wait(800);
          cy.contains("button", "Simpan").should("be.visible").click();

          cy.get("div[role='dialog']").should("not.exist");
          cy.contains(
            "section[aria-label='Notifications alt+T']",
            "Tag berhasil ditambahkan",
          ).should("be.visible");

          cy.wait(800);
        }
      }

      waitUntilLoadingAnimationGone().then(() => {
        cy.contains("button", "Filter").should("be.visible").click();
        cy.wait(800);

        cy.contains(`div[data-slot="dropdown-menu-label"]`, "Instansi")
          .should("be.visible")
          .next("button")
          .click();

        cy.get(`div[data-radix-popper-content-wrapper]`)
          .should("have.length", 2)
          .last()
          .should("contain.text", "Semua")
          .should("be.visible")
          .contains(
            `div[role="option"]`,
            config.dataTag.formFillTwice.form1.instansi[0],
          )
          .click({ force: true })
          .then(() => {
            cy.wait(2000);
            waitUntilLoadingAnimationGone().then(() => {
              cy.get("tbody tr").each(($row) => {
                cy.wrap($row).within(() => {
                  cy.get("td")
                    .first()
                    .should(
                      "contain.text",
                      config.dataTag.formFillTwice.form1.instansi[0],
                    );
                });
              });
            });
          });
      });
    });

    it("TEST-ID: 6.21 | Aktifkan Filter Status = 'Aktif'", () => {
      cy.visit(config.path);
      cy.wait(800);

      const indexStatus = config.misc.tableHeader.indexOf("Status") + 1;

      waitUntilLoadingAnimationGone().then(() => {
        cy.contains("button", "Filter").should("be.visible").click();
        cy.wait(800);

        cy.contains(`div[data-slot="dropdown-menu-label"]`, "Status")
          .should("be.visible")
          .next("button")
          .click();

        cy.get(`div[data-radix-popper-content-wrapper]`)
          .should("have.length", 2)
          .last()
          .should("contain.text", "Semua")
          .should("be.visible")
          .contains(`div[role="option"]`, "Aktif")
          .click({ force: true })
          .then(() => {
            cy.wait(2000);
            waitUntilLoadingAnimationGone().then(() => {
              cy.get("tbody tr").each(($row) => {
                cy.wrap($row).within(() => {
                  cy.get(`td:nth-child(${indexStatus})`).should(
                    "contain.text",
                    "Aktif",
                  );
                });
              });
            });
          });
      });
    });

    it("TEST-ID: 6.22 | Aktifkan Filter Status = 'Tidak Aktif'", () => {
      cy.visit(config.path);
      cy.wait(800);

      const indexStatus = config.misc.tableHeader.indexOf("Status") + 1;

      waitUntilLoadingAnimationGone().then(() => {
        cy.contains("button", "Filter").should("be.visible").click();
        cy.wait(800);

        cy.contains(`div[data-slot="dropdown-menu-label"]`, "Status")
          .should("be.visible")
          .next("button")
          .click();

        cy.get(`div[data-radix-popper-content-wrapper]`)
          .should("have.length", 2)
          .last()
          .should("contain.text", "Semua")
          .should("be.visible")
          .contains(`div[role="option"]`, "Tidak Aktif")
          .click({ force: true })
          .then(() => {
            cy.wait(2000);
            waitUntilLoadingAnimationGone().then(() => {
              cy.get("tbody tr").each(($row) => {
                cy.wrap($row).within(() => {
                  cy.get(`td:nth-child(${indexStatus})`).should(
                    "contain.text",
                    "Tidak Aktif",
                  );
                });
              });
            });
          });
      });
    });

    it("TEST-ID: 6.23 | List menampilkan semua tag tanpa filter status (Aktif + Tidak Aktif digabung)", () => {
      cy.visit(config.path);
      cy.wait(800);

      const indexStatus = config.misc.tableHeader.indexOf("Status") + 1;

      waitUntilLoadingAnimationGone().then(() => {
        cy.contains("button", "Filter").should("be.visible").click();
        cy.wait(800);

        cy.contains(`div[data-slot="dropdown-menu-label"]`, "Status")
          .should("be.visible")
          .next("button")
          .click();

        cy.get(`div[data-radix-popper-content-wrapper]`)
          .should("have.length", 2)
          .last()
          .should("contain.text", "Semua")
          .should("be.visible")
          .get(`div[role="option"]:contains("Semua")`)
          .last()
          .click({ force: true })
          .then(() => {
            cy.wait(2000);
            waitUntilLoadingAnimationGone().then(() => {
              cy.get("tbody tr").each(($row) => {
                cy.wrap($row).within(() => {
                  cy.get(`td:nth-child(${indexStatus})`)
                    .invoke("text")
                    .should("match", /Aktif|Tidak Aktif/);
                });
              });
            });
          });
      });
    });

    it("TEST-ID: 6.24 | Aktifkan Filter Tipe Member = 'Semua'", () => {
      cy.visit(config.path);
      cy.wait(800);

      const indexStatus = config.misc.tableHeader.indexOf("Tipe Anggota") + 1;

      waitUntilLoadingAnimationGone().then(() => {
        cy.contains("button", "Filter").should("be.visible").click();
        cy.wait(800);

        cy.contains(`div[data-slot="dropdown-menu-label"]`, "Tipe Anggota")
          .should("be.visible")
          .next("button")
          .click();

        cy.wait(2000);

        cy.get(`div[data-radix-popper-content-wrapper]`)
          .should("have.length", 2)
          .last()
          .should("contain.text", "Semua")
          .should("be.visible")
          .get(`div[role="option"]:contains("Semua")`)
          .last()
          .click({ force: true })
          .then(() => {
            cy.wait(2000);
            waitUntilLoadingAnimationGone().then(() => {
              cy.get("tbody tr").each(($row) => {
                cy.wrap($row).within(() => {
                  cy.get(`td:nth-child(${indexStatus})`).should(
                    "contain.text",
                    "Semua",
                  );
                });
              });
            });
          });
      });
    });

    it("TEST-ID: 6.25 | Aktifkan Filter Tipe Member = 'Siswa'", () => {
      cy.visit(config.path);
      cy.wait(800);

      const indexStatus = config.misc.tableHeader.indexOf("Tipe Anggota") + 1;

      waitUntilLoadingAnimationGone().then(() => {
        cy.contains("button", "Filter").should("be.visible").click();
        cy.wait(800);

        cy.contains(`div[data-slot="dropdown-menu-label"]`, "Tipe Anggota")
          .should("be.visible")
          .next("button")
          .click();

        cy.wait(2000);

        cy.get(`div[data-radix-popper-content-wrapper]`)
          .should("have.length", 2)
          .last()
          .should("contain.text", "Semua")
          .should("be.visible")
          .get(`div[role="option"]:contains("Siswa")`)
          .last()
          .click({ force: true })
          .then(() => {
            cy.wait(2000);
            waitUntilLoadingAnimationGone().then(() => {
              cy.get("tbody tr").each(($row) => {
                cy.wrap($row).within(() => {
                  cy.get(`td:nth-child(${indexStatus})`).should(
                    "contain.text",
                    "Siswa",
                  );
                });
              });
            });
          });
      });
    });

    it("TEST-ID: 6.26 | Aktifkan Filter Tipe Member = 'Guru & Staff'", () => {
      cy.visit(config.path);
      cy.wait(800);

      const indexStatus = config.misc.tableHeader.indexOf("Tipe Anggota") + 1;

      waitUntilLoadingAnimationGone().then(() => {
        cy.contains("button", "Filter").should("be.visible").click();
        cy.wait(800);

        cy.contains(`div[data-slot="dropdown-menu-label"]`, "Tipe Anggota")
          .should("be.visible")
          .next("button")
          .click();

        cy.wait(2000);

        cy.get(`div[data-radix-popper-content-wrapper]`)
          .should("have.length", 2)
          .last()
          .should("contain.text", "Semua")
          .should("be.visible")
          .get(`div[role="option"]:contains("Guru & Staff")`)
          .last()
          .click({ force: true })
          .then(() => {
            cy.wait(2000);
            waitUntilLoadingAnimationGone().then(() => {
              cy.get("tbody tr").each(($row) => {
                cy.wrap($row).within(() => {
                  cy.get(`td:nth-child(${indexStatus})`).should(
                    "contain.text",
                    "Guru & Staff",
                  );
                });
              });
            });
          });
      });
    });

    it("TEST-ID: 6.27 | Aktifkan Filter Instansi + Status + Tipe Member secara bersamaan (kombinasi)", () => {
      cy.visit(config.path);
      cy.wait(800);

      const indexStatus = config.misc.tableHeader.indexOf("Status") + 1;
      const indexAnggota = config.misc.tableHeader.indexOf("Tipe Anggota") + 1;

      waitUntilLoadingAnimationGone().then(() => {
        cy.contains("button", "Filter").should("be.visible").click();
        cy.wait(800);

        cy.contains(`div[data-slot="dropdown-menu-label"]`, "Instansi")
          .should("be.visible")
          .next("button")
          .click();

        cy.get(`div[data-radix-popper-content-wrapper]`)
          .should("have.length", 2)
          .last()
          .should("contain.text", "Semua")
          .should("be.visible")
          .contains(
            `div[role="option"]`,
            config.dataTag.formFillTwice.form1.instansi[0],
          )
          .click({ force: true });

        cy.wait(2000);

        cy.contains(`div[data-slot="dropdown-menu-label"]`, "Status")
          .should("be.visible")
          .next("button")
          .click();

        cy.get(`div[data-radix-popper-content-wrapper]`)
          .should("have.length", 2)
          .last()
          .should("contain.text", "Semua")
          .should("be.visible")
          .contains(`div[role="option"]`, "Aktif")
          .click({ force: true });

        cy.wait(2000);

        cy.contains(`div[data-slot="dropdown-menu-label"]`, "Tipe Anggota")
          .should("be.visible")
          .next("button")
          .click();

        cy.get(`div[data-radix-popper-content-wrapper]`)
          .should("have.length", 2)
          .last()
          .should("contain.text", "Semua")
          .should("be.visible")
          .get(`div[role="option"]:contains("Semua")`)
          .last()
          .click({ force: true });

        cy.wait(2000).then(() => {
          cy.wait(2000);
          waitUntilLoadingAnimationGone().then(() => {
            cy.get("tbody tr").each(($row) => {
              cy.wrap($row).within(() => {
                cy.get("td")
                  .first()
                  .should(
                    "contain.text",
                    config.dataTag.formFillTwice.form1.instansi[0],
                  );

                cy.get(`td:nth-child(${indexStatus})`).should(
                  "contain.text",
                  "Aktif",
                );

                cy.get(`td:nth-child(${indexAnggota})`).should(
                  "contain.text",
                  "Semua",
                );
              });
            });
          });
        });
      });
    });

    it("TEST-ID: 6.28 | Aktifkan filter → tidak ada hasil yang match", () => {
      cy.visit(config.path);
      cy.wait(800);

      waitUntilLoadingAnimationGone().then(() => {
        cy.contains("button", "Filter").should("be.visible").click();
        cy.wait(800);

        cy.contains(`div[data-slot="dropdown-menu-label"]`, "Instansi")
          .should("be.visible")
          .next("button")
          .click();

        cy.get(`div[data-radix-popper-content-wrapper]`)
          .should("have.length", 2)
          .last()
          .should("contain.text", "Semua")
          .should("be.visible")
          .contains(
            `div[role="option"]`,
            config.dataTag.formFillTwice.form1.instansi[2],
          )
          .click({ force: true });

        cy.wait(2000);

        cy.contains(`div[data-slot="dropdown-menu-label"]`, "Status")
          .should("be.visible")
          .next("button")
          .click();

        cy.get(`div[data-radix-popper-content-wrapper]`)
          .should("have.length", 2)
          .last()
          .should("contain.text", "Semua")
          .should("be.visible")
          .contains(`div[role="option"]`, "Tidak Aktif")
          .click({ force: true });

        cy.wait(2000).then(() => {
          cy.wait(2000);
          waitUntilLoadingAnimationGone().then(() => {
            cy.get("tbody tr").each(($row) => {
              cy.wrap($row).within(() => {
                cy.get("td").should("contain.text", "Data Tag tidak ditemukan");
              });
            });
          });
        });
      });
    });
  });

  describe("TEST-GROUP: 6 | Tag List - Search Functionality [6.29 - 6.33]", () => {
    it("TEST-ID: 6.29 | Ketik Nama Tag di search box", () => {
      cy.visit(config.path);
      cy.wait(800);

      cy.get("input[placeholder='Cari'][data-slot='input']").type(
        "Program Akselerasi",
      );
      cy.wait(2000);

      waitUntilLoadingAnimationGone().then(() => {
        cy.get("tbody tr").each(($row) => {
          cy.wrap($row).within(() => {
            cy.get("td").should("contain.text", "Program Akselerasi");
          });
        });
      });
    });

    it("TEST-ID: 6.30 | Ketik Kode Tag di search box", () => {
      cy.visit(config.path);
      cy.wait(800);

      cy.get("input[placeholder='Cari'][data-slot='input']").type("PRI001");
      cy.wait(2000);

      waitUntilLoadingAnimationGone().then(() => {
        cy.get("tbody tr").each(($row) => {
          cy.wrap($row).within(() => {
            cy.get("td").should("contain.text", "PRI001");
          });
        });
      });
    });

    it("TEST-ID: 6.31 | Ketik nama Instansi di search box", () => {
      cy.visit(config.path);
      cy.wait(800);

      cy.get("input[placeholder='Cari'][data-slot='input']").type(
        "Yayasan New School",
      );
      cy.wait(2000);

      waitUntilLoadingAnimationGone().then(() => {
        cy.get("tbody tr").each(($row) => {
          cy.wrap($row).within(() => {
            cy.get("td").should("contain.text", "Yayasan New School");
          });
        });
      });
    });

    it("TEST-ID: 6.32 | Ketik keyword yang tidak match ('xyz123abc')", () => {
      cy.visit(config.path);
      cy.wait(800);

      cy.get("input[placeholder='Cari'][data-slot='input']").type("xyz123abc");
      cy.wait(2000);

      waitUntilLoadingAnimationGone().then(() => {
        cy.get("tbody tr").each(($row) => {
          cy.wrap($row).within(() => {
            cy.get("td").should("contain.text", "Data Tag tidak ditemukan");
          });
        });
      });
    });

    it("TEST-ID: 6.33 | Setelah search, clear search box (kosongkan)", () => {
      cy.visit(config.path);
      cy.wait(800);

      cy.get("input[placeholder='Cari'][data-slot='input']").type("xyz123abc");
      cy.wait(2000);

      waitUntilLoadingAnimationGone()
        .then(() => {
          cy.get("tbody tr").each(($row) => {
            cy.wrap($row).within(() => {
              cy.get("td").should("contain.text", "Data Tag tidak ditemukan");
            });
          });
        })
        .then(() => {
          cy.get("input[placeholder='Cari'][data-slot='input']").clear();

          cy.wait(2000);

          waitUntilLoadingAnimationGone().then(() => {
            cy.get("tbody tr").each(($row) => {
              cy.wrap($row).within(() => {
                cy.get("td").should(
                  "not.contain.text",
                  "Data Tag tidak ditemukan",
                );
              });
            });
          });
        });
    });
  });

  describe("TEST-GROUP: 7 | Edit Tag - Success Flow & Field Updates [6.34 - 6.41]", () => {
    const fillDataCheck = config.dataTag.formEachTipeAnggota.all;
    const newData = {
      namaTag: "Nama Tag Baru",
      kodeTag: config.dataTag.formEachTipeAnggota.all.kodeTag + "-EDIT",
      tipeAnggota: "STUDENT",
      instansi: fillDataCheck.instansi[2],
    };

    function changeIntoOrigin() {
      cy.visit(config.path);
      cy.wait(800);

      cy.wait(2000);

      // make condition to select newData and old data from the table td
      // if newData is not available, use oldData instead
      return editSimpleFillOpenDialogAlternative(
        [fillDataCheck.kodeTag, newData.kodeTag],
        [fillDataCheck.instansi[0], newData.instansi],
      ).then((isDialogOpen) => {
        cy.wait(2000);

        simpleFillFormField("Instansi", "select", fillDataCheck.instansi[0]);

        simpleFillFormField("Nama Tag", "input", fillDataCheck.namaTag);

        simpleFillFormField("Kode Tag", "input", fillDataCheck.kodeTag);

        simpleFillFormField(
          "Tipe Anggota",
          "select",
          fillDataCheck.tipeAnggota[0],
        );

        cy.wait(1000);

        cy.contains("button", "Simpan").should("be.visible").click();
      });
    }

    it("TEST-ID: 6.34 | Klik icon pencil (Edit) di row tag", () => {
      cy.visit(config.path);
      cy.wait(800);

      cy.wait(2000);

      changeIntoOrigin();
      cy.wait(4000);

      editSimpleFillOpenDialogAlternative(
        [fillDataCheck.kodeTag, newData.kodeTag],
        [fillDataCheck.instansi[0], newData.instansi],
      ).then((isDialogOpen) => {
        cy.wait(2000);
        if (isDialogOpen) {
          cy.contains("label", "Instansi")
            .should("be.visible")
            .next("button")
            .find("span")
            .should("contain.text", fillDataCheck.instansi[0]);
          cy.log("Instansi field is visible and has value");

          cy.contains("label", "Nama Tag")
            .should("be.visible")
            .next("div")
            .find("input")
            .should("have.value", fillDataCheck.namaTag);
          cy.log("Nama Tag field is visible and has value");

          cy.contains("label", "Kode Tag")
            .should("be.visible")
            .next("div")
            .find("input")
            .should("have.value", fillDataCheck.kodeTag);
          cy.log("Kode Tag field is visible and has value");

          cy.contains("label", "Tipe Anggota")
            .should("be.visible")
            .next("button")
            .find("span")
            .should("contain.text", config.misc.tipeAnggotaDisplayName[0]);
          cy.log("Tipe Anggota field is visible and has value");
        }
      });
    });

    it("TEST-ID: 6.35 | Ubah Nama Tag ke nilai baru → klik Simpan", () => {
      cy.visit(config.path);
      cy.wait(800);

      cy.wait(2000);

      editSimpleFillOpenDialog(
        fillDataCheck.kodeTag,
        fillDataCheck.instansi[0],
      ).then((isDialogOpen) => {
        cy.wait(2000);
        if (isDialogOpen) {
          simpleFillFormField("Nama Tag", "input", newData.namaTag);

          cy.wait(800);

          cy.contains("button", "Simpan").should("be.visible").click();

          cy.wait(1000);

          cy.get("div[role='dialog']").should("not.exist");
          cy.contains(
            "section[aria-label='Notifications alt+T']",
            "Tag berhasil diperbarui",
          ).should("be.visible");

          cy.wait(800);
        }
      });
    });

    it("TEST-ID: 6.36 | Ubah Kode Tag ke nilai baru (unique) → klik Simpan", () => {
      cy.visit(config.path);
      cy.wait(800);

      cy.wait(2000);

      editSimpleFillOpenDialog(
        fillDataCheck.kodeTag,
        fillDataCheck.instansi[0],
      ).then((isDialogOpen) => {
        cy.wait(2000);
        if (isDialogOpen) {
          simpleFillFormField("Kode Tag", "input", newData.kodeTag);

          cy.wait(800);

          cy.contains("button", "Simpan").should("be.visible").click();

          cy.wait(1000);

          cy.get("div[role='dialog']").should("not.exist");
          cy.contains(
            "section[aria-label='Notifications alt+T']",
            "Tag berhasil diperbarui",
          ).should("be.visible");

          cy.wait(800);
        }
      });
    });

    it("TEST-ID: 6.37 | Ubah Tipe Member (misal Semua → Siswa) → klik Simpan", () => {
      cy.visit(config.path);
      cy.wait(800);

      cy.wait(2000);

      editSimpleFillOpenDialogAlternative(
        [fillDataCheck.kodeTag, newData.kodeTag],
        fillDataCheck.instansi[0],
      ).then((isDialogOpen) => {
        cy.wait(2000);
        if (isDialogOpen) {
          simpleFillFormField("Tipe Anggota", "select", newData.tipeAnggota);

          cy.wait(800);

          cy.contains("button", "Simpan").should("be.visible").click();

          cy.wait(1000);

          cy.get("div[role='dialog']").should("not.exist");
          cy.contains(
            "section[aria-label='Notifications alt+T']",
            "Tag berhasil diperbarui",
          ).should("be.visible");

          cy.wait(800);
        }
      });
    });

    it("TEST-ID: 6.38 | Ubah Instansi tag ke instansi lain → klik Simpan", () => {
      cy.visit(config.path);
      cy.wait(800);

      cy.wait(2000);

      editSimpleFillOpenDialogAlternative(
        [fillDataCheck.kodeTag, newData.kodeTag],
        [fillDataCheck.instansi[0], newData.instansi],
      ).then((isDialogOpen) => {
        cy.wait(2000);
        if (isDialogOpen) {
          simpleFillFormField("Instansi", "select", newData.instansi);

          cy.wait(800);

          cy.contains("button", "Simpan").should("be.visible").click();

          cy.wait(1000);

          cy.get("div[role='dialog']").should("not.exist");
          cy.contains(
            "section[aria-label='Notifications alt+T']",
            "Tag berhasil diperbarui",
          ).should("be.visible");

          cy.wait(800);
        }
      });
    });

    it("TEST-ID: 6.39 | Ubah Status dari 'Aktif' ke 'Tidak Aktif' → klik Simpan", () => {
      cy.visit(config.path);
      cy.wait(800);

      cy.wait(2000);

      editSimpleFillOpenDialogAlternative(
        [fillDataCheck.kodeTag, newData.kodeTag],
        [fillDataCheck.instansi[0], newData.instansi],
      ).then((isDialogOpen) => {
        cy.wait(2000);
        if (isDialogOpen) {
          simpleFillFormField("Status", "select", "Tidak Aktif");

          cy.wait(800);

          cy.contains("button", "Simpan").should("be.visible").click();

          cy.wait(1000);

          cy.get("div[role='dialog']").should("not.exist");
          cy.contains(
            "section[aria-label='Notifications alt+T']",
            "Tag berhasil diperbarui",
          ).should("be.visible");

          cy.wait(800);
        }
      });
    });

    it("TEST-ID: 6.40 | Ubah Status dari 'Tidak Aktif' ke 'Aktif' → klik Simpan", () => {
      cy.visit(config.path);
      cy.wait(800);

      cy.wait(2000);

      editSimpleFillOpenDialogAlternative(
        [fillDataCheck.kodeTag, newData.kodeTag],
        [fillDataCheck.instansi[0], newData.instansi],
      ).then((isDialogOpen) => {
        cy.wait(2000);
        if (isDialogOpen) {
          simpleFillFormField("Status", "select", "Aktif");

          cy.wait(800);

          cy.contains("button", "Simpan").should("be.visible").click();

          cy.wait(1000);

          cy.get("div[role='dialog']").should("not.exist");
          cy.contains(
            "section[aria-label='Notifications alt+T']",
            "Tag berhasil diperbarui",
          ).should("be.visible");

          cy.wait(800);
        }
      });
    });

    it("TEST-ID: 6.41 | Ubah field di modal Edit → klik Batal", () => {
      cy.visit(config.path);
      cy.wait(800);

      cy.wait(2000);

      editSimpleFillOpenDialogAlternative(
        [fillDataCheck.kodeTag, newData.kodeTag],
        [fillDataCheck.instansi[0], newData.instansi],
      ).then((isDialogOpen) => {
        cy.wait(2000);
        if (isDialogOpen) {
          simpleFillFormField("Status", "select", "Tidak Aktif");

          cy.wait(800);

          cy.contains("button", "Batal").should("be.visible").click();

          cy.wait(1000);

          cy.get("div[role='dialog']").should("not.exist");
          cy.wait(800);
        }
      });

      changeIntoOrigin();
    });
  });

  describe("TEST-GROUP: 8 | Edit Tag - Form Validation & Constraints [6.42 - 6.46]", () => {
    const fillDataCheck = config.dataTag.formEachTipeAnggota.all;
    const newData = {
      namaTag: "Nama Tag Baru",
      kodeTag: config.dataTag.formEachTipeAnggota.all.kodeTag + "-EDIT",
      tipeAnggota: "STUDENT",
      instansi: fillDataCheck.instansi[2],
    };

    it("TEST-ID: 6.42 | Kosongkan Nama Tag → klik Simpan", () => {
      cy.visit(config.path);
      cy.wait(800);

      cy.wait(2000);

      editSimpleFillOpenDialogAlternative(
        [fillDataCheck.kodeTag, newData.kodeTag],
        [fillDataCheck.instansi[0], newData.instansi],
      ).then(() => {
        cy.wait(1000);

        simpleFillFormField("Nama Tag", "input", "");

        cy.wait(800);
        cy.contains("button", "Simpan").should("be.visible").click();

        cy.wait(800);

        cy.get("div[data-slot='form-message']").contains(
          config.dialogErrorMessages.namaTagRequired,
        );
      });
    });

    it("TEST-ID: 6.43 | Kosongkan Kode Tag → klik Simpan", () => {
      cy.visit(config.path);
      cy.wait(800);

      cy.wait(2000);

      editSimpleFillOpenDialogAlternative(
        [fillDataCheck.kodeTag, newData.kodeTag],
        [fillDataCheck.instansi[0], newData.instansi],
      ).then(() => {
        cy.wait(1000);

        simpleFillFormField("Kode Tag", "input", "");

        cy.wait(800);
        cy.contains("button", "Simpan").should("be.visible").click();

        cy.wait(800);

        cy.get("div[data-slot='form-message']").contains(
          config.dialogErrorMessages.kodeTagRequired,
        );
      });
    });

    it("TEST-ID: 6.44 | Kosongkan field Status → klik Simpan", () => {
      cy.visit(config.path);
      cy.wait(800);

      cy.wait(2000);

      editSimpleFillOpenDialogAlternative(
        [fillDataCheck.kodeTag, newData.kodeTag],
        [fillDataCheck.instansi[0], newData.instansi],
      ).then(() => {
        cy.wait(1000);

        simpleFillFormField("Status", "select", "Pilih Status");

        cy.wait(800);
        cy.contains("button", "Simpan").should("be.visible").click();

        cy.wait(800);

        cy.get("div[data-slot='form-message']").contains(
          config.dialogErrorMessages.statusRequired,
        );
      });
    });

    it("TEST-ID: 6.45 | Kosongkan Tipe Member → klik Simpan", () => {
      cy.visit(config.path);
      cy.wait(800);

      cy.wait(2000);

      editSimpleFillOpenDialogAlternative(
        [fillDataCheck.kodeTag, newData.kodeTag],
        [fillDataCheck.instansi[0], newData.instansi],
      ).then(() => {
        cy.wait(1000);

        simpleFillFormField("Tipe Anggota", "select", "Pilih Tipe Anggota");

        cy.wait(800);
        cy.contains("button", "Simpan").should("be.visible").click();

        cy.wait(800);

        cy.get("div[data-slot='form-message']").contains(
          config.dialogErrorMessages.tipeAnggotaRequired,
        );
      });
    });

    it("TEST-ID: 6.46 | Ubah Kode Tag jadi kode yang sudah ada di Instansi yang sama (duplikat)", () => {
      cy.visit(config.path);
      cy.wait(800);

      cy.wait(2000);

      editSimpleFillOpenDialogAlternative(
        [fillDataCheck.kodeTag, newData.kodeTag],
        [fillDataCheck.instansi[0], newData.instansi],
      ).then(() => {
        cy.wait(1000);

        simpleFillFormField("Kode Tag", "input", "PRI145-AUTOTEST");

        cy.wait(800);
        cy.contains("button", "Simpan").should("be.visible").click();

        cy.wait(800);

        cy.contains(
          "section[aria-label='Notifications alt+T']",
          "Kode tag sudah digunakan di instansi ini",
        ).should("be.visible");
      });
    });
  });

  describe("TEST-GROUP: 9 | Tag Status - Cross-Feature Visibility Impact [6.47 - 6.48]", () => {
    const fillDataCheck = config.dataTag.formEachTipeAnggota.all;

    it("TEST-ID: 6.47 | Set status tag ke 'Aktif' → buka fitur Data Siswa/Guru/Staff/Tagihan/Presensi Kegiatan", () => {
      cy.visit(config.path);
      cy.wait(800);

      const fillDataBefore = config.dataTag.formEachTipeAnggota.all;
      cy.wait(1200);
      editSimpleFillOpenDialog(
        fillDataBefore.kodeTag,
        fillDataBefore.instansi[0],
      )
        .then((isDialogOpen) => {
          cy.wait(2000);
          if (isDialogOpen) {
            simpleFillFormField("Status", "select", "Aktif");

            cy.wait(800);
            cy.contains("button", "Simpan").should("be.visible").click();

            cy.get("div[role='dialog']", { timeout: 12000 }).should(
              "not.exist",
            );
            cy.contains(
              "section[aria-label='Notifications alt+T']",
              "Tag berhasil diperbarui",
            ).should("be.visible");
          }
        })
        .then(() => {
          namaTagShouldExistOrNot(
            fillDataBefore.namaTag,
            config.pathAndIDCheckDataTag.guru,
            true,
          );

          namaTagShouldExistOrNot(
            fillDataBefore.namaTag,
            config.pathAndIDCheckDataTag.siswa,
            true,
          );

          namaTagShouldExistOrNot(
            fillDataBefore.namaTag,
            config.pathAndIDCheckDataTag.staff,
            true,
          );
        });
    });

    it("TEST-ID: 6.48 | Set status tag ke 'Tidak Aktif' → buka fitur terkait", () => {
      cy.visit(config.path);
      cy.wait(800);

      const fillDataBefore = config.dataTag.formEachTipeAnggota.all;
      cy.wait(1200);
      editSimpleFillOpenDialog(
        fillDataBefore.kodeTag,
        fillDataBefore.instansi[0],
      )
        .then((isDialogOpen) => {
          cy.wait(2000);
          if (isDialogOpen) {
            simpleFillFormField("Status", "select", "Tidak Aktif");

            cy.wait(800);
            cy.contains("button", "Simpan").should("be.visible").click();

            cy.get("div[role='dialog']", { timeout: 12000 }).should(
              "not.exist",
            );
            cy.contains(
              "section[aria-label='Notifications alt+T']",
              "Tag berhasil diperbarui",
            ).should("be.visible");
          }
        })
        .then(() => {
          namaTagShouldExistOrNot(
            fillDataBefore.namaTag,
            config.pathAndIDCheckDataTag.guru,
            false,
          );

          namaTagShouldExistOrNot(
            fillDataBefore.namaTag,
            config.pathAndIDCheckDataTag.siswa,
            false,
          );

          namaTagShouldExistOrNot(
            fillDataBefore.namaTag,
            config.pathAndIDCheckDataTag.staff,
            false,
          );
        });
    });
  });

  describe("TEST-GROUP: 10 | Delete Tag - Confirmation & Data Cleanup [6.49 - 6.54 ]", () => {
    it("TEST-ID: 6.49 | Klik Aksi → 'Hapus' di row tag", () => {
      cy.visit(config.path);
      cy.wait(800);

      const fillDataBefore = config.dataTag.formEachTipeAnggota.all;
      cy.wait(1200);

      const target = fillDataBefore.kodeTag;
      const instansi = fillDataBefore.instansi[0];

      waitUntilLoadingAnimationGone().then(() => {
        cy.wait(1200);
        cy.get("body").then(($body) => {
          const found =
            $body.find(`tr:contains(${target}):contains(${instansi})`).length >
            0;
          if (found) {
            cy.wait(800);
            cy.get(`tr:contains(${target}):contains(${instansi})`)
              .find("svg.lucide-trash")
              .closest("button")
              .click();

            cy.wait(800);
            cy.contains("div[role='dialog']", "Hapus Tag").should("be.visible");

            cy.contains("button", "Hapus").should("be.visible");
            cy.contains("button", "Batal").should("be.visible");
          }
        });
      });
    });

    it("TEST-ID: 6.50 | Klik btn 'Hapus' di popup konfirmasi", () => {
      cy.visit(config.path);
      cy.wait(800);

      const fillDataBefore = config.dataTag.formEachTipeAnggota.all;
      cy.wait(1200);

      const target = fillDataBefore.kodeTag;
      const instansi = fillDataBefore.instansi[0];

      waitUntilLoadingAnimationGone().then(() => {
        cy.wait(1200);

        deleteSimpleFill(target, instansi);

        cy.wait(800);
        cy.contains("div[role='dialog']", "Hapus Tag").should("not.exist");
        cy.contains(
          "section[aria-label='Notifications alt+T']",
          "Tag berhasil dihapus",
        ).should("be.visible");
      });
    });

    it("TEST-ID: 6.51 | Buka popup Hapus → klik btn 'Batal'", () => {
      cy.visit(config.path);
      cy.wait(800);

      const fillDataBefore = config.dataTag.formEachTipeAnggota.teacher;
      cy.wait(1200);

      const target = fillDataBefore.kodeTag;
      const instansi = fillDataBefore.instansi[0];

      waitUntilLoadingAnimationGone().then(() => {
        cy.wait(1200);

        deleteSimpleFillCancel(target, instansi);

        cy.wait(800);
        cy.contains("div[role='dialog']", "Hapus Tag").should("not.exist");
      });
    });

    it("TEST-ID: 6.52 | Buka popup Hapus → tekan Esc di keyboard", () => {
      cy.visit(config.path);
      cy.wait(800);

      const fillDataBefore = config.dataTag.formEachTipeAnggota.teacher;
      cy.wait(1200);

      const target = fillDataBefore.kodeTag;
      const instansi = fillDataBefore.instansi[0];

      waitUntilLoadingAnimationGone().then(() => {
        cy.wait(1200);

        deleteSimpleFillCancel(target, instansi, true);

        cy.wait(800);
        cy.contains("div[role='dialog']", "Hapus Tag").should("not.exist");
      });
    });

    it("TEST-ID: 6.53 | Search sampai hasil tinggal 1 row → hapus row tersebut", () => {
      cy.visit(config.path);
      cy.wait(800);

      const fillDataBefore = config.dataTag.formEachTipeAnggota.student;
      cy.wait(1200);

      cy.get("input[placeholder='Cari'][data-slot='input']").type(
        fillDataBefore.kodeTag,
      );
      cy.wait(2000);

      waitUntilLoadingAnimationGone().then(() => {
        cy.wait(1200);

        deleteSimpleFill(fillDataBefore.kodeTag, fillDataBefore.instansi[0]);

        cy.wait(800);
        cy.contains("div[role='dialog']", "Hapus Tag").should("not.exist");
        cy.contains(
          "section[aria-label='Notifications alt+T']",
          "Tag berhasil dihapus",
        ).should("be.visible");

        cy.wait(2000);

        cy.get("tbody tr").each(($row) => {
          cy.wrap($row).within(() => {
            cy.get("td").should("contain.text", "Data Tag tidak ditemukan");
          });
        });
      });
    });

    it("TEST-ID: 6.54 | Hapus tag → buka fitur Data Siswa / Presensi Kegiatan / Membuat Tagihan", () => {
      cy.visit(config.path);
      cy.wait(800);

      const fillDataBefore = config.dataTag.formEachTipeAnggota.student;
      cy.wait(1200);

      waitUntilLoadingAnimationGone().then(() => {
        cy.wait(1200);

        namaTagShouldExistOrNot(
          fillDataBefore.namaTag,
          config.pathAndIDCheckDataTag.siswa,
          false,
        );
        namaTagShouldExistOrNot(
          fillDataBefore.namaTag,
          config.pathAndIDCheckDataTag.guru,
          false,
        );
        namaTagShouldExistOrNot(
          fillDataBefore.namaTag,
          config.pathAndIDCheckDataTag.tagihan,
          false,
        );
      });
    });
  });
});
