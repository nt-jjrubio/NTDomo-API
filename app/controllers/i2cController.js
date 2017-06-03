'use strict';

var i2c = require('i2c-bus'),
    i2c1 = i2c.openSync(1);

// Function to test endpoint /api/i2cRequest
function i2cRequest(req, res) {

    // req params: dev and cmd
    console.log("/api/i2cRequest");
    console.log(req.params)


    // Validate params (if not a number parseInt returns NaN)
    var deviceAddr = parseInt(req.params.dev);
    var cmd = parseInt(req.params.cmd);
    var paramError;

    if(deviceAddr > 1 && deviceAddr < 256 && cmd >=0 && cmd < 256 )
    {

        //var CMD = 0x65;
        i2c1.readByte(deviceAddr, cmd, function(err, byte){

            if(err) {
                res.status(500).json({'message': err});
            } else {
                console.log("cmd: " + cmd + " byte: " + byte);
                res.status(200).send({'value' : parseInt(byte)});
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
    }else{
        res.send('ko');
    }

}


module.exports = {
    i2cRequest
};