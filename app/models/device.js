/**
 * Created by jjrubio on 06/05/2017.
 *
 * Model for register devices
 *
 */

'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceSchema = new Schema ({
    name: { type: String, unique : true, required : true },
    address: { type: String, unique : true, required : true },
    type: { type: String, required : true },
    icon: String
});

module.exports = mongoose.model('Device', deviceSchema);