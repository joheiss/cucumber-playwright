import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { pageFixture } from "../../pages/page-fixture";

setDefaultTimeout(60 * 1000);

Given("User opens the application", async () => {
  await pageFixture.page!.goto("https://bookcart.azurewebsites.net/");
});

Given("User clicks on the logon link", async () => {
  const button = pageFixture.page!.getByRole("button", { name: "Login" }).first();
  await button.click();
});

Given("User enters a username as {string}", async (username: string) => {
  const usernameFld = pageFixture.page!.locator("input[formcontrolname='username']");
  await usernameFld.fill(username);
});

Given("User enters a password as {string}", async (password: string) => {
  const passwordFld = pageFixture.page!.locator("input[formcontrolname='password']");
  await passwordFld.fill(password);
});

When("User clicks the login button", async () => {
  const button = pageFixture.page!.locator("button[color='primary']");
  await button.click();
  await pageFixture.page!.waitForLoadState();
  // console.info("Waiting for 2 seconds");
  await pageFixture.page!.waitForTimeout(2000);
});

Then("Login should be successful", { timeout: 60 * 1000 }, async () => {
  const loggedInUser = pageFixture.page!.locator("//button[contains(@class,'mat-focus-indicator mat-menu-trigger')]//span[1]");
  // const username = await loggedInUser.textContent();
  // console.log("username: ", username);
  await expect(loggedInUser).toBeVisible();
});

Then("Login should fail", { timeout: 60 * 1000 }, async () => {
  const errorMessage = pageFixture.page!.locator("mat-error[role='alert']");
  await expect(errorMessage).toBeVisible();
});
