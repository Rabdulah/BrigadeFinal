var express = require('express');
var router = express.Router();
var Exercise = require('../models/Exercise');

router.route('/')
    .post( function (request, response) {
        var exercise = new Exercise.Model(request.body.exercise);
        exercise.save(function (error) {
            if (error) response.send(error);
            response.json({exercise: exercise});
        });
    })
    .get( function (request, response) {
        Exercise.Model.find(function (error, Exercise) {
            if (error) response.send(error);
            response.json({exercise: Exercise});
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
                exercise.name = request.body.exercise.name;
                exercise.description = request.body.exercise.description;
                exercise.objectives = request.body.exercise.objectives;
                exercise.actionSteps = request.body.exercise.actionSteps;
                exercise.authorName = request.body.exercise.authorName;
                exercise.location = request.body.exercise.location;
                exercise.frequency = request.body.exercise.frequency;
                exercise.duration = request.body.exercise.duration;
                exercise.multimediaURL = request.body.exercise.multimediaURL;
                exercise.targetDate = request.body.exercise.targetDate;
                exercise.rehabilitationPlan = request.body.exercise.rehabilitationPlan;


                exercise.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({exercise: exercise});
                    }
                });
            }
        });
    })
    .delete( function (request, response) {
        Exercise.Model.findByIdAndRemove(request.params.exercise_id,
            function (error, deleted) {
                if (!error) {
                    response.json({exercise: deleted});
                }
            }
        );
    });

module.exports = router;