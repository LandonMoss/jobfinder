// filepath: /c:/Users/lando/job-search-app/cypress.config.js
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000', // Adjust the URL to your local server
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
});