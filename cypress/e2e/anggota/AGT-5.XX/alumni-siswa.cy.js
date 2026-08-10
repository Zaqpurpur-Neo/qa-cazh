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
});
