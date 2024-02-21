import { Page } from "@playwright/test";

interface PageFixture {
  page?: Page;
}

export const pageFixture: PageFixture = {
  page: undefined,
};
