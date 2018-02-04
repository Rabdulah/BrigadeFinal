var express = require('express');
var router = express.Router();
var rehabilitationplans = require('../models/RehabilitationPlans');

router.route('/')
    .post( function (request, response) {
        var rehabilitationplans = new rehabilitationplans.Model(request.body.rehabilitationplans);
        rehabilitationplans.save(function (error) {
            if (error) response.send(error);
            response.json({rehabilitationplans: rehabilitationplans});
        });
    })
    .get( function (request, response) {
        console.log("http://localhost:8082/rehabplans used");
        rehabilitationplans.Model.find(function (error, rehabilitations) {
            if (error) response.send(error);
            response.json({rehabilitationplans: rehabilitations});
        });
    });
    
router.route('/:rehabilitation_id')
    .get( function (request, response) {
        rehabilitationplans.Model.findById(request.params.rehabilitations_id, function (error, rehabilitations) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({rehabilitationplans: rehabilitations});
            }
        });
    })
   
    .put( function (request, response) {
        rehabilitationplans.Model.findById(request.params.exer_id, function (error, rehabilitationplans) {
            if (error) {
                response.send({error: error});
            }
            else {

                // update each attribute
                rehabilitationplans.planName = request.body.rehabilitationplans.planName;
                rehabilitationplans.description = request.body.rehabilitationplans.description;
                rehabilitationplans.physioID = request.body.rehabilitationplans.physioID;
                rehabilitationplans.goal = request.body.rehabilitationplans.goal;
                rehabilitationplans.date = request.body.rehabilitationplans.date;
                rehabilitationplans.timeToComplete = request.body.rehabilitationplans.timeToComplete;
                rehabilitationplans.plan = request.body.rehabilitationplans.plan;
                rehabilitationplans.test = request.body.rehabilitationplans.test;
                rehabilitationplans.exercise = request.body.rehabilitationplans.exercise;


                rehabilitationplans.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({rehabilitationplans: rehabilitationplans});
                    }
                });
            }
        });
    })
    
    .delete( function (request, response) {
        rehabilitationplans.Model.findByIdAndRemove(request.params.exercise_id,
            function (error, deleted) {
                if (!error) {
                    response.json({rehabilitationplans: deleted});
                }
            }
        );
    });

module.exports = router;