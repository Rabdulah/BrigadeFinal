var express = require('express');
var router = express.Router();
var Exercise = require('../models/Exercise');

router.route('/')
    .post( function (request, response) {
        var exercise = new Exercise.Model(request.body.exercise);
        exercise.save(function (error, exercise) {
            if (error) response.send(error);
            else{
                response.json({exercise: exercise});
            }
        });
    })
    .get( function (request, response) {
        Exercise.Model.find(function (error, Exercise) {
            if (error) response.send(error);
            response.json({exercise: Exercise});
        });
    });
    
router.route('/:exercise_id')
    .get( function (request, response) {
        Exercise.Model.findById(request.params.exercise_id, function (error, exercise) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({exercise: exercise});
            }
        });
    })
    /// post vs put?
    .put( function (request, response) {
        Exercise.Model.findById(request.params.exercise_id, function (error, exercise) {
            if (error) {
                response.send({error: error});
            }
            else {

                // update each attribute
                exercise.name = request.body.exercise.name;
                exercise.description = request.body.exercise.description;
                exercise.sets = request.body.exercise.sets;
                exercise.actionSteps = request.body.exercise.actionSteps;
                exercise.authorName = request.body.exercise.authorName;
                exercise.reps = request.body.exercise.reps;
                exercise.notes = request.body.exercise.notes;
                exercise.multimediaURL = request.body.exercise.multimediaURL;
                exercise.image = request.body.exercise.image;
                exercise.durationMinute = request.body.exercise.durationMinute;
                exercise.durationSecond = request.body.exercise.durationSecond;
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