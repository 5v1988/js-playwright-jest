const { chromium, expect } = require("@playwright/test");
const fs = require('fs');
const setAuthStateWithApi = require("../lib/common.api.fn");
const { timeOut } = require("../lib/test.util");
const { stateConfig } = require("../lib/test.util");

describe('Handling states', () => {
    let browser;
    const config = stateConfig
    process.env.API_KEY
    beforeAll(async () => {
        browser = await chromium.launch({ headless: false });
        let basicUserConfig = config.users.find(user => user.type === 'basic');
        await setAuthStateWithApi(config.url, basicUserConfig);
    }, timeOut.halfSecond);

    test('Search as basic user after api authentication', async () => {
        let userType = config.users.find(user => user.type === 'basic').type;
        let newContext = await browser.newContext({ storageState: `state/${userType}.json` });
        let newPwPage = await newContext.newPage();
        await newPwPage.goto(config.url);
        await expect(newPwPage.getByText('5v1988')).toBeVisible({ timeout: 5000 });
        await newPwPage.locator('#continue-button').click();
        await newPwPage.locator('div.giphy-search-bar input').fill('be serious');
        await newPwPage.locator('div.giphy-search-bar div svg').click();
        await expect(newPwPage.getByRole('heading', { name: 'be serious' }))
            .toBeVisible({ timeout: 5000 });
        console.log(await newContext.storageState());  

        await newContext.close();

    }, timeOut.oneSecond);

    test('Search as a basic user using api call', async () => {

    })

    afterAll(async () => {
        // //dispose all saved states
        fs.rmSync('state', {
            recursive: true,
            force: true
        });
        await browser.close();
    }, timeOut.halfSecond);

});