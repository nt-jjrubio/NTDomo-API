'use strict';

const express = require('express');
const api = express.Router();
const testController = require('../controllers/testController.js');
const deviceController = require('../controllers/deviceController.js');
const i2cController = require('../controllers/i2cController.js');
var cors = require('cors');
api.use(cors());

// API endpoints (All routes start with /api)

// TODO: Remove all test endpoints
/** All Test Endpoints **/
api.get('/test', testController.testAPI);
api.get('/test2/:name', testController.testAPIname);
api.get('/error403', testController.testAPIerror);

api.get('/testI2C/:dev', testController.testAPIi2c);


/** Final endpoins **/
// i2cRequest :dev <-- Device address, cmd <-- command
api.get('/i2cRequest/:dev/:cmd', i2cController.i2cRequest);

api.post('/newDevice', deviceController.newDevice);

api.delete('/deleteDevice', deviceController.deleteDevice);

api.get('/devices', deviceController.getDevices);
module.exports = api;