'use strict';

// const mongoose = require('mongoose');
const User = require('../models/user.js');
const service = require('../services/index.js');

function signUp (req, res) {
    const user = new User({
        username: req.body.email,
        password: req.body.password,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        avatar: req.body.avatar
       // lastLogin: Date
    });

    user.save(function(err){
        console.log('entra?');
        if(err){
            console.log(err);
            // res.status(500).send({ message: 'Error on create user'});
            res.status(500).send(err);
        }
        return res.status(201).send({ token: service.createToken(user) });
    });
}

function signIn (req, res) {
    User.find({ username: req.body.username }, function(err, user){
        if(err) {
           return res.status(500).send({message: err});
        }
        if(!user) {
            return res.status(404).send({message: 'User not found'});
        }

        req.user = user;
        res.status(200).send({
            message: 'Login OK',
            token: service.createToken(user)
        });
    });

}

module.exports = {
    signUp,
    signIn
};