import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { fixture } from "../../pages/fixture";
import { RegisterPage } from "../../pages/register-page";
import { getFakeUserData } from "../../helper/utils/fake-data";
import { expect } from "@playwright/test";

let registerPage: RegisterPage;

Given("User navigated to the register page", async () => {
  registerPage = new RegisterPage(fixture.page!);
  await registerPage.navigateToRegisterPage();
});

When("User registers a new user", async () => {
  const data = getFakeUserData();
  await registerPage.registerUser(data.firstname, data.lastname, data.username, data.password, data.password, data.gender);
});

Then("Registration is successful", async () => {
  await expect(fixture.page!).toHaveURL("https://bookcart.azurewebsites.net/login");
});
