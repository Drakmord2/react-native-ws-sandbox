
let configs = {
    authOpts: {
        acl: false,
        passthrough: [ '/']
    },
    corsOpts: {
        whitelist: ['http://localhost:3000', 'https://localhost:3443']
    }
};

module.exports = configs;
