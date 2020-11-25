const cors      = require('cors');
const config    = require('../config');

function corsOptionsDelegate(req, callback) {
    let corsOptions;
    const whitelist = config.corsOpts.whitelist;

    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = {
            origin: true,
            optionsSuccessStatus: 200
        };

        return callback(null, corsOptions);
    }

    corsOptions = {origin: false};

    return callback(null, corsOptions);
}

function fixedCors(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
}

exports.cors            = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);
exports.fixedCors       = fixedCors;
