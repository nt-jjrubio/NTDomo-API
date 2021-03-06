/**
 * Created by jjrubio on 21/05/2017.
 *
 * Users schema
 *
 */

'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

/** Select: false --> dont send password in user query **/
const UserSchema = new Schema ({
    username: { type: String, unique: true, required : true }, //select: false,
    password: { type: String,  required : true },
    firstName : String,
    lastName : String,
    email : { type: String, unique: true, lowercase: true, required: true },
    avatar: String,
    lastLogin: Date
});

UserSchema.pre('save', function(next) {
    let user = this;
    if(!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(10, function (err ,salt) {
        if(err) {
            return next();
        }
        bcrypt.hash(user.password, salt, null, function(err, hash){
            if (err) {
                return next();
            }
            user.password = hash;
            next();
        });
    });
});



UserSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User', UserSchema);