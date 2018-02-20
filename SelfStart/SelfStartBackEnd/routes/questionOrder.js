var express = require('express');
var router = express.Router();
var QuestionOrder = require('../models/QuestionOrder');

router.route('/')
        .post(function (request, response) {
            var questionorder = new QuestionOrder.Model(request.body.questionorder);
            questionorder.save(function (error) {
                if (error) response.send(error);
                response.json({questionorder: questionorder});
            });
        })
        
        .get(function (request, response) {
            QuestionOrder.Model.find(function (error, questionorders) {
                if (error) response.send(error);
                response.json({questionorder: questionorders});
            });
        });

router.route('/:question_id')
        .get(function (request, response) {
            QuestionOrder.Model.findById(request.params.questionorder_id, function (error, questionorder) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({questionorder: questionorder});
                }
            });
        })
        
        .put(function (request, response) {
            QuestionOrder.Model.findById(request.params.question_id, function (error, questionorder) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    
                    // update each attribute
                    questionorder.question = request.body.questionorder.question;
                    question.form = request.body.questionorder.form;
                    questionorder.order = request.body.questionorder.order;
                    
                    questionorder.save(function (error) {
                        if (error) {
                            response.send({error: error});
                        }
                        else {
                            response.json({questionorder: questionorder});
                        }
                    });
                }
            });
        })
        
        .delete(function (request, response) {
            QuestionOrder.Model.findByIdAndRemove(request.params.questionorder_id, function (error, deleted) {
                if (!error) {
                    response.json({questionorder: deleted});
                }
            });
        });
        
module.exports = router;
