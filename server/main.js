'use strict';
const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const localConfig = require('./local-config.json');

const user = require('./routes/users.js');
const api = require('./routes/properties.js');

async function start(){
    
    //connect to mongodb
    await mongoose.connect(localConfig.mongodbUrl, {useNewUrlParser: true});

    //setup bodyparser
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    //enable morgan logger
    app.use(logger('dev'));

    //setup routes
    router.use('/users', user);
    router.use('/properties', api);

    app.use('/', router);

    // serve static files in directory "public"
    app.use('/', express.static(__dirname + '/public'));

    //start server
    app.listen(8080, () => {
        console.log('HTTP: limehome-project server running on: ' +  localConfig.serverUrl);
    });
}

start();
