var express = require('express');
var router = express.Router();
var Passwords = require('../models/Passwords');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();
const crypto = require('crypto');
var rand = require('csprng');


function hash(text) {
    const hash = crypto.createHash('sha256');
    hash.update(text);
    return hash.digest('binary');
};

function encrypt(plainText) {
    var cipher = crypto.createCipher('aes256', 'SE3350b Winter 2016');
    var crypted = cipher.update(plainText, 'ascii', 'binary');
    crypted += cipher.final('binary');
    return crypted;
};

function decrypt(cipherText) {
    var decipher = crypto.createDecipher('aes256', 'SE3350b Winter 2016');
    var dec = decipher.update(cipherText, 'binary', 'ascii');
    dec += decipher.final('ascii');
    return dec;
};


router.route('/')
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var Salt = rand(256, 36);
        var EncryptedPassword = hash(request.body.password.encryptedPassword + Salt);
        var newUserShadow = new Passwords.Model({
            salt : Salt,
            encryptedPassword : EncryptedPassword,
            email: request.body.password.email,
            passwordMustChanged: request.body.password.passwordMustChanged,
            passwordReset: request.body.password.passwordReset,
            admin: request.body.password.admin,
            client: request.body.password.client,
            practitioner: request.body.password.practitioner
        });

        newUserShadow.save(function (error) {
            if (error) {
                response.send({error: error});
            }
            else {
                console.log(newUserShadow);
                response.json({password: newUserShadow});
            }
        });
    })
    .get(parseUrlencoded, parseJSON, function (request, response) {
        var Password = request.query.filter;
        if (!Password) {
            Passwords.Model.find(function (error, UserShadow) {
                if (error) response.send(error);
                response.json({password: UserShadow});
            });
        } else {
            if (Password.user) {
                Passwords.Model.findOne({"user": Password.user}, function (error, UserShadow) {
                    if (error) response.send(error);
                    response.json({password: UserShadow});
                });
            } else {
                if (Password.userName){
                    Passwords.Model.findOne({"userName": Password.userName}, function (error, UserShadow) {
                        if (error) response.send(error);
                        response.json({password: UserShadow});
                    });
                }
            }

        }
    });


router.route('/:password_id')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        Passwords.Model.findById(request.params.password_id, function (error, UserShadow) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({password: UserShadow});
            }
        });
    })
    .put(parseUrlencoded, parseJSON, function (request, response) {
        Passwords.Model.findById(request.params.password_id, function (error, UserShadow) {
            if (error) {
                response.send({error: error});
            }
            else {
                if (request.body.passwords.passwordMustChanged) {
                    var Salt = rand(256, 36);
                    UserShadow.encryptedPassword = hash(request.body.password.encryptedPassword + Salt);
                    UserShadow.salt = Salt;
                    UserShadow.passwordMustChanged = false;
                }
                UserShadow.passwordReset = request.body.password.passwordReset;
                UserShadow.email = request.body.password.email;
                
                UserShadow.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({password: UserShadow});
                    }
                });
            }
        });
    })
    .delete(parseUrlencoded, parseJSON, function (request, response) {
        Passwords.Model.findByIdAndRemove(request.params.password_id,
            function (error, deleted) {
                if (!error) {
                    response.json({password: deleted});
                };
            }
        );
    });

module.exports = router;
