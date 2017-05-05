/**
 * Created by juanjoserubio on 05/05/2017.
 */

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const server = express();

// API endpoints
const api = require('./routes/routes.js');

// Controllers
const testController = require('./controllers/testController.js');

// bodyParse to convert body http message
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// Use API endpoints
server.use('/api',api);


module.exports = server;