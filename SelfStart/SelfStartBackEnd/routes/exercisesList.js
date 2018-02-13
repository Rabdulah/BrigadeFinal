var express = require('express');
var router = express.Router();
var Exerciseslist = require('../models/ExercisesList');

router.route('/')
    .post( function (request, response) {
        var exerciselist = new Exerciseslist.Model(request.body.exerciselist);
        exerciselist.save(function (error) {
            if (error) response.send(error);
            response.json({exerciselist: exerciselist});
        });
    })
    .get( function (request, response) {
        Exerciseslist.Model.find(function (error, exerciselists) {
            if (error) response.send(error);
            response.json({exerciselist: exerciselists});
        });
    });

router.route('/:exerciselist_id')
    .get( function (request, response) {
        Exerciseslist.Model.findById(request.params.exerciselist_id, function (error, exerciselist) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({exerciselist: exerciselist});
            }
        });
    })
    /// post vs put?
    .put( function (request, response) {
        Exerciseslist.Model.findById(request.params.exerciselist_id, function (error, exerciselist) {
            if (error) {
                response.send({error: error});
            }
            else {

                // update each attribute
                exerciselist.exerciseOrder = request.body.exerciselist.exerciseOrder;
                exerciselist.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {// return newly added exercise list
                        response.json({exerciselist: exerciselist});
                    }
                });
            }
        });
    })
    .delete( function (request, response) {
        Exerciseslist.Model.findByIdAndRemove(request.params.exerciselist_id,
            function (error, deleted) {
                if (!error) {
                    response.json({exerciselist: deleted});
                }
            }
        );
    });

module.exports = router;