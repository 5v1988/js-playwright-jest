const { devices } = require("@playwright/test");

let setAuthState = async (browser, url, loginConfig) => {
    let context = await browser.newContext();
    let page = await context.newPage(devices['Desktop Chrome']);
    await page.goto(url);
    await page.locator(`//button[.='Continue']`).click();
    await page.getByRole('link', { name: 'Log In' }).click();
    await page.locator(`[name='email']`).fill(loginConfig.userName);
    await page.locator(`[name='password']`).fill(loginConfig.password);
    await page.locator('form button').click();
    await expect(page.getByText('5v1988')).toBeVisible({ timeout: 5000 });
    await context.storageState({ path: `state/${loginConfig.type}.json` });
    await context.close();
}

module.exports = setAuthState;