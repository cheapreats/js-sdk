module.exports = {
    apolloEndpoint: {
        'production': 'https://cheapreatsbetaroundoneapi.azurewebsites.net/graphql',
        'qa': 'https://cheapreatsmainapi-test.azurewebsites.net/graphql'
    },
    restEndpoint: {
        'production': 'https://cheapreatsbetaroundoneapi.azurewebsites.net',
        'qa': 'https://cheapreatsmainapi-test.azurewebsites.net'
    },
    notificationEndpoint: {
        'production': 'https://cheapreatsnotificationservicesbetaroundone.azurewebsites.net',
        'qa': 'https://func-notification-services-qa.cheapreats.com'
    }
};
