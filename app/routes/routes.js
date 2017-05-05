'use strict';

const express = require('express');
const api = express.Router()
const testController = require('../controllers/testController.js');


// API endpoints (All routes start with /api)
api.get('/test', testController.testAPI);
api.get('/test2/:name', testController.testAPIname);
api.get('/error403', testController.testAPIerror);
module.exports = api;