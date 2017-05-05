/**
 * Created by juanjoserubio on 05/05/2017.
 */

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const server = express();

// Aqui irian los controladores de los modelos y demas
const testController = require('./controllers/testController.js');


server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// API endpoints
server.get('/api/test', testController.testAPI);
server.get('/api/test2/:name', testController.testAPIname);

module.exports = server;