'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');

const config = require(`../config/${global.env}.config.js`);


function createToken (user) {
    // iat - Date created token
    // exp - Date expire token (Token Expires in 14 days)

    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix(),
    };

    return jwt.encode(payload, config.SECRET_TOKEN);
}

function decodeToken (token) {
    const decoded = new Promise(function(resolve, reject){
        try {
            const payload = jwt.decode(token, config.SECRET_TOKEN);

            // Check token
            // If token has expired
            if (payload.exp <= moment().unix()){
                reject ({
                    status: 401,
                    message: 'Token has expired'
                });
            }
            // If token is OK resolve token
            resolve(payload.sub);

        } catch (err) {
            reject({
                status: 500,
                message: 'Invalid Token'
            });
        }
    });
    return decoded;
}
module.exports = {createToken, decodeToken };