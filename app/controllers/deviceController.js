'use strict';

const  Device = require('../models/device.js');

function newDevice(req, res) {
   /* res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');*/

    console.log('POST /api/device');
    let device = new Device();
    device.name = req.body.name;
    device.description = req.body.description;
    device.i2cAddress = req.body.i2cAddress;

    device.save(function(err, deviceStrored){
       if (err) res.status(500).send({message: `Save error on DB ${err} `});
       res.status(200).send({device: deviceStrored});
    });
}


function getDevices(req,res) {
    console.log('GET /api/devices');
    Device.find({}, function(err, devices){
       res.status(200).send(devices);
    });
}



module.exports = {
    newDevice,
    getDevices
};
