'use strict';

// TODO; modularizar las apis
var i2c = require('i2c-bus'),
    i2c1 = i2c.openSync(1);

var ARDUINO_ADDR = 0x08;




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

// Function to send a command and receive value
function testAPIi2c(req, res) {
    var CMD = 0x64;
    // req.params.dev  -- device

    console.log(req.params.dev);
    i2c1.readByte(ARDUINO_ADDR, CMD, function(err, byte){

        if(err) {
            res.status(500).json({'message': err});
        } else {
            console.log("cmd: " + CMD + " byte: " + byte);
            res.status(200).send('ok');
        }
    });


    // This funcion only sends a command ... descarted
    // // Only send a command
    // i2c1.sendByte(0x08, CMD, function(err){
    //
    //     if(err) {
    //         res.status(500).json({'message': err});
    //     } else {
    //         res.status(200).send('OK');
    //     }
    // });
}


module.exports = {
    testAPI,
    testAPIname,
    testAPIerror,
    testAPIi2c
};