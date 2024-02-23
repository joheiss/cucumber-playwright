import { expect, test } from "@playwright/test";

test.describe("Try this locators...", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://bookcart.azurewebsites.net/");
  });
  test("locate login button in toolbar", async ({ page }) => {
    const button = page.locator("app-nav-bar").getByRole("button", { name: "Login" });
    await button.click();
  });

  test("locate login button in sign in form", async ({ page }) => {
    // navigate to sign in form
    const toolbarLoginButton = page.locator("app-nav-bar").getByRole("button", { name: "Login" });
    await toolbarLoginButton.click();

    // fill out sign in form
    const usernameFld = page.locator("input[formcontrolname='username']");
    await usernameFld.fill("ortoni11");
    const passwordFld = page.locator("input[formcontrolname='password']");
    await passwordFld.fill("Pass1234");
    // ... and press sign in button
    const signInFormLoginButton = page.locator("app-login").getByRole("button", { name: "Login" });
    await signInFormLoginButton.click();

    // check if sign in was successful
    await page.waitForLoadState();
    const loggedInDropdown = page.locator("app-nav-bar").getByRole("button").filter({ hasText: "account_circle" });
    // await loggedInDropdown.isEnabled
    // const isVisible = ;
    expect(await loggedInDropdown.isEnabled()).toBeTruthy();
  });

  test("try register button", async ({ page }) => {
    await page.goto("https://bookcart.azurewebsites.net/register");
    await page.locator("mat-card-actions").getByRole("button", { name: "Register" }).click();
  });
});
