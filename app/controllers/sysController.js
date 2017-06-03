'use strict';
var exec = require('child_process').exec;

function shutdown(req, res) {
    console.log('/api/shutdown');

    var cmd = 'sudo shutdown -h now';


    exec(cmd, function (err, stdout, stderr) {
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            if(stderr) {
                console.log(stdout);
                res.status(500).send(err);
            } else {
                console.log(stdout);
                res.status(200).send(stdout);
            }

        }
    });

}

function reboot(req, res) {

    console.log('/api/reboot');

    var cmd = 'sudo reboot';


    exec(cmd, function (err, stdout, stderr) {
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            if(stderr) {
                console.log(stdout);
                res.status(500).send(err);
            } else {
                console.log(stdout);
                res.status(200).send(stdout);
            }

        }
    });
}




module.exports = {
    shutdown,
    reboot
};
