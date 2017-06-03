'use strict';

const express = require('express');
const api = express.Router();
const auth = require('../middlewares/auth.js');
const userController = require('../controllers/user.js');
const testController = require('../controllers/testController.js');
const deviceController = require('../controllers/deviceController.js');
const i2cController = require('../controllers/i2cController.js');
const sysController = require('../controllers/sysController.js');

var cors = require('cors');
api.use(cors());

// API endpoints (All routes start with /api)

// TODO: Remove all test endpoints
/** All Test Endpoints **/
api.get('/test', testController.testAPI);
api.get('/test2/:name', testController.testAPIname);
api.get('/error403', testController.testAPIerror);
api.get('/testI2C/:dev', testController.testAPIi2c);

// After query check if token is valid
api.get('/testToken', auth, testController.testToken);


/***** Final endpoints *****/

// Route to get an device
api.post('/device', deviceController.newDevice);

// Route to get all devices
api.get('/devices', deviceController.getDevices);

// Route to create new device
api.post('/newDevice', deviceController.newDevice);

// Route to delete device
api.delete('/deleteDevice', deviceController.deleteDevice);


// Route to connect to devices
// i2cRequest :dev <-- Device address, cmd <-- command
api.get('/i2cRequest/:dev/:cmd', auth, i2cController.i2cRequest);


// SignUp
api.post('/signup', userController.signUp);

// SignIn
api.post('/signin', userController.signIn);

// Shutdown
api.get('/shutdown', sysController.shutdown);

// Reboot
api.get('/reboot', sysController.reboot);
module.exports = api;