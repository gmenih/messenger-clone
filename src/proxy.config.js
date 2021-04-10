module.exports = [
    {
        context: ['/api'],
        pathRewrite: {

        },
        router: {
            '/auth': ' https://api-testing.pollpass.com/',
        },
        target: 'https://messenger-testing.pollpass.com',
        secure: false,
        changeOrigin: true,
        logLevel: 'debug',
    },
];
