var express = require('express');
var router = express.Router();
var Exercise = require('../models/Exercise');

router.route('/')
    .post( function (request, response) {
        var exer = new Exercise.Model(request.body.exer);
        exer.save(function (error) {
            if (error) response.send(error);
            response.json({exer: exer});
        });
    })
    .get( function (request, response) {
        Exercise.Model.find(function (error, Exercise) {
            if (error) response.send(error);
            response.json({exer: Exercise});
        });
    });
    
router.route('/:excercise_id')
    .get( function (request, response) {
        Exercise.Model.findById(request.params.excercise_id, function (error, exer) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({exer: exer});
            }
        });
    })
    /// post vs put?
    .put( function (request, response) {
        Exercise.Model.findById(request.params.city_id, function (error, exer) {
            if (error) {
                response.send({error: error});
            }
            else {

                // update each attribute
                exer.name = request.body.exer.name;
                exer.description = request.body.exer.description;
                exer.objectives = request.body.exer.objectives;
                exer.actionSteps = request.body.exer.actionSteps;
                exer.authorName = request.body.exer.authorName;
                exer.location = request.body.exer.location;
                exer.frequency = request.body.exer.frequency;
                exer.duration = request.body.exer.duration;
                exer.multimediaURL = request.body.exer.multimediaURL;
                exer.targetDate = request.body.exer.targetDate;
                exer.rehabilitationPlan = request.body.exer.rehabilitationPlan;


                exer.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({exer: exer});
                    }
                });
            }
        });
    })
    .delete( function (request, response) {
        Exercise.Model.findByIdAndRemove(request.params.exercise_id,
            function (error, deleted) {
                if (!error) {
                    response.json({exer: deleted});
                }
            }
        );
    });

module.exports = router;