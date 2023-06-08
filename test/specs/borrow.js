const assert = require('assert');

//not logged in and try borrowing
describe('Borrowing book',  () => {
    it('should NOT let you borrow', async() => {

        await browser.url('/');
        await $("#root > main > div > div > div.css-6d5jhl > div > div:nth-child(1) > div:nth-child(1)").click();
        await $("button=SignIn to borrow book ➜").click();

        const pageUrl = browser.getUrl();
        assert.notEqual(pageUrl, 'https://teti-library.vercel.app/');
    })
  })

//logged in
  describe('Borrowing book',  () => {
    it('should let you borrow', async() => {

        await browser.url('/signin');
        await $('input').setValue('jun@mail.com');
        await $('input[type="password"]').setValue('junpaw2');
        await $("button=Sign In").click();

        await $("#root > main > div > div > div.css-6d5jhl > div > div:nth-child(1) > div:nth-child(1)").click();
        await $("button=Borrow").click();

        const pageUrl = browser.getUrl();
        assert.notEqual(pageUrl, 'https://teti-library.vercel.app/signin');
    })
  })

