module.exports = {
    apolloEndpoint: {
        'production': 'https://utsc-food.azurewebsites.net/graphql',
        'qa': 'https://cheapreatsmainapi-test.azurewebsites.net/graphql'
    },
    verificationEndpoint: {
        'production': 'https://utsc-food.azurewebsites.net/get_code',
        'qa': 'https://cheapreatsmainapi-test.azurewebsites.net/get_code'
    },
    notificationEndpoint: {
        'production': 'https://func-notification-services-qa.cheapreats.com',
        'qa': 'https://func-notification-services-qa.cheapreats.com'
    }
};
