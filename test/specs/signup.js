const assert = require("assert");

//routing to sign up page
describe("Sign Up", () => {
  it("should bring you to Sign Up page", async () => {
    await browser.url("https://teti-library.vercel.app/signin");

    await $("button=Sign Up").click();
    await expect($("h1")).toBeExisting();
    await expect($("h1")).toHaveTextContaining("Sign Up");

    const pageTitle = await $("h1").getText();
    assert.strictEqual(pageTitle, "Sign Up");
    assert.ok(pageTitle.includes("Up"), "Page title should contain 'Up'");
  });
});

//sign up with email that's not registered before
describe("Sign Up", () => {
  it("should let you Sign Up", async () => {
    const uniqName = Math.random().toString(36);
    const uniqEmail = Math.random().toString(36) + "@gmail.com";

    await browser.url("https://teti-library.vercel.app/signup");

    await $('input[placeholder="Name"]').setValue(uniqName);
    await $('input[placeholder="Email"]').setValue(uniqEmail);
    await $('input[placeholder="Password"]').setValue("alltoowell");
    await $('input[placeholder="Confirm Password"]').setValue("alltoowell");
    await $("button=Sign Up").click();

    const successMessage = await $('div[class="css-njbp03"]').getText();
    assert.strictEqual(successMessage, "Sign Up Success");

    await expect($("h1")).toBeExisting();
    await expect($("h1")).toHaveTextContaining("Sign In");

    const pageTitle = await $("h1").getText();
    assert.strictEqual(pageTitle, "Sign In");
    assert.ok(pageTitle.includes("In"), "Page title should contain 'In'");
  });
});

//sign up with email that's registered before
describe("Sign Up", () => {
  it("should not let you Sign Up", async () => {
    await browser.url("https://teti-library.vercel.app/signup");

    await $('input[placeholder="Name"]').setValue("taylor");
    await $('input[placeholder="Email"]').setValue("taylor@swift.com");
    await $('input[placeholder="Password"]').setValue("alltoowell");
    await $('input[placeholder="Confirm Password"]').setValue("alltoowell");
    await $("button=Sign Up").click();

    const errorMessage = await $('div[class="css-njbp03"]').getText();
    assert.strictEqual(
      errorMessage,
      "Another user with that email already registered."
    );
  });
});
