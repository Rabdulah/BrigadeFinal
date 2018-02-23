var express = require('express');
var router = express.Router();
var Physiotherapest = require('../models/Physiotherapests.js');

router.route('/')
        .post(function (request, response) {
            var physiotherapest = new Physiotherapest.Model(request.body.physiotherapest);
            physiotherapest.save(function (error) {
                if (error) response.send(error);
                response.json({physiotherapest: physiotherapest});
            });
        })
        
        .get(function (request, response) {
            Physiotherapest.Model.find(function (error, physiotherapest) {
                if (error) response.send(error);
                response.json({physiotherapest: physiotherapest});
            });
        });

router.route('/:physiotherapest_id')
        .get(function (request, response) {
            Physiotherapest.Model.findById(request.params.physiotherapest_id, function (error, physiotherapest) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({physiotherapest: physiotherapest});
                }
            });
        })
        
        .put(function (request, response) {
            Physiotherapest.Model.findById(request.params.physiotherapest_id, function (error, physiotherapest) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    physiotherapest.ID = request.body.physiotherapest.ID;
                    physiotherapest.familyName = request.body.physiotherapest.familyName;
                    physiotherapest.givenName = request.body.physiotherapest.givenName;
                    physiotherapest.email = request.body.physiotherapest.email;
                    physiotherapest.dateHired = request.body.physiotherapest.dateHired;
                    physiotherapest.dateFinished = request.body.physiotherapest.dateFinished;
                    physiotherapest.treatment = request.body.physiotherapest.treatment;
                    physiotherapest.account = request.body.physiotherapest.account;
                    
                    physiotherapest.save(function (error) {
                        if (error) {
                            response.send({error: error});
                        }
                        else {
                            response.json({physiotherapest: physiotherapest});
                        }
                    });
                }
            });
        })
        
        .delete(function (request, response) {
            Physiotherapest.Model.findByIdAndRemove(request.params.physiotherapest_id, function (error, deleted) {
                if (!error) {
                    response.json({physiotherapest: deleted});
                }
            });
        });
        
module.exports = router;
