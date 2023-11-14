const testConfig = {
    baseUrl: 'https://thinking-tester-contact-list.herokuapp.com'
}

const timeOut = {
    halfSecond: 30000,
    oneSecond: 60000
}

const stateConfig = {
    url: 'https://giphy.com',
    users: [
        {
            type: 'basic',
            userName: 'basic.user@gmail.com',
            password: '**********'
        },
        {
            type: 'advanced',
            userName: 'advanced.user@gmail.com',
            password: '**********'
        }
    ]
}

module.exports = { timeOut, testConfig, stateConfig };