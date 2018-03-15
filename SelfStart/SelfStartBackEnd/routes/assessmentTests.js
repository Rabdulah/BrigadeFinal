var express = require('express');
var router = express.Router();
var Assessments = require('../models/AssessmentTests');

router.route('/')
    .post( function (request, response) {

        var assess = new Assessments.Model(request.body.assess);
        assess.save(function (error) {
            if (error) response.send(error);
            response.json({assess: assess});
        });
    })
    .get( function (request, response) {
        Assessments.Model.find(function (error, assessments) {
            if (error) response.send(error);
            response.json({assess: assessments});
        });
    });
    
router.route('/:assessment_id')
    .get( function (request, response) {
        Assessments.Model.findById(request.params.assess_id, function (error, assess) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({assess: assess});
            }
        });
    })
    .put( function (request, response) {
        Assessments.Model.findById(request.params.city_id, function (error, assess) {
            if (error) {
                response.send({error: error});
            }
            else {

                // update each attribute
                
                assess.rehabilitationPlan = request.body.assess.rehabilitationPlan;
                assess.questions = request.body.assess.questions;
                assess.form = request.body.assess.form;
                assess.answers = request.body.assess.answers;

                assess.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({assess: assess});
                    }
                });
            }
        });
    })
    .delete( function (request, response) {
        Assessments.Model.findByIdAndRemove(request.params.city_id,
            function (error, deleted) {
                if (!error) {
                    response.json({assess: deleted});
                }
            }
        );
    });

module.exports = router;