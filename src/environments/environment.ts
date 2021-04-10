export const environment = {
    production: false,

    restApiBaseEndpoint: 'https://api-testing.pollpass.com/',
    clientId: '1PlWXn3VKdpMu0M14OYhQTCeSM2y3Aq8awDseo42QlINHBtpM6e8wHf8fabkRGJA',
    clientSecret: 'Cjt3yecyT5XyMC9onGHeRhkgF7f1pGMzXyqMenKUZZXgpRZFseo36NliFgZBA2bX',

    neoBaseEndpoint: 'wss://neo-testing.pollpass.com/',
};

export type Environment = typeof environment;
