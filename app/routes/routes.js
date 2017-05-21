'use strict';

const express = require('express');
const auth = require('../middlewares/auth.js');
const api = express.Router();
const testController = require('../controllers/testController.js');
const deviceController = require('../controllers/deviceController.js');


// API endpoints (All routes start with /api)
api.get('/test', testController.testAPI);
api.get('/test2/:name', testController.testAPIname);
api.get('/error403', testController.testAPIerror);
api.post('/device', deviceController.newDevice);
api.get('/devices', deviceController.getDevices);

// After query check if token is valid
api.get('/testToken', auth, testController.testToken);
module.exports = api;