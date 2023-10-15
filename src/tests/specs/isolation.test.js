const { getBearerToken,
    deleteContactUsingApi,
    deleteUserUsingApi,
    createUserUsingApi
} = require('../lib/api.clients');
const { testConfig, timeOut } = require('../lib/test.util');
const { chromium, devices, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
const { addContact
} = require('../lib/contact.library');
const { userLogin } = require('../lib/user.library')

describe('Principle 1 — To keep isolated tests', () => {
    let browser, context, pwPage;
    let email =   faker.internet.email();
    let password = faker.internet.password();
    let token;
    beforeAll(async function () {
        browser = await chromium.launch({ headless: false });
        context = await browser.newContext(devices['Desktop Chrome']);
        let response = await createUserUsingApi({
            firstName: 'Veera',
            lastName: 'N',
            email: email,
            password: password
        });
        console.log(`creating a new user : ${response.status}`);
    }, timeOut.halfSecond);

    beforeEach(async function () {
        pwPage = await context.newPage();
        await pwPage.goto(testConfig.baseUrl);
        userLogin(pwPage, {
            email: email,
            password: password
        });
        token = await getBearerToken({
            email: email,
            password: password
        });
        console.log(`access token : ${token}`);
    }, timeOut.halfSecond);

    test('1. add a new contact — with valid data (+)', async function () {
        await addContact(pwPage, {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            birthdate: '1988-03-03',
            email: faker.internet.email(),
            phone: faker.string.numeric(10),
            street1: faker.location.streetAddress(),
            street2: faker.location.secondaryAddress(),
            city: faker.location.city(),
            stateProvince: faker.location.state(),
            postalCode: faker.location.zipCode(),
            country: faker.location.country(),
        });
        await pwPage.locator('tr.contactTableBodyRow').first()
            .waitFor({ state: 'visible' });
    }, timeOut.halfSecond);

    test('2. add a new contact — with invalid data (-)', async function () {
        await addContact(pwPage, {
            firstName: '',
            lastName: faker.person.lastName(),
            birthdate: '1988-03-03',
            email: faker.internet.email(),
            phone: faker.string.numeric(10),
            street1: '',
            street2: faker.location.secondaryAddress(),
            city: faker.location.city(),
            stateProvince: faker.location.state(),
            postalCode: '',
            country: faker.location.country(),
        });
        await pwPage.locator('#error')
            .filter({ hasText: 'Contact validation failed: firstName: Path `firstName` is required.' })
            .waitFor({ state: 'visible' });
    }, timeOut.halfSecond);

    afterEach(async function () {
        await pwPage.close();
        let response = await deleteContactUsingApi(token);
        console.log(`deleting the contact: ${response.status}`)
    }, timeOut.halfSecond);

    afterAll(async function () {
        let response = await deleteUserUsingApi(token);
        console.log(`deleting the user: ${response.status}`)
        await browser.close();
    }, timeOut.halfSecond);
});