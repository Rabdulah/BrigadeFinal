var express = require('express');
var router = express.Router();
var Administrators = require('../models/Administrators');
var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;
const config = require('../config/database');
const jwt = require('jsonwebtoken');

router.route('/')
    .post( function (request, response) {
        var admin = new Administrators.Model(request.body.admin);

        Administrators.getUserByEmail(admin.email, (err, admin) =>{
            if(admin) {
                response.json({success: false, msg: 'User already registered'});
            }
        });

        Administrators.addAdmin(admin, (err, admin) => {
            console.log("ASDJKkajsdkjsajkd");
            if(err) {
                response.json({success: false, msg: 'Failed to register client'});
            } else{
                response.json({admin: admin});
            }
        });
        // Administrators.save(function (error) {
        //     if (error) response.send(error);
        //     response.json({admin: admin});
        // });
    })
    .get( function (request, response) {
        Administrators.Model.find(function (error, admins) {
            if (error) response.send(error);
            response.json({admin: admins});
        });
    });

router.route('/:email')

    .get( function (request, response) {

        Administrators.getUserByEmail(request.params.email, function (error, admin) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({success: true, admin: admin});
            }
        });
    });

router.route('/:admin_id')
    .get( function (request, response) {
        Administrators.Model.findById(request.params.admin_id, function (error, admin) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({admin: admin});
            }
        });
    })
    .put( function (request, response) {
        Administrators.Model.findById(request.params.admin_id, function (error, admin) {
            if (error) {
                response.send({error: error});
            }
            else {

                // update each attribute
                admin.ID = request.body.admin.ID;
                admin.familyName = request.body.admin.familyName;
                admin.givenName = request.body.admin.givenName;
                admin.email = request.body.admin.email;
                admin.dateHired = request.body.admin.dateHired;
                admin.dateFired = request.body.admin.dateFired;
                admin.form = request.body.admin.form;
                admin.account = request.body.admin.account;


                admin.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({admin: admin});
                    }
                });
            }
        });
    })
    .delete( function (request, response) {
        Administrators.Model.findByIdAndRemove(request.params.admin_id,
            function (error, deleted) {
                if (!error) {
                    response.json({admin: deleted});
                }
            }
        );
    });

module.exports = router;