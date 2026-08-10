import {
  configMapel,
  simpleFillFormField,
  buttonClick,
  checkNotificationOpen,
  _localLoginSession,
  uncaughtHandle,
  waitUntilLoadingAnimationGone,
  openTambahMapel,
  dialogShouldClose,
  deleteSimpleFill,
  deleteSimpleFillCancel,
  deleteSimpleFillWithNamaMapel,
  forEachWrap,
  errorFormMessage,
  forLoopWrap,
  isItemExist,
  id,
  name,
  group,
  buttonDropdownSelect,
} from "./extends";

[name("PGT")];
describe("TEST-CASE: 7.XX | Mata Pelajaran", () => {
  beforeEach(() => {
    cy.viewport(1600, 1000);

    _localLoginSession();
    uncaughtHandle();
  });

  [group(7.1, 7.6)];
  describe("1. Add Subject - Creation & Code Generation @PGT", () => {
    [id(7.1)];
    it("Isi form Tambah Mata Pelajaran dengan semua field (Instansi + Nama MP + Kode) → klik Simpan", () => {
      cy.visit(configMapel.path);
      cy.wait(800);

      const fillData = configMapel.dataMapel.simpleFillFirst;
      cy.then(() => {
        cy.wait(1200);
        deleteSimpleFill(fillData.kodeMapel, fillData.instansi[0]);
      });

      waitUntilLoadingAnimationGone().then(() => {
        openTambahMapel();

        simpleFillFormField("Instansi", "select", fillData.instansi[0]);
        simpleFillFormField("Mata Pelajaran", "input", fillData.mataPelajaran);
        simpleFillFormField("Kode Mata Pelajaran", "input", fillData.kodeMapel);

        buttonClick();

        dialogShouldClose();
        checkNotificationOpen("Mata pelajaran berhasil ditambahkan");
      });
    });

    [id(7.2)];
    it("Isi form tanpa Kode (Instansi + Nama MP saja, Kode dikosongkan) → klik Simpan", () => {
      cy.visit(configMapel.path);
      cy.wait(800);

      const fillData = configMapel.dataMapel.simpleFillNoKode;
      cy.then(() => {
        cy.wait(1200);
        deleteSimpleFillWithNamaMapel(
          fillData.mataPelajaran,
          fillData.instansi[0],
        );
      });

      waitUntilLoadingAnimationGone().then(() => {
        openTambahMapel();

        simpleFillFormField("Instansi", "select", fillData.instansi[0]);
        simpleFillFormField("Mata Pelajaran", "input", fillData.mataPelajaran);
        simpleFillFormField("Kode Mata Pelajaran", "input", fillData.kodeMapel);

        buttonClick();

        dialogShouldClose();
        checkNotificationOpen("Mata pelajaran berhasil ditambahkan");
      });
    });

    [id(7.3)];
    it("Klik btn 'Tambah Mata Pelajaran' di halaman list", () => {
      cy.visit(configMapel.path);
      cy.wait(800);

      waitUntilLoadingAnimationGone().then(() => {
        openTambahMapel();

        cy.contains("label", "Instansi")
          .should("be.visible")
          .closest('[data-slot="form-item"]')
          .find("select")
          .should("have.value", "");
        cy.log("Instansi field is visible and has no value");

        cy.contains("label", "Mata Pelajaran")
          .should("be.visible")
          .closest('[data-slot="form-item"]')
          .find("input")
          .should("have.value", "");
        cy.log("Mata Pelajaran field is visible and has no value");

        cy.contains("label", "Kode Mata Pelajaran")
          .should("be.visible")
          .closest('[data-slot="form-item"]')
          .find("input")
          .should("have.value", "");
        cy.log("Kode Mata Pelajaran field is visible and has no value");

        cy.wait(200);
        cy.contains("button", "Batal").should("be.visible").click();
        cy.log("Batal button is visible");
      });
    });

    [id(7.4)];
    it("Isi form → klik btn Batal", () => {
      cy.visit(configMapel.path);
      cy.wait(800);

      const fillData = configMapel.dataMapel.simpleFillFirst;

      waitUntilLoadingAnimationGone().then(() => {
        openTambahMapel();

        simpleFillFormField("Instansi", "select", fillData.instansi[0]);
        simpleFillFormField("Mata Pelajaran", "input", fillData.mataPelajaran);
        simpleFillFormField("Kode Mata Pelajaran", "input", fillData.kodeMapel);

        buttonClick("Batal");

        dialogShouldClose();
        // checkNotificationOpen("Mata pelajaran berhasil ditambahkan");
      });
    });

    [id(7.5)];
    it("Tambah beberapa mata pelajaran berbeda di 1 Instansi yang sama (misal Matematika, IPA, IPS)", () => {
      cy.visit(configMapel.path);
      cy.wait(800);

      const fillDataMulti = configMapel.dataMapel.multiFill;

      waitUntilLoadingAnimationGone().then(() => {
        forEachWrap(Object.values(fillDataMulti), (item, index) => {
          cy.wait(1200);
          deleteSimpleFill(item.kodeMapel, item.instansi[0]);
        });

        forEachWrap(Object.values(fillDataMulti), (item, index) => {
          openTambahMapel();

          simpleFillFormField("Instansi", "select", item.instansi[0]);
          simpleFillFormField("Mata Pelajaran", "input", item.mataPelajaran);
          simpleFillFormField("Kode Mata Pelajaran", "input", item.kodeMapel);

          buttonClick();

          dialogShouldClose();
          checkNotificationOpen("Mata pelajaran berhasil ditambahkan");

          cy.wait(800);
        });
      });
    });

    [id(7.6)];
    it("Tambah 2 mata pelajaran dengan Nama SAMA tapi Instansi BERBEDA (misal 'Matematika' di SDIT + di Sekolah Alam)", () => {
      cy.visit(configMapel.path);
      cy.wait(800);

      const fillDataMulti = configMapel.dataMapel.fillDifferentInstansi;

      waitUntilLoadingAnimationGone().then(() => {
        forLoopWrap(0, 1, (item, index) => {
          cy.wait(1200);
          deleteSimpleFill(
            fillDataMulti.kodeMapel,
            fillDataMulti.instansi[index],
          );
        });

        forLoopWrap(0, 1, (item, index) => {
          openTambahMapel();

          simpleFillFormField(
            "Instansi",
            "select",
            fillDataMulti.instansi[index],
          );
          simpleFillFormField(
            "Mata Pelajaran",
            "input",
            fillDataMulti.mataPelajaran,
          );
          simpleFillFormField(
            "Kode Mata Pelajaran",
            "input",
            fillDataMulti.kodeMapel,
          );

          buttonClick();

          dialogShouldClose();
          checkNotificationOpen("Mata pelajaran berhasil ditambahkan");

          cy.wait(800);
        });
      });
    });
  });

  [group(7.7, 7.13)];
  describe("2. Add Subject - Validation & Formatting Rules @PGT", () => {
    [id(7.7)];
    it("Isi Nama MP tapi tidak pilih Instansi → klik Simpan", () => {
      cy.visit(configMapel.path);
      cy.wait(800);

      const fillData = configMapel.dataMapel.simpleFillFirst;

      waitUntilLoadingAnimationGone().then(() => {
        openTambahMapel();

        simpleFillFormField("Mata Pelajaran", "input", fillData.mataPelajaran);

        buttonClick();
        errorFormMessage(configMapel.dialogErrorMessages.instansiRequired);
      });
    });

    [id(7.8)];
    it("Pilih Instansi tapi kosongkan Nama Mata Pelajaran → klik Simpan", () => {
      cy.visit(configMapel.path);
      cy.wait(800);

      const fillData = configMapel.dataMapel.simpleFillFirst;

      openTambahMapel();

      simpleFillFormField("Instansi", "select", fillData.instansi[0]);

      buttonClick();
      errorFormMessage(configMapel.dialogErrorMessages.mataPelajaranRequired);
    });

    [id(7.9)];
    it("Klik Simpan tanpa isi field required apapun", () => {
      cy.visit(configMapel.path);
      cy.wait(800);

      const fillData = configMapel.dataMapel.simpleFillFirst;

      openTambahMapel();

      buttonClick();
      errorFormMessage(configMapel.dialogErrorMessages.mataPelajaranRequired);
      errorFormMessage(configMapel.dialogErrorMessages.instansiRequired);
    });

    [id("7.10")];
    it("Tambah mata pelajaran dengan nama & instansi yang sudah ada (duplikat)", () => {
      cy.visit(configMapel.path);
      cy.wait(800);

      const fillData = configMapel.dataMapel.simpleFillFirst;

      waitUntilLoadingAnimationGone().then(() => {
        openTambahMapel();

        simpleFillFormField("Instansi", "select", fillData.instansi[0]);
        simpleFillFormField("Mata Pelajaran", "input", fillData.mataPelajaran);

        buttonClick();
        checkNotificationOpen("Mata pelajaran dengan nama tersebut sudah ada");
      });
    });

    [id(7.11)];
    it("Isi Nama MP dengan spasi saja (whitespace only) → klik Simpan", () => {
      cy.visit(configMapel.path);
      cy.wait(800);

      const fillData = configMapel.dataMapel.simpleFillFirst;

      openTambahMapel();
      simpleFillFormField("Instansi", "select", fillData.instansi[0]);
      simpleFillFormField("Mata Pelajaran", "input", " ");
      buttonClick();

      errorFormMessage(configMapel.dialogErrorMessages.mataPelajaranRequired);
    });

    [id(7.12)];
    it("Input Nama MP dengan spasi di awal & akhir (misal '  Matematika  ') → klik Simpan", () => {
      cy.visit(configMapel.path);
      cy.wait(800);

      const fillData = configMapel.dataMapel.fillAutoTrimmed;
      waitUntilLoadingAnimationGone().then(() => {
        cy.wait(1200);
        deleteSimpleFill(fillData.kodeMapel, fillData.instansi[0]);

        openTambahMapel();
        simpleFillFormField("Instansi", "select", fillData.instansi[0]);
        simpleFillFormField("Mata Pelajaran", "input", fillData.mataPelajaran);
        simpleFillFormField("Kode Mata Pelajaran", "input", fillData.kodeMapel);
        buttonClick();

        waitUntilLoadingAnimationGone().then(() => {
          isItemExist(fillData.mataPelajaran.trim(), fillData.instansi[0]);
        });
      });
    });

    [id(7.13)];
    it("Input Nama MP sangat panjang (>255 karakter) → klik Simpan", () => {
      cy.visit(configMapel.path);
      cy.wait(800);

      const fillData = configMapel.dataMapel.fillAutoTrimmed;

      openTambahMapel();
      simpleFillFormField("Instansi", "select", fillData.instansi[0]);
      simpleFillFormField("Mata Pelajaran", "input", "a".repeat(256));
      buttonClick();
    });
  });

  [group(7.14, 7.17)];
  describe("3. Subject List - Rendering & Initial State @PGT", () => {
    [id(7.14)];
    it("Load halaman list Mata Pelajaran", () => {
      cy.visit(configMapel.path);
      cy.wait(800);

      const tableHeader = configMapel.misc.tableHeader;

      cy.get("thead th").should("have.length", tableHeader.length);

      cy.get("thead th").each((header, index) => {
        cy.wrap(header).should("contain", tableHeader[index]);
      });
    });

    [id(7.15)];
    it("Cek setiap row di list Mata Pelajaran, Aksi Edit (pencil icon) & Hapus (trash icon)", () => {
      cy.visit(configMapel.path);
      cy.wait(800);

      cy.get("thead th").should(
        "have.length",
        configMapel.misc.tableHeader.length,
      );

      waitUntilLoadingAnimationGone().then(() => {
        cy.get("tbody tr").each((row) => {
          cy.wrap(row).within(() => {
            cy.get("svg.lucide-square-pen").should("have.length", 1);
            cy.get("svg.lucide-trash").should("have.length", 1);
          });
        });
      });

      cy.get("tbody tr").each((row) => {
        cy.wrap(row).within(() => {
          cy.get("svg.lucide-square-pen").should("have.length", 1);
          cy.get("svg.lucide-trash").should("have.length", 1);
        });
      });
    });

    [id(7.16)];
    it("Buka halaman list Mata Pelajaran saat belum ada data", () => {
      cy.visit(configMapel.path);
      cy.wait(800);

      cy.intercept(
        "GET",
        "https://v3.cazh.id/api/proxy/school-courses?page=1&limit=50",
        {
          statusCode: 200,
          body: {
            status: true,
            message: "OK",
            data: [],
            meta: {
              page: 1,
              limit: 50,
              total_count: 0,
            },
          },
        },
      );

      waitUntilLoadingAnimationGone().then(() => {
        cy.get("tbody td").should(
          "contain.text",
          "Data Mata Pelajaran tidak ditemukan",
        );
      });
    });

    [id(7.17)];
    it("Tambah 2 mata pelajaran berturut-turut → reload halaman", () => {
      cy.visit(configMapel.path);
      cy.wait(800);

      const fillDataTwice = configMapel.dataMapel.formFillTwice;
      const arrayFillData = Object.values(fillDataTwice);

      forEachWrap(arrayFillData, (item, index) => {
        cy.wait(1200);
        deleteSimpleFill(item.kodeMapel, item.instansi[0]);
      });

      forEachWrap(arrayFillData, (item, index) => {
        openTambahMapel();

        simpleFillFormField("Instansi", "select", item.instansi[0]);
        simpleFillFormField("Mata Pelajaran", "input", item.mataPelajaran);
        simpleFillFormField("Kode Mata Pelajaran", "input", item.kodeMapel);

        buttonClick();

        checkNotificationOpen("Mata pelajaran berhasil ditambahkan");
        cy.wait(800);
      });
    });
  });

  [group(7.18, 7.23)];
  describe.only("4. Subject List - Filtering Scenarios @PGT", () => {
    [id(7.18)];
    it("Aktifkan Filter Instansi (pilih 1 instansi)", () => {
      cy.visit(configMapel.path);
      cy.wait(800);

      const fillData = configMapel.dataMapel.simpleFillFirst;

      waitUntilLoadingAnimationGone().then(() => {
        buttonDropdownSelect("Instansi", fillData.instansi[0], "Semua")
          .then(waitUntilLoadingAnimationGone)
          .then(() => {
            cy.get("tbody tr").each(($row) =>
              cy.wrap($row).within(() => {
                cy.get("td").first().should("have.text", fillData.instansi[0]);
              }),
            );
          });
      });
    });
  });

  [group(7.24, 7.28)];
  describe("5. Subject List - Search Functionality @PGT", () => {});

  [group(7.29, 7.36)];
  describe("6. Edit Subject - Success Flow & Field Updates @PGT", () => {});

  [group(7.37, 7.39)];
  describe("7. Edit Subject - Validation & Constraints @PGT", () => {});

  [group(7.4, 7.41)];
  describe("8. Subject Status - Cross-Feature Visibility Impact @PGT", () => {});

  [group(7.42, 7.47)];
  describe("9. Delete Subject - Confirmation & Data Cleanup @PGT", () => {});
});
