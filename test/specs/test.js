const assert = require('assert');

describe('Login Page',  () => {
    it('should let you log in', async() => {
        
        await browser.url('/signin');
        await $('input').setValue('jun@mail.com');
        await $('input[type="password"]').setValue('junpaw2');
        await $("button=Sign In").click();

        const pageUrl = browser.getUrl();
        assert.notEqual(pageUrl, 'https://teti-library.vercel.app/signin');
    })
  })

//correct email incorrect password
describe('Login Page',  () => {
    it('should NOT let you log in', async() => {
        
        await browser.url('/signin');
        await $('input').setValue('jun@mail.com');
        await $('input[type="password"]').setValue('junpaw');
        await $("button=Sign In").click();

        const pageUrl = browser.getUrl();
        assert.notEqual(pageUrl, 'https://teti-library.vercel.app/');
    })
  })

//incorrect email correct password
describe('Login Page',  () => {
    it('should NOT let you log in', async() => {
        
        await browser.url('/signin');
        await $('input').setValue('juni@mail.com');
        await $('input[type="password"]').setValue('junpaw2');
        await $("button=Sign In").click();

        const pageUrl = browser.getUrl();
        assert.notEqual(pageUrl, 'https://teti-library.vercel.app/');
    })
  })

//incorrect email and password
describe('Login Page',  () => {
    it('should NOT let you log in', async() => {
        
        await browser.url('/signin');
        await $('input').setValue('juni@mail.com');
        await $('input[type="password"]').setValue('junpaw');
        await $("button=Sign In").click();

        const pageUrl = browser.getUrl();
        assert.notEqual(pageUrl, 'https://teti-library.vercel.app/');
    })
  })

//invalid email
describe('Login Page',  () => {
    it('should NOT let you log in', async() => {
        
        await browser.url('/signin');
        await $('input').setValue('jun');
        await $('input[type="password"]').setValue('.');
        await $("button=Sign In").click();

        const pageUrl = browser.getUrl();
        assert.notEqual(pageUrl, 'https://teti-library.vercel.app/');
    })
  })