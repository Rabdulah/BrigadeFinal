var express = require('express');
var router = express.Router();
var AssessmentTests = require('../models/AssessmentTests');

router.route('/')
    .post( function (request, response) {

        var assessmentTest = new AssessmentTests.Model(request.body.assessmentTest);
        assessmentTest.save(function (error) {
            if (error) response.send(error);
            response.json({assessmentTest: assessmentTest});
        });
    })
    .get( function (request, response) {
        AssessmentTests.Model.find(function (error, assessmentTests) {
            if (error) response.send(error);
            response.json({assessmentTest: assessmentTests});
        });
    });

router.route('/:assessment_id')
    .get( function (request, response) {
        AssessmentTests.Model.findById(request.params.assess_id, function (error, assessmentTest) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({assessmentTest: assessmentTest});
            }
        });
    })
    .put( function (request, response) {
        AssessmentTests.Model.findById(request.params.city_id, function (error, assessmentTest) {
            if (error) {
                response.send({error: error});
            }
            else {

                // update each attribute
                assessmentTest.questions = request.body.assessmentTest.questions;
                assessmentTest.form = request.body.assessmentTest.form;
                assessmentTest.rehabPlan = request.body.assessmentTest.rehabPlan;
                assessmentTest.answers = request.body.assessmentTest.answers;
                assessmentTest.completed = request.body.assessmentTest.completed;

                assessmentTest.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({assessmentTest: assessmentTest});
                    }
                });
            }
        });
    })
    .delete( function (request, response) {
        AssessmentTests.Model.findByIdAndRemove(request.params.city_id,
            function (error, deleted) {
                if (!error) {
                    response.json({assessmentTest: deleted});
                }
            }
        );
    });

module.exports = router;