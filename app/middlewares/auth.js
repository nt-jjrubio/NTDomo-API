'use strict';

const services = require('../../services/index.js');
function isAuth (req, res, next) {
    if(!req.headers.authorization) {
        return res.status(403).send({ message: 'No auth'});
    }

    // For split "bearer" and token
    const token = req.headers.authorization.split(' ')[1];

    services.decodeToken(token)
        .then(function(response) {
            req.user = response;
            next();
        })
        .catch(function(response){
            res.status(response.status).send('Token fails ');
        });
}

module.exports = isAuth;