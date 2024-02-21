import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { fixture } from "../../pages/fixture";

setDefaultTimeout(60 * 1000);

Given("User opens the application", async () => {
  await fixture.page!.goto(process.env.BASEURL!);
  fixture.logger?.info("Navigated to the application (base url)");
});

Given("User clicks on the logon link", async () => {
  const button = fixture.page!.getByRole("button", { name: "Login" }).first();
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
  const button = fixture.page!.locator("button[color='primary']");
  await button.click();
  await fixture.page!.waitForLoadState();
  // console.info("Waiting for 2 seconds");
  fixture.logger?.info("Waiting for 2 seconds");
  await fixture.page!.waitForTimeout(2000);
});

Then("Login should be successful", { timeout: 60 * 1000 }, async () => {
  const loggedInUser = fixture.page!.locator("//button[contains(@class,'mat-focus-indicator mat-menu-trigger')]//span[1]");
  const username = await loggedInUser.textContent();
  // console.log("username: ", username);
  fixture.logger?.info(`username: ${username}`);
  await expect(loggedInUser).toBeVisible();
});

Then("Login should fail", { timeout: 60 * 1000 }, async () => {
  const errorMessage = fixture.page!.locator("mat-error[role='alert']");
  await expect(errorMessage).toBeVisible();
});
