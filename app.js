require('dotenv').config();
const {google} = require("googleapis")
const expressSession = require("express-session")
const Auth0Strategy = require("passport-auth0")
const createError = require('http-errors');
const express = require('express');
const path = require("path")
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const session = require('./config/session.config');
const cors = require('./config/cors.config')
const bodyParser = require("body-parser")


/**
 * DB config
 */
require('./config/db.config');
const passportConfig = require('./config/passport.config')


/**
 * Google social login config
 */

const CLIENT_ID = OAuth2Data.client.id;
const CLIENT_SECRET = OAuth2Data.client.secret;
const REDIRECT_URL = OAuth2Data.client.redirect
 


/**
 * Configure express
 */
const app = express();
app.use(cors)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session);
app.use(passportConfig);


/**
 * Configure routes
 */
const router = require('./config/routes.js');
app.use('/', router);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// Configure user

app.use ((req, _, next) => {
    req.currentUser = req.session.user
    next()
})

// error handler
app.use(function (error, req, res, next) {
    console.error(error);

    res.status(error.status || 500);

    const data = {}

    if (error instanceof mongoose.Error.ValidationError) {
        res.status(400);
        for (field of Object.keys(error.errors)) {
            error.errors[field] = error.errors[field].message
        }
        data.errors = error.errors
    } else if (error instanceof mongoose.Error.CastError) {
        error = createError(404, 'Resource not found')
    }

    data.message = error.message;
    res.json(data);
});

/** 
 * Listen on provided port
 */
const port = normalizePort(process.env.PORT || '5000');
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

// Helper functions

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}