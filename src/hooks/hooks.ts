import { Before, After, BeforeAll, AfterAll, Status, BeforeStep, AfterStep } from "@cucumber/cucumber";
import { Browser, BrowserContext } from "@playwright/test";
import { fixture as fixture } from "../pages/fixture";
import { invokeBrowser } from "../helper/browsers/browser-manager";
import { getEnvironment } from "../helper/env/env";
import { createLogger } from "winston";
import { options } from "../helper/utils/logger";
import { readFileSync } from "fs";

let browser: Browser;
let ctx: BrowserContext;

BeforeAll(async () => {
  // browser = await chromium.launch({ headless: false });
  getEnvironment();
  browser = await invokeBrowser();
});

Before(async function ({ pickle }) {
  ctx = await browser.newContext({
    recordVideo: {
      dir: "test-results/videos",
    },
  });
  await ctx.tracing.start({
    name: pickle.name + pickle.id,
    title: pickle.name,
    sources: true,
    screenshots: true,
    snapshots: true,
  });
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
  const tracePath = `./test-results/trace/${pickle.id}.zip`;
  let videoPath: string | undefined;
  let screenshot: Buffer | undefined;
  // screenshot & videos - only in case of success
  if (result?.status === Status.PASSED) {
    screenshot = await fixture.page?.screenshot({ path: `./test-results/screenshots/${pickle.name}.png`, type: "png" });
    videoPath = await fixture.page?.video()?.path();
  }
  await ctx.tracing.stop({ path: tracePath });
  await fixture.page?.close();
  await ctx.close();

  // screenshot & videos - after close because it takes a long time
  if (result?.status === Status.PASSED) {
    this.attach(screenshot!, "image/png");
    this.attach(readFileSync(videoPath!), "video/webm");
    const traceFileLink = `<a href="https://trace.playwright.dev/">Open ${tracePath}</a>`;
   this.attach(`Trace file: ${traceFileLink}`, "text/html");
  }
});

AfterAll(async () => {
  await browser.close();
  fixture.logger?.close();
});
