'use strict';
const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const localConfig = require('./local-config.js');

const user = require('./routes/user.js');
const api = require('./routes/api.js');

async function start(){
    
    //connect to mongodb
    await mongoose.connect(localConfig.mongodbUrl, {useNewUrlParser: true});

    //setup bodyparser
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    //enable morgan logger
    app.use(logger('dev'));

    //setup routes
    router.use('/user', user);
    router.use('/api', api);

    app.use('/', router);

    // serve static files in directory "public"
    app.use('/', express.static(__dirname + '/public'));

    //start server
    app.listen(port, ip, () => {
        console.log('HTTP: limehome-project server running on: ' +  localConfig.serverUrl);
    });
}

start();
