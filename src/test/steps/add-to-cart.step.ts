import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { pageFixture } from "../../pages/page-fixture";

When("User searches for a {string}", async (book: string) => {
  await pageFixture.page!.locator("input[type='search']").fill(book);
  await pageFixture.page!.locator("mat-option[role='option'] span").click();
});

When("User adds the book to the cart", async () => {
  await pageFixture.page!.locator("button[color='primary']").click();
});

Then("cart badge should get updated", async () => {
  const count = await pageFixture.page!.locator("#mat-badge-content-0").textContent();
  expect(Number(count)).toBeGreaterThanOrEqual(1);
});
