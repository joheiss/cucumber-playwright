const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "./test-results/",
  reportPath: "./test-results/",
  reportName: "Cucumber Playright Automation Report",
  pageTitle: "BookStore App Test Report",
  displayDuration: true,
  metadata: {
    browser: {
      name: "chrome",
      version: "120",
    },
    device: "Local test machine",
    platform: {
      name: "osx",
      version: "14.3.1",
    },
  },
  customData: {
    title: "Run info",
    data: [
      { label: "Project", value: "Book Store Application" },
      { label: "Release", value: "1.2.3" },
      { label: "Cycle", value: "Smoke-1" },
      { label: "Execution Start Time", value: new Date().toISOString() },
      { label: "Execution End Time", value: new Date().toISOString() },
    ],
  },
});
