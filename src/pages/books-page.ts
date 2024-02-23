import { Page, expect } from "@playwright/test";
import { PlaywrightWrapper } from "../helper/wrapper/playwright-wrapper";
import { HeaderPage } from "./header-page";

export class BooksPage {
  private header: HeaderPage;

  constructor(private page: Page) {
    this.header = new HeaderPage(page);
  }

  async verifyAllCategories(categories: string[]): Promise<void> {
    const bookCategories = this.page.locator("app-book-filter a");
    await expect(bookCategories).toHaveText(categories);
  }

  async addBookToCart(book: string): Promise<void> {
    await this.header.enterBookName(book);
    await expect(this.page.locator("app-book-card").locator("div.card-title")).toHaveText(book, { ignoreCase: true });
    await this.page.locator("app-book-card").getByRole("button", { name: "Add to Cart" }).click();
    const toast = this.page.locator("simple-snack-bar span").first();
    await expect(toast).toBeVisible();
    await expect(toast).toHaveText("One item added to cart");
  }
}
