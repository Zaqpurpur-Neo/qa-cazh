import {
  configAcademicStaff,
  name,
  id,
  group,
  _localLoginSession,
  uncaughtHandle,
} from "./extends";

[name("AGT")];
describe("TEST-CASE: 3.XX | Anggota Staff", () => {
  beforeEach(() => {
    cy.viewport(1600, 1000);

    _localLoginSession();
    uncaughtHandle();
  });

  [group(3.1, "3.10")];
  describe("1. Staff List - View, Sort, Search & Filter @AGT", () => {});

  [group(3.11, 3.15)];
  describe("2. Staff List - Bulk Options & Excel Export Scenarios @AGT", () => {});

  [group(3.16, 3.27)];
  describe("3. Staff Detail - Data Diri & Basic Profile Validation @AGT", () => {});

  [group(3.28, 3.41)];
  describe("4. Staff Detail - Card Tab & Digital Actions @AGT", () => {});

  [group(3.42, 3.44)];
  describe("5. Staff Detail - Billing Tab Overview @AGT", () => {});

  [group(3.45, 3.56)];
  describe("6. Staff Detail - Documents Tab Operations @AGT", () => {});

  [group(3.57, "3.70")];
  describe("7. Main List - Bulk Actions & Document Downloads @AGT", () => {});

  [group(3.71, "3.80")];
  describe("8. Staff Management - Add Staff Form @AGT", () => {});
});
