'use strict';

const express = require('express');
const auth = require('../middlewares/auth.js');
const userController = require('../controllers/user.js');
const api = express.Router();
const testController = require('../controllers/testController.js');
const deviceController = require('../controllers/deviceController.js');


// NOTE: API endpoints (All routes start with /api)

// Test endpoints (Comment on production
api.get('/test', testController.testAPI);
api.get('/test2/:name', testController.testAPIname);
api.get('/error403', testController.testAPIerror);

// After query check if token is valid
api.get('/testToken', auth, testController.testToken);


/***** Final endpoints *****/

// Route to get an device
api.post('/device', deviceController.newDevice);

// Route to get all devices
api.get('/devices', deviceController.getDevices);

// SignUp
api.post('/signup', userController.signUp);

// SignIn
api.post('/signin', userController.signIn);
module.exports = api;