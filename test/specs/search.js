const assert = require("assert");

//login and find input for searching
describe("Login Page and Find Search Input", () => {
  it("should let you log in", async () => {
    await browser.url("https://teti-library.vercel.app/signin");

    await $('input[placeholder="Email"]').setValue("taylor@swift.com");
    await $('input[type="password"]').setValue("alltoowell");
    await $("button=Sign In").click();

    await expect($("h1")).toBeExisting();
    await expect($("h1")).toHaveTextContaining(
      "Need some books? Here we go..."
    );
    const pageTitle = await $("h1").getText();
    assert.strictEqual(pageTitle, "Need some books? Here we go...");
    assert.ok(pageTitle.includes("books"), "Page title should contain 'books'");

    await expect($('input[type="text"]')).toBeExisting();
  });
});

//search feature
describe("Search Feature", () => {
  it("should search for a book and verify the search text value and search results", async () => {
    await browser.url("https://teti-library.vercel.app");
    const searchInput = await $('input[type="text"]');

    const searchValue = "Ca";
    const searchCount = 2;
    const searchValidation = "Cacing";

    await searchInput.setValue(searchValue);

    await browser.waitUntil(
      async () => {
        const searchResults = await $$('p[class="chakra-text css-0"]');
        return searchResults.length > 0;
      },
      {
        timeout: 5000,
        timeoutMsg: "Search results did not appear within the specified time",
      }
    );

    // Memeriksa jumlah hasil pencarian
    const searchResults = await $$('p[class="chakra-text css-0"]');
    assert.strictEqual(
      searchResults.length,
      searchCount,
      "Incorrect number of search results"
    );

    // Memeriksa apakah hasilnya sesuai dengan input search
    let isSearchValidationFound = false;
    for (const result of searchResults) {
      const resultText = await result.getText();
      if (resultText.includes(searchValidation)) {
        isSearchValidationFound = true;
        break;
      }
    }

    assert.ok(
      isSearchValidationFound,
      "Search value not found in any search result"
    );
  });
});
