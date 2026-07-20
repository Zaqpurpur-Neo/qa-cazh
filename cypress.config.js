const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
<<<<<<< HEAD
    baseUrl: "https://v3.cazh.id/",
=======
>>>>>>> 00e5fe342ca2ac466e63f0052b8f5fd662fe642d
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
