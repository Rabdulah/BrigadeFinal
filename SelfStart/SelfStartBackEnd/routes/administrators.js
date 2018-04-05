var express = require('express');
var router = express.Router();
var Administrators = require('../models/Administrators');
var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;
const config = require('../config/database');
const jwt = require('jsonwebtoken');

router.route('/')
    .post( function (request, response) {
        var administrator = new Administrators.Model(request.body.administrator);

        Administrators.getUserByEmail(administrator.email, (err, administrator) =>{
            if(administrator) {
                response.json({success: false, msg: 'User already registered'});
            }
        });

        Administrators.addAdmin(administrator, (err, administrator) => {
            console.log("ASDJKkajsdkjsajkd");
            if(err) {
                response.json({success: false, msg: 'Failed to register client'});
            } else{
                response.json({administrator: admin});
            }
        });
        // Administrators.save(function (error) {
        //     if (error) response.send(error);
        //     response.json({admin: admin});
        // });
    })

    .get( function (request, response) {
        let {limit, offset, sort, dir, queryPath, regex} = request.query;
        if(!limit) {
            Administrators.Model.find(function (error, admins) {
                if (error) response.send(error);
                response.json({administrator: admins});
            });
        }
        else {
            //  let users = schema.users.all().models;
            //  let users = Users.Model;

            offset = Number(offset || 0);
            limit = Number(limit || 10);
            dir = dir || 'asc';
            sort = sort || 'id';

            let query = {};
            if (regex !== '')
                query[queryPath] = new RegExp(regex, "i");

            var sortOrder = sort;
            if (sortOrder) {
                if (dir !== 'asc') {
                    sortOrder = '-' + sort;
                }
            }

            let options = {
                sort: sortOrder,
                lean: true,
                offset: offset,
                limit: limit
            };
            Administrators.Model.paginate(query, options, function (error, admins) {
                if (error) response.send(error);
                response.json({administrator: admins.docs});
            });
        }
    });

router.route('/:email')

    .get( function (request, response) {

        Administrators.getUserByEmail(request.params.email, function (error, administrator) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({success: true, administrator: administrator});
            }
        });
    });

router.route('/:administrator_id')
    .get( function (request, response) {
        Administrators.Model.findById(request.params.administrator_id, function (error, administrator) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({administrator: admin});
            }
        });
    })
    .put( function (request, response) {
        Administrators.Model.findById(request.params.administrator_id, function (error, administrator) {
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
                admin.phoneNumber = request.body.admin.phoneNumber;
                admin.form = request.body.admin.form;
                admin.account = request.body.admin.account;


                administrator.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({administrator: admin});
                    }
                });
            }
        });
    })
    .delete( function (request, response) {
        Administrators.Model.findByIdAndRemove(request.params.administrator_id,
            function (error, deleted) {
                if (!error) {
                    response.json({administrator: deleted});
                }
            }
        );
    });

module.exports = router;