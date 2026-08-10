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
});
