import { Locator, Page, expect } from "@playwright/test";
import { PlaywrightWrapper } from "../helper/wrapper/playwright-wrapper";

export class RegisterPage {
  private base: PlaywrightWrapper;

  constructor(private page: Page) {
    this.base = new PlaywrightWrapper(page);
  }

  async navigateToRegisterPage(): Promise<void> {
    await this.base.goto("https://bookcart.azurewebsites.net/register");
  }

  async registerUser(firstname: string, lastname: string, username: string, password: string, confirmPassword: string, gender: string) {
    await this.enterFirstname(firstname);
    await this.enterLastname(lastname);
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.enterConfirmPassword(confirmPassword);
    await this.enterGender(gender);
    await this.clickRegisterButton();
  }

  async enterFirstname(firstname: string): Promise<void> {
    await this.page.locator("input[formcontrolname='firstname']").fill(firstname);
  }

  async enterLastname(lastname: string): Promise<void> {
    await this.page.locator("input[formcontrolname='lastname']").fill(lastname);
  }

  async enterUsername(username: string): Promise<void> {
    await this.page.locator("input[formcontrolname='username']").fill(username);
    const [response] = await Promise.all([
      this.page.waitForResponse(
        (res) => res.status() === 200 && res.url() === `https://bookcart.azurewebsites.net/api/user/validateUserName/${username}`
      ),
    ]);
    await response.finished();
  }

  async enterPassword(password: string): Promise<void> {
    await this.page.locator("input[formcontrolname='password']").fill(password);
  }

  async enterConfirmPassword(password: string): Promise<void> {
    await this.page.locator("input[formcontrolname='confirmPassword']").fill(password);
  }

  async enterGender(gender: string): Promise<void> {
    let genderInput: Locator;
    let genderButton: Locator;
    if (gender.toLocaleLowerCase() === "m") {
      genderButton = this.page.locator("mat-radio-button[value='Male']");
      genderInput = this.page.locator("input[value='Male']");
    } else {
      genderButton = this.page.locator("mat-radio-button[value='Female']");
      genderInput = this.page.locator("input[value='Female']");
    }
    await genderButton.click();
    await expect(genderInput).toBeChecked();
  }

  async clickRegisterButton(): Promise<void> {
    await this.page.locator("mat-card-actions").getByRole("button", { name: "Register" }).click();
  }
}
