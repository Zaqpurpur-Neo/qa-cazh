const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  allowCypressEnv: true,

  e2e: {
    baseUrl: "https://v3.cazh.id/",
    setupNodeEvents(on, config) {
      config.env.AUTH_EMAIL = process.env.AUTH_EMAIL;
      config.env.PASSWORD_EMAIL = process.env.PASSWORD_EMAIL;

      config.env.TESTING_AUTH_EMAIL = process.env.TESTING_AUTH_EMAIL;
      config.env.TESTING_PASSWORD_EMAIL = process.env.TESTING_PASSWORD_EMAIL;
      config.env.TESTING_AUTH_PIN = process.env.TESTING_AUTH_PIN;

      config.env.TESTMAIL_API_KEY = process.env.TESTMAIL_API_KEY;
      config.env.TESTMAIL_URL = process.env.TESTMAIL_URL;

      config.env.SECOND_AUTH_EMAIL = process.env.SECOND_AUTH_EMAIL;
      config.env.SECOND_PASSWORD_EMAIL = process.env.SECOND_PASSWORD_EMAIL;
      config.env.SECOND_AUTH_PIN = process.env.SECOND_AUTH_PIN;
      config.env.TESTING_DEV_AUTH_EMAIL = process.env.TESTING_DEV_AUTH_EMAIL;
      config.env.TESTING_DEV_PASSWORD_EMAIL =
        process.env.TESTING_DEV_PASSWORD_EMAIL;
      config.env.TESTING_DEV_AUTH_PIN = process.env.TESTING_DEV_AUTH_PIN;
      return config;
    },
  },
});
