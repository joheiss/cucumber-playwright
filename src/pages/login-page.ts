import { Locator, Page, expect } from "@playwright/test";
import { PlaywrightWrapper } from "../helper/wrapper/playwright-wrapper";

export class LoginPage {
  private base: PlaywrightWrapper;

  constructor(private page: Page) {
    this.base = new PlaywrightWrapper(page);
  }

  async navigateToLoginPage(): Promise<void> {
    await this.base.goto("/login");
    await expect(this.page).toHaveTitle("BookCart");
  }

  async enterUsername(user: string): Promise<void> {
    await this.page.getByLabel("Username").fill(user);
  }

  async enterPassword(password: string): Promise<void> {
    await this.page.getByLabel("Password").fill(password);
  }

  async clickLoginButton(): Promise<void> {
    const loginButton = this.page.locator("app-login").getByRole("button", { name: "Login" });
    await loginButton.waitFor({ state: "visible" });
    await loginButton.click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  getErrorMessage(): Locator {
    return this.page.getByRole("alert");
  }
}
