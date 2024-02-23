import { Page, expect } from "@playwright/test";
import { PlaywrightWrapper } from "../helper/wrapper/playwright-wrapper";

export class HeaderPage {
  private base: PlaywrightWrapper;

  constructor(private page: Page) {
    this.base = new PlaywrightWrapper(page);
  }

  async clickOnLoginLink(): Promise<void> {
    await this.page.locator("app-nav-bar").getByRole("button", { name: "Login" }).click();
  }

  async clickOnUserMenu(): Promise<void> {
    await this.page.locator("app-nav-bar").getByRole("button").filter({ hasText: "account_circle" }).click();
  }

  async clickOnMyOrder(): Promise<void> {
    await this.clickOnUserMenu();
    await this.page.getByRole("button", { name: "My Orders" }).click();
  }

  async enterBookName(bookName: string): Promise<void> {
    await this.page.getByPlaceholder("Search books or authors").fill(bookName);
    await this.base.waitAndClick("mat-option[role='option']");
  }

  async clickOnCart(): Promise<void> {
    await this.page.locator("app-book-card").getByRole("button", { name: "Add to Cart" }).click();
  }

  async getCartValue(): Promise<any> {
    await this.page.waitForTimeout(1000);
    return await this.page.textContent("#mat-badge-content-0");
  }

  async clickOnLogoutLink(): Promise<void> {
    await this.clickOnUserMenu();
    await this.page.getByRole("button", { name: "Logout" }).click();
  }

  async verifyLoginSuccess(): Promise<void> {
    await expect(this.page.locator("app-nav-bar").getByRole("button").filter({ hasText: "account_circle" })).toBeVisible();
  }
}
