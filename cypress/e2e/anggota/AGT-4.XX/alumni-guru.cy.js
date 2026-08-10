import {
  configAcademicAlumniGuru,
  name,
  id,
  group,
  _localLoginSession,
  uncaughtHandle,
} from "./extends";

[name("AGT")];
describe("TEST-CASE: 4.XX | Anggota Alumni Guru", () => {
  beforeEach(() => {
    cy.viewport(1600, 1000);

    _localLoginSession();
    uncaughtHandle();
  });

  [group(4.1, 4.8)];
  describe("1. Alumni Teacher List - View, Sort, Search & Filter @AGT", () => {});

  [group(4.9, 4.12)];
  describe("2. Alumni Teacher List - Excel Export Scenarios @AGT", () => {});

  [group(4.13, 4.24)];
  describe("3. Alumni Teacher Detail - Profile & Basic Info Validation @AGT", () => {});

  [group(4.25, 4.34)];
  describe("4. Alumni Teacher Detail - Card, User, Wallet & Actions @AGT", () => {});

  [group(4.35, 4.48)];
  describe("5. Alumni Teacher Detail - Billing & Documents Tab Operations @AGT", () => {});

  [group(4.49, "4.60")];
  describe("6. Main List - Bulk Actions & Reactivation Options @AGT", () => {});

  [group(4.61, 4.66)];
  describe("7. Alumni Teacher - Import Data @AGT", () => {});

  [group(4.67, 4.74)];
  describe("8. Alumni Teacher - Add Alumni Teacher Form @AGT", () => {});
});
