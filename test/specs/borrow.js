const assert = require('assert');

//not logged in and try borrowing
describe('Borrowing book',  () => {
    it('should NOT let you borrow', async() => {

        await browser.url("https://teti-library.vercel.app/");
        await $('p[class="chakra-text css-0"]=DUNE').click();
        await $("button=SignIn to borrow book ➜").click();

        const pageTitle = await $("h1").getText();
        assert.strictEqual(pageTitle, "Sign In");
        assert.ok(pageTitle.includes("In"), "Page title should contain 'In'");
    })
  })

//logged in
  describe('Borrowing book',  () => {
    it('should let you borrow', async() => {

        await browser.url("https://teti-library.vercel.app/signin");

        await $('input[placeholder="Email"]').setValue("jun@mail.com");
        await $('input[type="password"]').setValue("junpaw2");
        await $("button=Sign In").click();

        await $('p[class="chakra-text css-0"]=DUNE').click();
        if(await $("button=Return").isExisting()){
          await $("button=Return").click();
          await $('button[class="css-1pq15d"]').click();
          await $('p[class="chakra-text css-0"]=DUNE').click();
        }
        
        await $("button=Borrow").click();


        const alertMessage =  await $('div[class="chakra-alert__title css-tidvy5"]').getText();
        assert.strictEqual(alertMessage, "Borrowed");
    })
  })


  //logged in and borrowing an out-of-books book
  describe('Borrowing book',  () => {
    it('should NOT let you borrow', async() => {

        await browser.url("https://teti-library.vercel.app/signin");

        await $('input[placeholder="Email"]').setValue("jun@mail.com");
        await $('input[type="password"]').setValue("junpaw2");
        await $("button=Sign In").click();

        await $('p[class="chakra-text css-0"]=Test book').click();
        if(await $("button=Return").isExisting()){
          await $("button=Return").click();
          await $('p[class="chakra-text css-0"]=Test book').click();
        }
        await $("button=Borrow").click();


        const errorMessage =  await $('div[class="chakra-alert__title css-tidvy5"]').getText();
        assert.strictEqual(errorMessage, "Error");
    })
  })

