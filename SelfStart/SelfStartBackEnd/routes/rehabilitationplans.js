var express = require('express');
var router = express.Router();
var Rehabilitation = require('../models/RehabilitationPlans');

router.route('/')
    .post( function (request, response) {
        var rehabilitation = new Rehabilitation.Model(request.body.rehabilitationplan);
        rehabilitation.save(function (error) {
            if (error) response.send(error);
            response.json({rehabilitationplan: rehabilitation});
        });
    })
    .get( function (request, response) {
        console.log("http://localhost:8082/rehabplans GET used");
        Rehabilitation.Model.find(function (error, rehabilitations) {
            if (error) response.send(error);
            response.json({rehabilitationplan: rehabilitations});
        });
    });

router.route('/:rehabilitation_id')
    .get( function (request, response) {
        Rehabilitation.Model.findById(request.params.rehabilitations_id, function (error, rehabilitations) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({rehabilitation: rehabilitations});
            }
        });
    })

    .put( function (request, response) {
        Rehabilitation.Model.findById(request.params.exer_id, function (error, rehabilitation) {
            if (error) {
                response.send({error: error});
            }
            else {

                // update each attribute
                rehabilitation.planName = request.body.rehabilitation.planName;
                rehabilitation.description = request.body.rehabilitation.description;
                rehabilitation.physioID = request.body.rehabilitation.physioID;
                rehabilitation.goal = request.body.rehabilitation.goal;
                rehabilitation.date = request.body.rehabilitation.date;
                rehabilitation.timeToComplete = request.body.rehabilitation.timeToComplete;
                rehabilitation.plan = request.body.rehabilitation.plan;
                rehabilitation.test = request.body.rehabilitation.test;
                rehabilitation.exercise = request.body.rehabilitation.exercise;


                rehabilitation.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({rehabilitation: rehabilitation});
                    }
                });
            }
        });
    })

    .delete( function (request, response) {
        Rehabilitation.Model.findByIdAndRemove(request.params.exercise_id,
            function (error, deleted) {
                if (!error) {
                    response.json({rehabilitation: deleted});
                }
            }
        );
    });

module.exports = router;