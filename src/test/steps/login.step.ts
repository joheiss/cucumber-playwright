import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { fixture } from "../../pages/fixture";

setDefaultTimeout(60 * 1000);

Given("User opens the application", async () => {
  await fixture.page!.goto(process.env.BASEURL!);
  fixture.logger?.info("Navigated to the application (base url)");
});

Given("User clicks on the logon link", async () => {
  const button = fixture.page!.locator("app-nav-bar").getByRole("button", { name: "Login" });
  await button.click();
});

Given("User enters a username as {string}", async (username: string) => {
  const usernameFld = fixture.page!.locator("input[formcontrolname='username']");
  await usernameFld.fill(username);
});

Given("User enters a password as {string}", async (password: string) => {
  const passwordFld = fixture.page!.locator("input[formcontrolname='password']");
  await passwordFld.fill(password);
});

When("User clicks the login button", async () => {
  const button = fixture.page!.locator("app-login").getByRole("button", { name: "Login" });
  await button.click();
  await fixture.page!.waitForLoadState();
  fixture.logger?.info("Waiting for 2 seconds");
  await fixture.page!.waitForTimeout(2000);
});

Then("Login should be successful", { timeout: 60 * 1000 }, async () => {
  const loggedInDropdown = fixture.page!.locator("app-nav-bar").getByRole("button").filter({ hasText: "account_circle" });
  const username = await loggedInDropdown.textContent();
  fixture.logger?.info(`username: ${username}`);
  await expect(loggedInDropdown).toBeVisible();
});

Then("Login should fail", { timeout: 60 * 1000 }, async () => {
  const errorMessage = fixture.page!.locator("mat-error[role='alert']");
  await expect(errorMessage).toBeVisible();
});
