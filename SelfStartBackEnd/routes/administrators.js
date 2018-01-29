var express = require('express');
var router = express.Router();
var Administrators = require('../models/Administrators');

router.route('/')
    .post( function (request, response) {
        var admin = new Administrators.Model(request.body.admin);
        Administrators.save(function (error) {
            if (error) response.send(error);
            response.json({admin: admin});
        });
    })
    .get( function (request, response) {
        Administrators.Model.find(function (error, admins) {
            if (error) response.send(error);
            response.json({admin: admins});
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
