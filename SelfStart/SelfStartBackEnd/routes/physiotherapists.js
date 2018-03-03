var express = require('express');
var router = express.Router();
var Physiotherapist = require('../models/Physiotherapists.js');

router.route('/')
        .post(function (request, response) {
            var physiotherapist = new Physiotherapist.Model(request.body.physiotherapist);
            physiotherapist.save(function (error) {
                if (error) response.send(error);
                response.json({physiotherapist: physiotherapist});
            });
        })
        
        .get(function (request, response) {
            Physiotherapist.Model.find(function (error, physiotherapist) {
                if (error) response.send(error);
                response.json({physiotherapist: physiotherapist});
            });
        });

router.route('/:physiotherapist_id')
        .get(function (request, response) {
            Physiotherapist.Model.findById(request.params.physiotherapist_id, function (error, physiotherapist) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({physiotherapist: physiotherapist});
                }
            });
        })
        
        .put(function (request, response) {
            Physiotherapist.Model.findById(request.params.physiotherapist_id, function (error, physiotherapist) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    physiotherapist.ID = request.body.physiotherapist.ID;
                    physiotherapist.familyName = request.body.physiotherapist.familyName;
                    physiotherapist.givenName = request.body.physiotherapist.givenName;
                    physiotherapist.email = request.body.physiotherapist.email;
                    physiotherapist.dateHired = request.body.physiotherapist.dateHired;
                    physiotherapist.dateFinished = request.body.physiotherapist.dateFinished;
                    physiotherapist.treatment = request.body.physiotherapist.treatment;
                    physiotherapist.account = request.body.physiotherapist.account;
                    physiotherapist.appointments = request.body.physiotherapist.appointments;
                    
                    physiotherapist.save(function (error) {
                        if (error) {
                            response.send({error: error});
                        }
                        else {
                            response.json({physiotherapist: physiotherapist});
                        }
                    });
                }
            });
        })
        
        .delete(function (request, response) {
            Physiotherapist.Model.findByIdAndRemove(request.params.physiotherapist_id, function (error, deleted) {
                if (!error) {
                    response.json({physiotherapist: deleted});
                }
            });
        });
        
module.exports = router;
