'use strict';

const express = require('express');
const api = express.Router()
const testController = require('../controllers/testController.js');
const deviceController = require('../controllers/deviceController.js');

// API endpoints (All routes start with /api)
api.get('/test', testController.testAPI);
api.get('/test2/:name', testController.testAPIname);
api.get('/error403', testController.testAPIerror);
api.post('/device', deviceController.newDevice);
api.get('/devices', deviceController.getDevices);
api.get('/testI2C/:dev', testController.testAPIi2c);
module.exports = api;