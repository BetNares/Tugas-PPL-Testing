import { remote } from "webdriverio";

// describe("Halaman awal", () => {
//   it("should have the right title", () => {
//     browser.url("https://teti-library.vercel.app/signin");
//     expect(browser).toHaveTitle("TETII");
//   });
// });
const browser = await remote({
  capabilities: {
    browserName: "chrome",
    "goog:chromeOptions": {
      args: process.env.CI ? ["headless", "disable-gpu"] : [],
    },
  },
});

await browser.url("https://webdriver.io");

const apiLink = await browser.$("=API");
await apiLink.click();

await browser.saveScreenshot("./screenshot.png");
await browser.deleteSession();
