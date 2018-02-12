var express = require('express');
var router = express.Router();
var Exerciseorders = require('../models/ExerciseOrder');

router.route('/')
    .post(function (request, response) {
        var Exerciseorders = new Exerciseorders.Model(request.body.Exerciseorders);
        Exerciseorders.save(function (error) {
            if (error) response.send(error);
            response.json({Exerciseorders: Exerciseorders});
        });
    })

    .get(function (request, response) {
        Exerciseorders.Model.find(function (error, Exerciseorders) {
            if (error) response.send(error);
            response.json({Exerciseorders: Exerciseorders});
        });
    });

router.route('/:Exerciseorders_id')
    .get(function (request, response) {
        Exerciseorders.Model.findById(request.params.Exerciseorders_id, function (error, Exerciseorders) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({Exerciseorders: Exerciseorders});
            }
        });
    })

    .put(function (request, response) {
        Exerciseorders.Model.findById(request.params.Exerciseorders_id, function (error, Exerciseorders) {
            if (error) {
                response.send({error: error});
            }
            else {

                // update each attribute
                Exerciseorders.exercise = request.body.Exerciseorders.exercise;
                Exerciseorders.rehabilitation = request.body.Exerciseorders.rehabilitation;
                Exerciseorders.order = request.body.Exerciseorders.order;

                Exerciseorders.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({Exerciseorders: Exerciseorders});
                    }
                });
            }
        });
    })

    .delete(function (request, response) {
        Exerciseorders.Model.findByIdAndRemove(request.params.Exerciseorders_id, function (error, deleted) {
            if (!error) {
                response.json({Exerciseorders: deleted});
            }
        });
    });

module.exports = router;
