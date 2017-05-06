/**
 * Created by Windows NT on 06/05/2017.
 *
 * Model for register devices
 *
 */

'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * picture: base64?
 *
 *
 *
 */
const deviceSchema = new Schema ({
    name: String,
    description: String,
    i2cAddress: String
});

module.exports = mongoose.model('Device', deviceSchema);