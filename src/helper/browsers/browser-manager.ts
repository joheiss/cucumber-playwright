import { Browser, LaunchOptions, chromium, firefox, webkit } from "@playwright/test";

const options: LaunchOptions = {
  headless: false,
};

export const invokeBrowser = (): Promise<Browser> => {
  const browserType = process.env.BROWSER;
  options.headless = process.env.HEADLESS === "true";
  
  switch (browserType) {
    case "chromium":
      return chromium.launch(options);
    case "firefox":
      return firefox.launch(options);
    case "webkit":
      return webkit.launch(options);
    default:
      throw new Error("Please select a valid browser type: chrome, firefox or webkit");
  }
};
