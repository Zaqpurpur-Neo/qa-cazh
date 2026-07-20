describe('The School Year Page', () => {
    it('successfully loads', () => {
        cy.visit('setting/academic/school-year')

        cy.get('div[data-testid="type"]', {
            timeout: 30000
        }).
            cy.get('div[data-testid="type"]', {
                timeout: 30000
            }).click()
    })
})