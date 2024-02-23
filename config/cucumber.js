module.exports = {
  default: {
    tags: process.env.npm_config_TAGS || "",
    parallel: 2,
    formatOptions: {
      snippetInterface: "async-await",
    },
    paths: ["./src/test/features/"],
    dryRun: false,
    require: ["./src/test/steps/**/*.ts", "./src/hooks/**/*.ts"],
    requireModule: ["ts-node/register"],
    format: ["progress-bar", "html:test-results/cucumber-report.html", "json:test-results/cucumber-report.json", "rerun:@rerun.txt"],
  },
  rerun: {
    parallel: 2,
    retry: 0,
    formatOptions: {
      snippetInterface: "async-await",
    },
    dryRun: false,
    require: ["./src/test/steps/**/*.ts", "./src/hooks/**/*.ts"],
    requireModule: ["ts-node/register"],
    format: ["progress-bar", "html:test-results/cucumber-report.html", "json:test-results/cucumber-report.json", "rerun:@rerun.txt"],
  },
};
