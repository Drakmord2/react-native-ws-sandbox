// Modulos
const express       = require('express');
const bodyParser    = require('body-parser');
const logger        = require('morgan');
const cors          = require('./middleware/cors');
const helmet        = require("helmet");
const path          = require("path");

// Aplicacao
const app       = express();
const server    = require('http').Server(app);
const wss       = require('express-ws')(app,server);

// Middlewares
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors.fixedCors);
app.use(logger('dev'));

// Routers
const commRouter = require('./router/commRouter');

// Rotas
app.use('/v1/comm', commRouter);

// Error Handler
app.use((err, req, res, next) => {
    let message = "Error.";
    if (process.env.NODE_ENV !== "production" || err.status === 403) {
        console.error(err.stack);
        message = err.message;
    }
    res.status(err.status || 500).json({error: message});
});

module.exports = {
    app: app, 
    server: server
};
