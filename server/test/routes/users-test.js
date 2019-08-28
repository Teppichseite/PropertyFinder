const chai = require('chai'); 
const expect = chai.expect;

const users = require('./routes/users.js');

const request = require('supertest');
const express = require('express');
const router = express.Router();

function getExpressApp(){
    let app = express();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    router.use('/users', users);
    app.use('/', router);
    return app
}



