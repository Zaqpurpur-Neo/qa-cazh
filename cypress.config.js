const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: "https://v3.cazh.id/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
