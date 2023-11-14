const { chromium, expect } = require("@playwright/test");
const fs = require('fs');
const setAuthState = require("../lib/common.fn");
const { timeOut } = require("../lib/test.util");

describe('Handling states', () => {
    let browser;

    beforeAll(async () => {
        browser = await chromium.launch({ headless: false });
        let basicUserConfig = config.users.find(user => user.type === 'basic');
        await setAuthState(browser, config.url, basicUserConfig);
    }, timeOut.halfSecond);

    test('Login as basic user', async () => {
        let userType = config.users.find(user => user.type === 'basic').type;
        let newContext = await browser.newContext({ storageState: `state/${userType}.json` });
        let newPwPage = await newContext.newPage();
        await newPwPage.goto(config.url);
        await expect(newPwPage.getByText('5v1988')).toBeVisible({ timeout: 5000 });
        await newContext.close();
    }, timeOut.halfSecond);

    afterAll(async () => {
        //dispose all saved states
        fs.rmSync('state', {
            recursive: true,
            force: true
        });
        await browser.close();
    }, timeOut.halfSecond);

});