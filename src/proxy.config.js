module.exports = [
    {
        context: ['/api'],
        pathRewrite: {

        },
        router: {

        },
        target: 'https://messenger-testing.pollpass.com',
        secure: false,
        changeOrigin: true,
        logLevel: 'debug',
    },
];
