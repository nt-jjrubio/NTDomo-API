'use strict';

function testAPI(req, res) {

    res.send('Hello');

}

function testAPIname(req, res) {
    res.status(200).send(req.params.name);
}


module.exports = {
    testAPI,
    testAPIname
};