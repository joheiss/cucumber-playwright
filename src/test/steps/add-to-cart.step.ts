import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { fixture } from "../../pages/fixture";

When("User searches for a {string}", async (book: string) => {
  await fixture.page!.locator("input[type='search']").fill(book);
  await fixture.page!.locator("mat-option[role='option'] span").click();
});

When("User adds the book to the cart", async () => {
  await fixture.page!.locator("app-book-card").getByRole("button", { name: "Add to Cart" }).click();
});

Then("cart badge should get updated", async () => {
  const count = await fixture.page!.locator("#mat-badge-content-0").textContent();
  fixture.logger?.info(`Badge count: ${count}`);
  expect(Number(count)).toBeGreaterThanOrEqual(1);
});
