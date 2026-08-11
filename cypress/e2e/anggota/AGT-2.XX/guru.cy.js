import { parseExcel } from "../../../support/utilsExcel";
import {
  configAcademicGuru,
  name,
  id,
  group,
  _localLoginSession,
  uncaughtHandle,
  buttonDropdownSelect,
  buttonDropdownTableColumnMenuItem,
  searchInput,
  waitUntilLoadingAnimationGone,
  forEachWrap,
  filterButtonClick,
  buttonClick,
} from "./extends";

[name("AGT")];
describe("TEST-CASE: 2.XX | Anggota Guru", () => {
  beforeEach(() => {
    cy.viewport(1600, 1000);

    _localLoginSession();
    uncaughtHandle();
  });

  [group(2.1, "2.10")];
  describe("1. Teaceher List - View, Sort, Search & Filter @AGT", () => {
    [id(2.1)];
    it("Load halaman Guru", () => {
      cy.visit(configAcademicGuru.path);
      cy.wait(800);

      const tableHeader = configAcademicGuru.misc.tableHeader;

      cy.get("thead tr th").each((header, index) => {
        cy.wrap(header).should("contain.text", tableHeader[index]);
      });
    });

    [id(2.2)];
    it("Buka halaman Guru saat belum ada data", () => {
      // intercept
      cy.visit(configAcademicGuru.path);
      cy.wait(800);

      cy.intercept(
        "GET",
        "https://v3.cazh.id/api/proxy/teachers?page=1&limit=10&type=TEACHER&status=ACTIVE%2CINACTIVE",
        {
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
        },
      );

      waitUntilLoadingAnimationGone().then(() => {
        cy.get("tbody td").should("contain.text", "Data Guru tidak ditemukan");
      });
    });

    [id(2.3)];
    it("Cek default sort list guru", () => {
      cy.visit(configAcademicGuru.path);
      cy.wait(800);

      waitUntilLoadingAnimationGone().then(() => {
        buttonDropdownSelect("10", "50", "10")
          .then(waitUntilLoadingAnimationGone)
          .then(() => {
            return buttonDropdownTableColumnMenuItem(
              "Nama",
              "Menaik",
              "Menaik",
              false,
            );
          })
          .then(() => {
            // nth second column
            cy.get("tbody tr td:nth-child(2) p").then(($paragraphs) => {
              // 1. Ekstrak dan bersihkan teks dari elemen <p>
              const originalNames = [...$paragraphs].map((p) =>
                p.textContent.trim().toLowerCase(),
              );
              // 2. Buat salinan yang terurut dengan localeCompare dan sensitivity 'base'
              const sortedNames = [...originalNames].sort((a, b) =>
                a.localeCompare(b, undefined, { sensitivity: "base" }),
              );
              cy.log(
                JSON.stringify(originalNames),
                JSON.stringify(sortedNames),
              );
              // 3. Pastikan urutannya sama
              expect(originalNames).to.deep.equal(sortedNames);
            });
          });
      });
    });

    [id(2.4)];
    it("Ketik Nama Guru di search box", () => {
      cy.visit(configAcademicGuru.path);
      cy.wait(800);

      const input = configAcademicGuru.dataSearch.nama;
      searchInput(input);

      waitUntilLoadingAnimationGone().then(() => {
        cy.get("table tbody tr").each((row) => {
          cy.wrap(row).should("contain", input);
        });
      });
    });

    [id(2.5)];
    it("Ketik Nomor Kartu / Jenis / Instansi di search box", () => {
      cy.visit(configAcademicGuru.path);
      cy.wait(800);

      const listInput = [
        configAcademicGuru.dataSearch.nama,
        configAcademicGuru.dataSearch.nomorKartu,
        configAcademicGuru.dataSearch.jenis,
        configAcademicGuru.dataSearch.instansi,
      ];

      forEachWrap(listInput, (item, idx) => {
        searchInput(item);
        waitUntilLoadingAnimationGone().then(() => {
          cy.get("table tbody tr").each((row) => {
            cy.wrap(row).should("contain", item);
          });
        });
        cy.wait(800);
        searchInput("");
      });
    });

    [id(2.6)];
    it("Search dengan keyword yang tidak match", () => {
      cy.visit(configAcademicGuru.path);
      cy.wait(800);

      searchInput("Apapun Itu");
      waitUntilLoadingAnimationGone().then(() => {
        cy.get("tbody td").should("contain.text", "Data Guru tidak ditemukan");
      });
    });

    [id(2.7)];
    it("Aktifkan Filter Instansi", () => {
      cy.visit(configAcademicGuru.path);
      cy.wait(800);

      const instansiTypeChoosen = configAcademicGuru.misc.instansiType[4];
      filterButtonClick(instansiTypeChoosen);

      waitUntilLoadingAnimationGone().then(() => {
        cy.get("tbody tr").each(($row) => {
          cy.wrap($row).within(() => {
            cy.get("td").should("contain.text", instansiTypeChoosen);
          });
        });
      });
    });

    [id(2.8)];
    it("Aktifkan Filter Jenis", () => {
      cy.visit(configAcademicGuru.path);
      cy.wait(800);

      const instansiTypeChoosen = configAcademicGuru.misc.instansiType[4];
      const jenisGuruChoosen = "Guru Tetap";
      filterButtonClick(instansiTypeChoosen, jenisGuruChoosen);

      waitUntilLoadingAnimationGone().then(() => {
        cy.get("tbody tr").each(($row) => {
          cy.wrap($row).within(() => {
            cy.get("td").should("contain.text", instansiTypeChoosen);
            cy.get("td").should("contain.text", jenisGuruChoosen);
          });
        });
      });
    });

    [id(2.9)];
    it("Aktifkan Filter Status (Aktif / Tidak Aktif)", () => {
      cy.visit(configAcademicGuru.path);
      cy.wait(800);

      filterButtonClick("Semua", "Semua", "Tidak Aktif");

      waitUntilLoadingAnimationGone().then(() => {
        cy.get("tbody tr").each(($row) => {
          cy.wrap($row).within(() => {
            cy.get("td").should("contain.text", "Tidak Aktif");
          });
        });
      });
    });

    [id("2.10")];
    it("Filter aktif tidak ada hasil match", () => {
      cy.visit(configAcademicGuru.path);
      cy.wait(800);

      const instansiTypeChoosen = configAcademicGuru.misc.instansiType[4];
      const jenisGuruChoosen = "Guru Tetap";
      filterButtonClick(instansiTypeChoosen, jenisGuruChoosen, "Tidak Aktif");

      waitUntilLoadingAnimationGone().then(() => {
        cy.get("tbody td").should("contain.text", "Data Guru tidak ditemukan");
      });
    });
  });

  [group(2.11, 2.14)];
  describe("2. Teacher List - Excel Export Scenarios @AGT", () => {
    [id("2.11")];
    it("Klik Excel untuk Export tanpa filter/checklist", () => {
      cy.visit(configAcademicGuru.path);
      cy.wait(800);

      const excelHeader = configAcademicGuru.misc.excelHeader;
      const excelFilePath = configAcademicGuru.misc.excelFilePath;

      cy.task("deleteFolder", excelFilePath);

      waitUntilLoadingAnimationGone()
        .wait(2000)
        .then(() => {
          buttonClick("Excel");

          cy.task("getLatestDownloadedFile", {
            folderPath: excelFilePath,
            timeout: 12000,
          }).then((latestFile) => {
            const filePath = excelFilePath + latestFile;
            expect(filePath).to.exist;

            parseExcel(filePath).then((data) => {
              if (data && data.length > 0) {
                const keys = Object.keys(data[0]);

                cy.log(JSON.stringify(keys), JSON.stringify(excelHeader));
                expect(keys).to.deep.equal(excelHeader);
              }
            });
          });
        });
    });

    [id("2.12")];
    it("Aktifkan filter → klik Excel, Sistem hanya export data yang sesuai filter", () => {
      cy.visit(configAcademicGuru.path);
      cy.wait(800);

      const instansiTypeChoosen = configAcademicGuru.misc.instansiType[4];
      filterButtonClick(instansiTypeChoosen);

      const excelFilePath = configAcademicGuru.misc.excelFilePath;
      cy.task("deleteFolder", excelFilePath);

      waitUntilLoadingAnimationGone()
        .wait(2000)
        .then(() => {
          buttonClick("Excel");

          cy.task("getLatestDownloadedFile", {
            folderPath: excelFilePath,
            timeout: 12000,
          }).then((latestFile) => {
            const filePath = excelFilePath + latestFile;
            expect(filePath).to.exist;

            parseExcel(filePath).then((data) => {
              if (data && data.length > 0) {
                forEachWrap(data, (item) => {
                  expect(item["Instansi"]).to.eq(instansiTypeChoosen);
                });
              }
            });
          });
        });
    });

    [id(2.13)];
    it("Search data → klik Excel, Sistem hanya export data hasil pencarian", () => {
      cy.visit(configAcademicGuru.path);
      cy.wait(800);

      searchInput("Fajar Guru");
      const excelFilePath = configAcademicGuru.misc.excelFilePath;
      cy.task("deleteFolder", excelFilePath);

      waitUntilLoadingAnimationGone()
        .wait(2000)
        .then(() => {
          buttonClick("Excel");

          cy.task("getLatestDownloadedFile", {
            folderPath: excelFilePath,
            timeout: 12000,
          }).then((latestFile) => {
            const filePath = excelFilePath + latestFile;
            expect(filePath).to.exist;

            parseExcel(filePath).then((data) => {
              if (data && data.length > 0) {
                forEachWrap(data, (item) => {
                  expect(item["Nama Lengkap"]).to.eq("Fajar Guru");
                });
              }
            });
          });
        });
    });

    [id(2.14)];
    it("Checklist beberapa guru → klik Excel, Sistem hanya export data yang di-checklist", () => {
      cy.visit(configAcademicGuru.path);
      cy.wait(800);
      const chosenName = ["Fajar Guru", "ahmed", "david", "Guru Rara"];
      const excelFilePath = configAcademicGuru.misc.excelFilePath;
      cy.task("deleteFolder", excelFilePath);

      cy.wait(2000);

      waitUntilLoadingAnimationGone()
        .then(() => {
          forEachWrap(chosenName, (name) => {
            cy.get("tbody tr").each(($row) => {
              const cellText = $row.find("td:nth-child(2) p").text().trim();
              if (cellText === name) {
                cy.wrap($row)
                  .find("td:nth-child(1) button[role='checkbox']")
                  .click({ force: true });

                return false;
              }
            });
          });
        })
        .wait(2000)
        .then(() => {
          buttonClick("Excel");

          cy.task("getLatestDownloadedFile", {
            folderPath: excelFilePath,
            timeout: 12000,
          }).then((latestFile) => {
            const filePath = excelFilePath + latestFile;
            expect(filePath).to.exist;

            parseExcel(filePath).then((data) => {
              if (data && data.length > 0) {
                forEachWrap(data, (item) => {
                  cy.wrap(chosenName).should("contain", item["Nama Lengkap"]);
                });
              }
            });
          });
        });
    });
  });

  [group(2.15, 2.27)];
  describe.only("3. Teacher Detail - Profile & Basic Info Validation @AGT", () => {
    [id(2.15)];
    it("Klik Aksi → Lihat di row guru", () => {});
  });

  [group(2.28, 2.44)];
  describe("4. Teacher Detail - Card, User, Wallet & Actions @AGT", () => {});

  [group(2.45, 2.47)];
  describe("5. Teacher Detail - Billing Tab Overview @AGT", () => {});

  [group(2.48, "2.60")];
  describe("6. Teacher Detail - Documents Tab Operations @AGT", () => {});

  [group(2.61, 2.85)];
  describe("7. Teacher Detail - Permission Tab & Bulk Delete @AGT", () => {});

  [group(2.86, 2.97)];
  describe("8. Main List - Bulk Actions & Operations @AGT", () => {});

  [group(2.98, 2.104)];
  describe("9. Teacher Management - Import Data @AGT", () => {});

  [group(2.105, 2.112)];
  describe("10. Teacher Management - Add Teacher Form @AGT", () => {});

  [group(2.113, "2.120")];
  describe("11. Main List - Institution Transfer @AGT", () => {});

  [group(2.121, 2.126)];
  describe("12. Teacher Detail - Tagihan Tab Deep Dive @AGT", () => {});

  [group(2.127, 2.134)];
  describe("13. Teacher Detail - Dokumen Tab Deep Dive @AGT", () => {});

  [group(2.135, 2.148)];
  describe("14. Main List - Bulk Status & Type Updates @AGT", () => {});

  [group(2.149, 2.153)];
  describe("15. Main List - Bulk Download Cards & Formatting @AGT", () => {});

  [group(2.154, 2.165)];
  describe("16. Teacher Detail - Kartu & Transactions Deep Dive @AGT", () => {});

  [group(2.166, 2.189)];
  describe("17. Teacher Detail - Health Tab (Kesehatan) @AGT", () => {});

  [group("2.190", 2.207)];
  describe("18. Teacher Detail - Perizinan Deep Dive & Attendance Sync @AGT", () => {});

  [group(2.208, 2.218)];
  describe("19. Teacher Detail - Data Diri 20 Fields & PDF Print @AGT", () => {});

  [group(2.219, 2.235)];
  describe("20. Teacher Detail - Class Schedule & Access Control @AGT", () => {});
});
