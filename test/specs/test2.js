const assert = require("assert");

describe("Login Page", () => {
  it("should let you log in", async () => {
    await browser.url("https://teti-library.vercel.app/signin");

    await $('input[placeholder="Email"]').setValue("jun@mail.com");
    await $('input[type="password"]').setValue("junpaw2");
    await $("button=Sign In").click();

    await expect($("h1")).toBeExisting();
    await expect($("h1")).toHaveTextContaining(
      "Need some books? Here we go..."
    );
    const pageTitle = await $("h1").getText();

    // Assersi untuk memeriksa nilai pageTitle
    assert.strictEqual(pageTitle, "Need some books? Here we go...");

    // Assersi lainnya
    assert.ok(pageTitle.includes("books"), "Page title should contain 'books'");
  });
});

describe("Login Page", () => {
  it("should NOT let you log in", async () => {
    await browser.url("https://teti-library.vercel.app/signin");
    await $('input[placeholder="Email"]').setValue("jun@mail.com");
    await $('input[type="password"]').setValue("junpaw");
    await $("button=Sign In").click();

    const errorMessage = await $('div[class="css-njbp03"]').getText();
    assert.strictEqual(errorMessage, "Wrong email or password");
  });
});
