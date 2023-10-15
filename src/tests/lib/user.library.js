const timeOut = require('../lib/test.util');

const userLogin = async (pwPage, user) => {
    await pwPage.locator('#email').fill(user.email);
    await pwPage.locator('#password').fill(user.password);
    await pwPage.getByRole('button', { name: 'Submit' }).click();
    expect(await pwPage.getByRole('heading', { name: 'Contact List' }))
        .toBeVisible({ 'timeout': timeOut.halfSecond });
}

const addUser = async (pwPage, user) => {
    await pwPage.locator('#signup').click();
    await pwPage.locator('#firstName').fill(user.firstName);
    await pwPage.locator('#lastName').fill(user.lastName);
    await pwPage.locator('#email').fill(user.email);
    await pwPage.locator('#password').fill(user.password);
    await pwPage.locator('#submit').click();
    expect(await pwPage.getByRole('heading', { name: 'Contact List' }))
        .toBeVisible({ 'timeout': timeOut.halfSecond });
}

module.exports = { addUser, userLogin };