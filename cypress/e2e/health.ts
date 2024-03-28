describe('health check', () => {
  it('is success', () => {
    cy.visit('/ping');
  });
});
