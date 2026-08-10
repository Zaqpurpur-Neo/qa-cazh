import {
  configAcademicAlumniSiswa,
  name,
  id,
  group,
  _localLoginSession,
  uncaughtHandle,
} from "./extends";

[name("AGT")];
describe("TEST-CASE: 5.XX | Anggota Alumni Siswa", () => {
  beforeEach(() => {
    cy.viewport(1600, 1000);

    _localLoginSession();
    uncaughtHandle();
  });

  [group(5.1, 5.9)];
  describe("1. Alumni Student List - View, Sort, Search, Filter & Pagination @AGT", () => {});

  [group("5.10", 5.14)];
  describe("2. Alumni Student List - Excel Export Scenarios & Reset Filter @AGT", () => {});

  [group(5.15, 5.29)];
  describe("3. Alumni Student Detail - Profile & Personal Data Validation @AGT", () => {});

  [group("5.30", 5.33)];
  describe("4. Alumni Student Detail - Parent Data Tab Operations @AGT", () => {});

  [group(5.34, 5.42)];
  describe("5. Alumni Student Detail - Card, User, Wallet & Actions @AGT", () => {});

  [group(5.43, 5.59)];
  describe("6. Alumni Student Detail - Billing & Documents Tab Operations @AGT", () => {});

  [group("5.60", 5.72)];
  describe("7. Main List - Bulk Actions, Activation & Downloads @AGT", () => {});

  [group(5.73, 5.81)];
  describe("8. Alumni Student Management - Add Alumni Student Form @AGT", () => {});

  [group(5.82, 5.98)];
  describe("9. Alumni Student Management - Import Data & Import Log @AGT", () => {});
});
