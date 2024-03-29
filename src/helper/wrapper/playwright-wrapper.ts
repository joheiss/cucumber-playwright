import { Page } from "@playwright/test";

export class PlaywrightWrapper {
  constructor(private page: Page) {}

  async goto(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: "domcontentloaded" });
  }

  async navigateTo(link: string): Promise<void> {
    await Promise.all([
        this.page.waitForNavigation(),
        this.page.click(link),
    ]);
  }

  async waitAndClick(locator: string): Promise<void> {
    const element = this.page.locator(locator);
    await element.waitFor({ state: "visible"});
    await element.click();
  }
}
