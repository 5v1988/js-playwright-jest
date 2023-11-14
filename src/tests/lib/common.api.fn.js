const { request, expect } = require("@playwright/test");

let setAuthStateWithApi = async (url, loginConfig) => {
    let loginRequest = await request.newContext({
        baseURL: url
    });
    let response = await loginRequest.post(`/api/v1/users/login`, {
        headers: {
            'accept': '*/*',
            'accept-language': 'en-GB'
        },
        multipart: {
            "email": "basic.user@gmail.com",
            "password": "**********",
        }
    });
    expect(response.status()).toBe(200);
    await loginRequest.storageState({ path: `state/${loginConfig.type}.json` });
    await loginRequest.dispose();
}

module.exports = setAuthStateWithApi;