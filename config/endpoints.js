module.exports = {
    apolloEndpoint: {
        'production': 'https://utsc-food.azurewebsites.net/graphql',
        'qa': 'https://api-test.cheapreats.com/graphql'
    },
    verificationEndpoint: {
        'production': 'https://utsc-food.azurewebsites.net/get_code',
        'qa': 'https://api-test.cheapreats.com/get_code'
    },
    notificationEndpoint: {
        'production': 'https://func-notification-services-qa.cheapreats.com',
        'qa': 'https://func-notification-services-qa.cheapreats.com'
    }
};
