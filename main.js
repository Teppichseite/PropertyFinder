'use strict';
const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const logger = require('morgan');

const port = 8080;
const ip = "127.0.0.1"

const user = require('./routes/user.js');
const api = require('./routes/api.js');

//setup bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//enable morgan logger
app.use(logger('dev'));

router.use('/user', user);
router.use('/api', api);

app.use('/', router);

// serve static files in directory "public"
app.use('/', express.static(__dirname + '/public'));

//start server
app.listen(port, ip, () => {
    console.log('HTTP: limehome-project server running on: ' +  ip + ":" + port);
});