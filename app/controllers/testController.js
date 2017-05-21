'use strict';

// Function to test endpoint /api/test
function testAPI(req, res) {
    res.status(200).send('Hello');
}

// Function to test endpoint /api/test/:name
function testAPIname(req, res) {
    res.status(200).send(req.params.name);
}

// Function to test send error endpoint /api/error403
function testAPIerror(req,res) {
    res.status(403).json({'message':'Test error 403 forbidden'});
}

function testToken(req, res) {

    res.status(200).send({message: 'Logged OK'});
}

module.exports = {
    testAPI,
    testAPIname,
    testAPIerror,
    testToken
};