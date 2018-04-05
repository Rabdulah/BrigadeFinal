var express = require('express');
var router = express.Router();
// var UserRoles = require('../models/userRoles');
var Passwords = require('../models/Passwords');
var Logins = require('../models/Logins');

//Get Instances of a few models for the purpose of the route
var Administrators = require('./models/Administrators');
var Clients = require('./models/PatientProfiles');
var Physiotherapests = require('./models/Physiotherapests');

// var RolePermissions = require('../models/rolePermissions');


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

function failedLogin() {
    var failed = new Logins({
        nonce: null,
        token: null,
        loginFailed: true
    });

    failed.save(function (error) {
        if (error) return console.error(error);
        return failed;
    });

};

function getToken(UserShadow, callback) {
    UserRoles.Model.find({"user": UserShadow.user}, function (error, userRoles) {
        if (error) response.json({login: failedLogin()});
        var token = ["home"];
        var k = 1;
        var n = 0;
        var UserRolesSize = Object.keys(userRoles).length;
        if (UserRolesSize === 0) {
            callback(token);
        } else {
            for (i = 0; i < UserRolesSize; i++) {
                var roleID = userRoles[i].role;
                RolePermissions.Model.find({"roleCodes": roleID}, function (error, features) {
                    n++;
                    if (error) response.json({login: failedLogin()});
                    var FeaturesSize = Object.keys(features).length;
                    if (FeaturesSize === 0) {
                        callback(token);
                    } else {
                        for (j = 0; j < FeaturesSize; j++) {
                            token[k++] = features[j].code;
                            if (n === UserRolesSize) {
                                if (j === FeaturesSize - 1) {
                                    callback(token);
                                }
                            }
                        }
                    }
                });
            }
        }

    });
};

router.route('/')
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var login = new Logins.Model(request.body.login);

        Logins.findOne(login.email, (err, userLogin) =>{
            if(err) {
                throw err;
            }
            else if(userLogin) {
                userLogin.save().then((userLogin) => {
                    response.json({login: userLogin});
                });
            } 
        });
    })

    .get(parseUrlencoded, parseJSON, function (request, response) {
        var LOGIN = request.query.filter;
        if (!LOGIN) {
            Logins.Model.find(function (error, Login) {
                if (error) response.json({login: failedLogin()});
                response.json({login: Login});
            });
        } else {
            Logins.Model.findOne({"userName": LOGIN.userName}, function (error, Login) {
                if (error) response.json({login: failedLogin()});
                response.json({login: Login});
            });
        }
    });


router.route('/:login_id')
    .delete(parseUrlencoded, parseJSON, function (request, response) {
        Logins.Model.findByIdAndRemove(request.params.login_id,
            function (error, deleted) {
                if (!error) {
                    response.json({login: deleted});
                }
            }
        );
    });

module.exports = router;
