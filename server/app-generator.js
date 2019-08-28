'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const localConfig = require('./local-config.json');

const users = require('./routes/users.js');
const properties = require('./routes/properties.js');
const views = require('./routes/views.js');

const path = require('path');

/**
 * Generates the express app
 */
module.exports = class AppGenerator {

    /**
     * @param {String} mongodbUrl 
     * @param {boolean} logRequests 
     */
    constructor(mongodbUrl, logRequests) {
        this.mongodbUrl = mongodbUrl;
        this.logRequests = logRequests;
        this.app = express();
        this.router = express.Router();
    }

    /**
     * Generates the express app
     * @returns {Promise<Express>}
     */
    async generate() {
        await this.connectToMongoDB();
        this.setupMiddlewares();
        this.setupCors();
        this.setupRoutes();
        this.setupStaticFileServing();
        return this.app;
    }

    /**
     * Start the server
     * call only after generate
     */
    startServer() {
        this.app.listen(8080, '127.0.0.1', () => {
            console.log('HTTP: limehome-project server running on: http://127.0.0.1:8080');
        });
    }

    async connectToMongoDB() {
        return mongoose.connect(localConfig.mongodbUrl, {
            useNewUrlParser: true,
            useFindAndModify: false
        });
    }

    setupMiddlewares() {
        //setup bodyparser
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());

        if (this.logRequests) {
            //enable morgan logger
            this.app.use(logger('dev'));
        }
    }

    setupCors() {
        //Enable cors
        this.app.use(function (req, res, next) {
            let allowedOrigins = [
                'http://localhost:3000', 
                'http://127.0.0.1:8080'];
            let origin = req.headers.origin;
            if (allowedOrigins.indexOf(origin) > -1) {
                res.setHeader('Access-Control-Allow-Origin', origin);
            }

            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            res.header('Access-Control-Allow-Credentials', true);
            return next();
        });
    }

    setupRoutes() {
        this.router.use('/users', users);
        this.router.use('/properties', properties);
        this.router.use('/', views);

        this.app.use('/', this.router);
    }

    setupStaticFileServing() {
        //static files in ../client/build
        this.app.use('/', express.static(path.join(__dirname, '../client/build')));
    }


}
