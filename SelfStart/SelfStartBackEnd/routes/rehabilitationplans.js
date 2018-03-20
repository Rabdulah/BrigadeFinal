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
                response.json({rehabilitationplan: rehabilitations});
            }
        });
    })

    .put( function (request, response) {
        console.log("update on rehab plan");
        Rehabilitation.Model.findById(request.params.rehabilitation_id, function (error, rehabilitation) {
            if (error) {
                //send error message
                response.send({error: error});
            }
            else {
                // update each attribute

                rehabilitation.planName = request.body.rehabilitationplan.planName;
                rehabilitation.description = request.body.rehabilitationplan.description;
                rehabilitation.physioID = request.body.rehabilitationplan.physioID;
                rehabilitation.goal = request.body.rehabilitationplan.goal;
                rehabilitation.date = request.body.rehabilitationplan.date;
                rehabilitation.timeToComplete = request.body.rehabilitationplan.timeToComplete;
                rehabilitation.plan = request.body.rehabilitationplan.plan;
                rehabilitation.assessmentTests = request.body.rehabilitationplan.assessmentTests;
                rehabilitation.exercise = request.body.rehabilitationplan.exercise;

                rehabilitation.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({rehabilitationplan: rehabilitation});
                    }
                });
            }
        });
    })
    .delete( function (request, response) {
        console.log("delete on rehab plan");
        Rehabilitation.Model.findByIdAndRemove(request.params.rehabilitation_id,
            function (error, deleted) {
                if (!error) {
                    response.json({rehabilitationplan: deleted});
                }
            }
        );
    });

module.exports = router;