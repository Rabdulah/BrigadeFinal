var express = require('express');
var router = express.Router();
var Answers = require('../models/Answers');

router.route('/')
    .post( function (request, response) {
        var answer = new Answers.Model(request.body.answer);
        Answers.save(function (error) {
            if (error) response.send(error);
            response.json({answer: answer});
        });
    })
    .get( function (request, response) {
        Answers.Model.find(function (error, answers) {
            if (error) response.send(error);
            response.json({answer: answers});
        });
    });

router.route('/:answer_id')
    .get( function (request, response) {
        Answers.Model.findById(request.params.answer_id, function (error, answer) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({answer: answer});
            }
        });
    })
    .put( function (request, response) {
        Answers.Model.findById(request.params.answer_id, function (error, answer) {
            if (error) {
                response.send({error: error});
            }
            else {

                // update each attribute
                answer.answer = request.body.answer.answer;
                answer.question = request.body.answer.question;
                answer.patient = request.body.answer.patient;
                answer.form = request.body.answer.form;


                answer.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({answer: answer});
                    }
                });
            }
        });
    })
    .delete( function (request, response) {
        Answers.Model.findByIdAndRemove(request.params.answer_id,
            function (error, deleted) {
                if (!error) {
                    response.json({answer: deleted});
                }
            }
        );
    });

module.exports = router;