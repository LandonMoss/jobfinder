// filepath: /c:/Users/lando/job-search-app/cypress/e2e/themeToggle.cy.js
describe('Theme Toggle', () => {
    beforeEach(() => {
      cy.visit('/'); // The baseUrl is already set in the config
    });
  
    it('should toggle between light and dark themes', () => {
      // Check initial theme
      cy.get('body').should('have.class', 'light-theme');
      cy.get('.navbar').should('have.class', 'navbar-light-theme');
  
      // Toggle to dark theme
      cy.get('#themeToggleSwitch').click();
      cy.get('body').should('have.class', 'dark-theme');
      cy.get('.navbar').should('have.class', 'navbar-dark-theme');
  
      // Toggle back to light theme
      cy.get('#themeToggleSwitch').click();
      cy.get('body').should('have.class', 'light-theme');
      cy.get('.navbar').should('have.class', 'navbar-light-theme');
    });
  });