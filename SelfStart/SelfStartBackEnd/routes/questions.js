var express = require('express');
var router = express.Router();
var Questions = require('../models/Questions');

router.route('/')
        .post(function (request, response) {
            var question = new Questions.Model(request.body.question);
            question.save(function (error) {
                if (error) response.send(error);
                response.json({question: question});
            });
        })
        
        .get(function (request, response) {
            Questions.Model.find(function (error, questions) {
                if (error) response.send(error);
                response.json({question: questions});
            });
        });

router.route('/:question_id')
        .get(function (request, response) {
            Questions.Model.findById(request.params.question_id, function (error, question) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({question: question});
                }
            });
        })
        
        .put(function (request, response) {
            Questions.Model.findById(request.params.question_id, function (error, question) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    
                    // update each attribute
                    question.questionText = request.body.question.questionText;
                    question.helpDescription = request.body.question.helpDescription;
                    question.type = request.body.question.type;
                    question.optionNumber = request.body.question.optionNumber;
                    question.optionString = request.body.question.optionString;
                    question.questionOrder = request.body.question.questionOrder;
                    
                    question.save(function (error) {
                        if (error) {
                            response.send({error: error});
                        }
                        else {
                            response.json({question: question});
                        }
                    });
                }
            });
        })
        
        .delete(function (request, response) {
            Questions.Model.findByIdAndRemove(request.params.question_id, function (error, deleted) {
                if (!error) {
                    response.json({question: deleted});
                }
            });
        });
        
module.exports = router;
