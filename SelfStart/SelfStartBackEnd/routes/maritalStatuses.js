var express = require('express');
var router = express.Router();
var MaritalStatuses = require('../models/MaritalStatuses');

router.route('/')
    .post( function (request, response) {
        var status = new MaritalStatuses.Model(request.body.status);
        status.save(function (error) {
            if (error) response.send(error);
            response.json({maritalStatus: status});
        });
    })
    .get( function (request, response) {
        MaritalStatuses.Model.find(function (error, statuses) {
            if (error) response.send(error);
            response.json({maritalStatus: statuses});
        });
    });

router.route('/:status_id')
    .get( function (request, response) {
        MaritalStatuses.Model.findById(request.params.status_id, function (error, status) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({maritalStatus: status});
            }
        });
    })
    .put( function (request, response) {
        MaritalStatuses.Model.findById(request.params.status_id, function (error, status) {
            if (error) {
                response.send({error: error});
            }
            else {

                // update each attribute
                status.name = request.body.status.name;
                status.patients = request.body.status.patients;
    


                status.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({maritalStatus: status});
                    }
                });
            }
        });
    })
    .delete( function (request, response) {
        MaritalStatuses.Model.findByIdAndRemove(request.params.status_id,
            function (error, deleted) {
                if (!error) {
                    response.json({maritalStatus: deleted});
                }
            }
        );
    });

module.exports = router;