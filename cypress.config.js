const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  allowCypressEnv: true,

  e2e: {
    baseUrl: "https://v3.cazh.id/",
    setupNodeEvents(on, config) {
      config.env.AUTH_EMAIL = process.env.AUTH_EMAIL;
      config.env.PASSWORD_EMAIL = process.env.PASSWORD_EMAIL;
      return config;
    },
  },
});
