import { Before, After, BeforeAll, AfterAll, Status, BeforeStep, AfterStep } from "@cucumber/cucumber";
import { Browser, BrowserContext } from "@playwright/test";
import { pageFixture } from "../pages/page-fixture";
import { invokeBrowser } from "../helper/browsers/browser-manager";
import { getEnvironment } from "../helper/env/env";

let browser: Browser;
let ctx: BrowserContext;

BeforeAll(async () => {
  // browser = await chromium.launch({ headless: false });
  getEnvironment();
  browser = await invokeBrowser();
});

Before(async function () {
  ctx = await browser.newContext();
  pageFixture.page = await ctx.newPage();
});

BeforeStep(async function ({ pickleStep }) {
  // console.info(`Before step: ${pickleStep.text}`);
});

AfterStep(async function ({ pickleStep }) {
  // console.info(`After step: ${pickleStep.text}`);
});

After(async function ({ pickle, result }) {
  // screenshot - only in case of success
  if (result?.status === Status.PASSED) {
    const screenshot = await pageFixture.page?.screenshot({ path: `./test-results/screenshots/${pickle.name}.png`, type: "png" });
    this.attach(screenshot!, "image/png");
  }

  await pageFixture.page?.close();
  await ctx.close();
});

AfterAll(async () => {
  await browser.close();
});
