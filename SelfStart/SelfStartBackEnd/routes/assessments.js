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
                assess.name = request.body.assess.name;
                assess.description = request.body.assess.description;
                assess.authorName = request.body.assess.authorName;
                assess.testResults = request.body.assess.testResults;
                assess.rehabilitationPlan = request.body.assess.rehabilitationPlan;
                assess.assessmentTool = request.body.assess.assessmentTool;
                assess.recommendation = request.body.assess.recommendation;

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