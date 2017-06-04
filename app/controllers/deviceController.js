'use strict';

const  Device = require('../models/device.js');

function newDevice(req, res) {

    console.log('POST /api/device');
    let device = new Device();
    device.name = req.body.name;
    device.address = req.body.address;
    device.type = req.body.type;
    device.icon = req.body.icon;

    device.save(function(err, deviceStrored){
       if (err) {
           res.status(500).send({message: `Save error on DB ${err} `});
       }else{
           res.status(200).send({device: deviceStrored});
       }

    });
}

function deleteDevice(req, res) {
   console.log('DELETE /api/deleteDevice');

   Device.remove({ address: req.params.dev }, function(err, success){
        if (err) {
            res.status(500).send({message: `Save error on DB ${err} `});
        } else {
            console.log(success);
            res.status(200).send({success});
            // if(success.n > 0) {
            //     res.status(200).send({success});
            // }else{
            //     res.status(404).send({'error not found': req.params.dev});
            // }
        }


    });
}

function modifyDevice(req, res) {
    console.log('POST /api/modifyDevice');


    let device = new Device();

    Device.findOne({'address' : req.body.address } , function(err, dev) {

        console.log(dev);
        device=dev;

        device.name = req.body.name;
        device.address = req.body.address;
        device.type = req.body.type;
        device.icon = req.body.icon;

       // res.status(200).send(dev);
        device.save(function(err, deviceStrored) {
            if (err) {
                res.status(500).send({message: `Save error on DB ${err} `});
            } else {
                res.status(200).send({device: deviceStrored});
            }
        });

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
    getDevices,
    deleteDevice,
    modifyDevice
};
