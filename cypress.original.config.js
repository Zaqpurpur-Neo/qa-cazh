const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const fs = require("fs");

require("dotenv").config();

const pgtPlugin = {
  name: "esbuild-pgt-transformer",
  setup(build) {
    build.onLoad({ filter: /\.(cy|nte|spec|test)\.[jt]sx?$/ }, (args) => {
      let contents = fs.readFileSync(args.path, "utf8");

      // 1. Detect and strip [name("PREFIX")] or [name(PREFIX)] to set file-level prefix
      let activePrefix = "PGT"; // Default fallback prefix

      contents = contents.replace(
        /\[\s*(?:name|prefix)\(\s*["']?([a-zA-Z0-9_$]+)["']?\s*\)\s*\]\s*;*/g,
        (match, prefixName) => {
          activePrefix = prefixName;
          return ""; // Remove [name(...)] tag from output
        },
      );

      // 2. Transform describe / context blocks: [group(7.1, 7.6)] or [PGT(7.1, 7.6)]
      const describeRegex =
        /\[\s*([a-zA-Z0-9_$]+)\(\s*([^)]+)\)\s*\]\s*;*\s*((?:describe|context)(?:\.[a-zA-Z_$][a-zA-Z0-9_$]*)*)\(\s*(["'`])(.*?)\4/g;

      contents = contents.replace(
        describeRegex,
        (match, tagType, rawArgs, fnCall, quote, title) => {
          const parsedArgs = rawArgs
            .split(",")
            .map((arg) => arg.trim().replace(/^["']|["']$/g, ""));

          const minVer = parsedArgs[0];
          const maxVer = parsedArgs[1];

          // Determine prefix:
          // Use explicit call tag if not generic (e.g. [AUTH(1.1)] -> AUTH),
          // or infer from title @TAG (e.g. @AUTH -> AUTH),
          // otherwise fallback to activePrefix defined by [name("...")]
          let prefix = activePrefix;
          if (tagType !== "group" && tagType !== "id") {
            prefix = tagType;
          } else {
            const tagInTitle = title.match(/@([a-zA-Z0-9_$]+)\b/);
            if (tagInTitle) {
              prefix = tagInTitle[1];
            }
          }

          const tagStr = maxVer
            ? `(${prefix}-${minVer} - ${prefix}-${maxVer})`
            : `(${prefix}-${minVer})`;

          let updatedTitle;
          if (/@([a-zA-Z0-9_$]+)\b/.test(title)) {
            updatedTitle = title.replace(/@([a-zA-Z0-9_$]+)\b/g, tagStr).trim();
          } else {
            updatedTitle = `${title.trim()} ${tagStr}`;
          }

          return `${fnCall}(${quote}${updatedTitle}${quote}`;
        },
      );

      // 3. Transform it / specify blocks: [id(7.1)]
      const itRegex =
        /\[\s*([a-zA-Z0-9_$]+)\(\s*([^)]+)\)\s*\]\s*;*\s*((?:it|specify)(?:\.[a-zA-Z_$][a-zA-Z0-9_$]*)*)\(\s*(["'`])(.*?)\4/g;

      contents = contents.replace(
        itRegex,
        (match, tagType, rawArgs, fnCall, quote, msg) => {
          const idVal = rawArgs.trim().replace(/^["']|["']$/g, "");
          return `${fnCall}(${quote}TEST-ID: ${idVal} | ${msg}${quote}`;
        },
      );

      const loader =
        args.path.endsWith(".ts") || args.path.endsWith(".tsx") ? "ts" : "js";
      return { contents, loader };
    });
  },
};

module.exports = defineConfig({
  allowCypressEnv: true,

  e2e: {
    baseUrl: "https://v3.cazh.id/",
    numTestsKeptInMemory: 0,
    experimentalMemoryManagement: true,
    downloadsFolder: "cypress/downloads",

    video: false,
    screenshotOnRunFailure: false,

    setupNodeEvents(on, config) {
      on(
        "file:preprocessor",
        createBundler({
          plugins: [pgtPlugin],
        }),
      );
      on("before:browser:launch", (browser = {}, launchOptions) => {
        if (
          (browser.name === "chrome" || browser.family === "chromium") &&
          browser.name !== "electron"
        ) {
          launchOptions.args.push("--disable-extensions");

          launchOptions.args.push("--js-flags=--max-old-space-size=4096");
          launchOptions.args.push("--disable-dev-shm-usage");
          launchOptions.args.push("--disable-gl-drawing-for-tests");
          launchOptions.args.push("--no-sandbox");

          launchOptions.args.push("--disable-http-cache");
          launchOptions.args.push("--disable-application-cache");
        }
      });

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
