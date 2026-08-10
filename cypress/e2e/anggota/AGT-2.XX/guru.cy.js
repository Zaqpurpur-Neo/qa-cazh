import {
  configAcademicGuru,
  name,
  id,
  group,
  _localLoginSession,
  uncaughtHandle,
} from "./extends";

[name("AGT")];
describe("TEST-CASE: 2.XX | Anggota Guru", () => {
  beforeEach(() => {
    cy.viewport(1600, 1000);

    _localLoginSession();
    uncaughtHandle();
  });

  [group(2.1, 2.1)];
  describe("1. Teacher List - View, Sort, Search & Filter @AGT", () => {});

  [group(2.11, 2.14)];
  describe("2. Teacher List - Excel Export Scenarios @AGT", () => {});

  [group(2.15, 2.27)];
  describe("3. Teacher Detail - Profile & Basic Info Validation @AGT", () => {});

  [group(2.28, 2.44)];
  describe("4. Teacher Detail - Card, User, Wallet & Actions @AGT", () => {});

  [group(2.45, 2.47)];
  describe("5. Teacher Detail - Billing Tab Overview @AGT", () => {});

  [group(2.48, 2.6)];
  describe("6. Teacher Detail - Documents Tab Operations @AGT", () => {});

  [group(2.61, 2.85)];
  describe("7. Teacher Detail - Permission Tab & Bulk Delete @AGT", () => {});

  [group(2.86, 2.97)];
  describe("8. Main List - Bulk Actions & Operations @AGT", () => {});

  [group(2.98, 2.104)];
  describe("9. Teacher Management - Import Data @AGT", () => {});

  [group(2.105, 2.112)];
  describe("10. Teacher Management - Add Teacher Form @AGT", () => {});

  [group(2.113, 2.12)];
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

  [group(2.19, 2.207)];
  describe("18. Teacher Detail - Perizinan Deep Dive & Attendance Sync @AGT", () => {});

  [group(2.208, 2.218)];
  describe("19. Teacher Detail - Data Diri 20 Fields & PDF Print @AGT", () => {});

  [group(2.219, 2.235)];
  describe("20. Teacher Detail - Class Schedule & Access Control @AGT", () => {});
});
