import { Before, After, BeforeAll, AfterAll, Status, BeforeStep, AfterStep } from "@cucumber/cucumber";
import { Browser, BrowserContext } from "@playwright/test";
import { fixture as fixture } from "../pages/fixture";
import { invokeBrowser } from "../helper/browsers/browser-manager";
import { getEnvironment } from "../helper/env/env";
import { createLogger } from "winston";
import { options } from "../helper/utils/logger";

let browser: Browser;
let ctx: BrowserContext;

BeforeAll(async () => {
  // browser = await chromium.launch({ headless: false });
  getEnvironment();
  browser = await invokeBrowser();
});

Before(async function ({ pickle }) {
  ctx = await browser.newContext();
  fixture.page = await ctx.newPage();
  fixture.logger = createLogger(options(pickle.name + pickle.id));
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
    const screenshot = await fixture.page?.screenshot({ path: `./test-results/screenshots/${pickle.name}.png`, type: "png" });
    this.attach(screenshot!, "image/png");
  }

  await fixture.page?.close();
  await ctx.close();
});

AfterAll(async () => {
  await browser.close();
  fixture.logger?.close();
});
