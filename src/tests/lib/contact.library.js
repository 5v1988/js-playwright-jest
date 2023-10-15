const { expect } = require("@playwright/test");
const { timeOut } = require('./test.util');

const addContact = async (pwPage, contact) => {
    await pwPage.getByRole('button', { name: 'Add a New Contact' }).click();
    await pwPage.locator('#firstName').fill(contact.firstName);
    await pwPage.locator('#lastName').fill(contact.lastName);
    await pwPage.locator('#birthdate').fill(contact.birthdate);
    await pwPage.locator('#email').fill(contact.email);
    await pwPage.locator('#phone').fill(contact.phone);
    await pwPage.locator('#street1').fill(contact.street1);
    await pwPage.locator('#street2').fill(contact.street2);
    await pwPage.locator('#city').fill(contact.city);
    await pwPage.locator('#stateProvince').fill(contact.stateProvince);
    await pwPage.locator('#postalCode').fill(contact.postalCode);
    await pwPage.locator('#country').fill(contact.country);
    await pwPage.getByRole('button', { name: 'Submit' }).click();
}

const deleteContact = async (pwPage) => {
    pwPage.on('dialog', async (dialog) => {
        console.log(dialog.message());
        await dialog.accept();
    });
    for (const contact of await pwPage.locator('tr.contactTableBodyRow').all()) {
        await contact.click()
        await pwPage.locator('#delete').click();
        await pwPage.getByRole('button', { name: 'Add a New Contact' })
            .waitFor({ state: 'visible', timeout: timeOut.oneSecond });
    }
}

module.exports = { addContact, deleteContact };