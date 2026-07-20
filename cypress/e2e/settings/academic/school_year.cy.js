describe('The School Year Page', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('setting/academic/school-year');
    });

    it('successfully loads', () => {
        cy.url().should('include', '/setting/academic/school-year');
    });

    it('Add School Year', () => {
        cy.contains('button', /Add School Year|Tambah Tahun Ajaran/i).click();

        cy.get('input[data-slot="form-control"]').should('have.length', 2);
        cy.get('button[data-slot="form-control"]').should('have.length', 2);

        cy.contains(/Add Year|Tambah Tahun/i);
        cy.get('input[type="number"][data-slot="form-control"]').should("be.visible");

        cy.contains('label', /School Year|Tahun Ajaran/i);
        cy.contains('label', /Start Date|Tanggal Mulai/i);
        cy.contains('label', /End Date|Tanggal Akhir/i);
        cy.contains('button', /Cancel|Batal/i);
        cy.contains('button', /Save|Simpan/i);
    });
});