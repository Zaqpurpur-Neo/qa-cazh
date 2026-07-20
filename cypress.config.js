const { defineConfig } = require("cypress");
const dotenv = require("dotenv");

dotenv.config();

module.exports = defineConfig({
  allowCypressEnv: true,

  e2e: {
    baseUrl: "https://v3.cazh.id/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      config.env = {
        ...process.env,
        ...config.env,
      };
      return config;
    },
  },
});
