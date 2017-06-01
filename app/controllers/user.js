'use strict';

// const mongoose = require('mongoose');
const User = require('../models/user.js');
const service = require('../services/index.js');

function signUp (req, res) {
    const user = new User({
        username: req.body.username,
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
        }else{
            return res.status(201).send({ token: service.createToken(user) });
        }
    });
}

function signIn (req, res) {
    console.log('signIn', req.body.username );
    if(req.body.username && req.body.password) {


        User.findOne({username: req.body.username}, function (err, user) {

            console.log(user);

            var validPass = user.validPassword(req.body.password);




            if (err) {
                return res.status(500).send({message: err});
            }

            if(!validPass){
                return res.status(403).send({message: 'Password error'});
            }
            if (!user) {
                return res.status(404).send({message: 'User not found'});
            }else{
                req.user = user;
                res.status(200).send({
                    message: 'Login OK',
                    username : req.body.username,
                    token: service.createToken(user)
                });
            }


        });
    }else{
        res.status(403).send({'message':'username or password is empty'});
    }

}

module.exports = {
    signUp,
    signIn
};