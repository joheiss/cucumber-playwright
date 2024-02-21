import { Page } from "@playwright/test";
import { Logger } from "winston";

interface PageFixture {
  page?: Page;
  logger?: Logger;
}

export const fixture: PageFixture = {
  page: undefined,
  logger: undefined,
};
