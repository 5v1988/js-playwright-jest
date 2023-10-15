const axios = require('axios').default;
const { testConfig } = require('../lib/test.util');

const getBearerToken = async (body) => {
    let response = await axios.request({
        baseURL: testConfig.baseUrl,
        method: 'POST',
        url: '/users/login',
        data: body
    });
    return response.data.token;
}

const createUserUsingApi = async (body) => {
    let response = await axios.request({
        baseURL: testConfig.baseUrl,
        method: 'POST',
        url: '/users',
        data: body
    });
    return response;
}

const deleteUserUsingApi = async (token) => {
    let response = await axios.request({
        baseURL: testConfig.baseUrl,
        method: 'DELETE',
        url: '/users/me',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

const getContactsUsingApi = async (token) => {
    let response = await axios.request({
        baseURL: testConfig.baseUrl,
        method: 'GET',
        url: '/contacts',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;

}

const deleteContactUsingApi = async (token) => {
    let contactsResponse = await getContactsUsingApi(token);
    let contactResponse = await contactsResponse.data[0];
    let response = contactResponse ? await axios.request({
        baseURL: testConfig.baseUrl,
        method: 'DELETE',
        url: `/contacts/${contactResponse._id}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    }): {};
    return response;
}

module.exports = {
    getBearerToken,
    createUserUsingApi,
    deleteUserUsingApi,
    deleteContactUsingApi
};